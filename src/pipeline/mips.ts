import * as G_MEM from "./G_MEM";
import * as G_UTL from "./G_UTL";
import * as stages from "./stages";
import * as instTranslator from "./instTranslator";
import * as utils from "./utils";
import { setBaseFile, storeClocks, loadSettings } from "../utils/index";

export const runPipeline = async () => {
  localStorage.setItem("MIPS-Clocks", JSON.stringify([]));

  await setBaseFile();
  const settings = loadSettings();
  G_UTL.setDataSize(settings.memorySize);
  G_UTL.hazard.data_hzd = settings.dataHazard.data;
  G_UTL.hazard.ctrl_hzd = settings.dataHazard.control;
  G_MEM.setDataMemory(settings.memorySize);

  // Read .asm
  const program: any = await utils.readFile();
  const programLength: number = program.length;

  // Encode and load .asm into memory
  for (let i = 0; i < programLength; i++) {
    // Remove comments
    if (!program[i] || program[i][0] === "#") {
      continue;
    }
    const encoded: number | null = instTranslator.encode(
      program[i].split("#")[0]
    );

    // Detect errors, if none then continue loading
    if (encoded !== null && !G_UTL.ERROR.includes(encoded)) {
      G_MEM.INST.push(encoded.toString());
    } else {
      console.log(`\tLine ${i + 1}: '${program[i]}'`);
      if (encoded === G_UTL.EINST) {
        console.log("\t\tCouldn't parse the instruction");
      } else if (encoded === G_UTL.EARG) {
        console.log("\t\tCouldn't parse one or more arguments");
      } else if (encoded === G_UTL.EFLOW) {
        console.log("\t\tOne or more arguments are under/overflowing");
      }
      return;
    }
  }

  // // Print the program as loaded
  utils.printInstMem();
  console.log();

  // Doesn't print memory after each clock
  const silent: boolean = false;

  // Skips clock stepping
  let skipSteps: boolean = silent;

  // Run simulation, will run until all pipeline stages are empty
  const clkHistory: any[] = [];
  let clk: number = 0;
  while (
    clk === 0 ||
    G_UTL.ran["IF"][1] !== 0 ||
    G_UTL.ran["ID"][1] !== 0 ||
    G_UTL.ran["EX"][1] !== 0 ||
    G_UTL.ran["MEM"][1] !== 0
  ) {
    if (silent) {
      console.log("─".repeat(20) + `CLK #${clk}` + "─".repeat(20));
    } else {
      console.log("─".repeat(38) + `CLK #${clk}` + "─".repeat(38));
    }

    clkHistory.push([]);

    // Run all stages 'in parallel'
    stages.EX_fwd();
    stages.WB();
    stages.MEM();
    stages.EX();
    stages.ID();
    stages.IF();
    stages.ID_hzd();

    // Keep only the 32 LSB from memory
    for (let i = 0; i < G_MEM.REGS.length; i++) {
      G_MEM.REGS[i] &= 0xffffffff;
    }
    for (let i = 0; i < G_MEM.DATA.length; i++) {
      G_MEM.DATA[i] &= 0xffffffff;
    }

    // Report if stage was run
    ["IF", "ID", "EX", "MEM", "WB"].forEach((stage) => {
      if (G_UTL.ran[stage][1] !== 0) {
        const idle: string = G_UTL.wasIdle[stage] ? " (idle)" : "";
        clkHistory[clk].push([stage, G_UTL.ran[stage], G_UTL.wasIdle[stage]]);
        console.log(
          `> Stage ${stage}: #${
            G_UTL.ran[stage][0] * 4
          } = [${instTranslator.decode(G_UTL.ran[stage][1])}]${idle}.`
        );
      }
    });

    // Print resulting memory
    if (!silent) {
      console.log("─".repeat(83 + String(clk).length));
      utils.printPC();
      if (G_UTL.hazard.data_hzd || G_UTL.hazard.ctrl_hzd) {
        utils.printFwdAndHazard();
      }
      utils.printPipelineRegs();
      utils.printRegMem();
      utils.printDataMem();
      console.log("─".repeat(83 + String(clk).length));
    }
    clk++;

    // Clock step prompt
    if (!skipSteps) {
      try {
        const opt: string = ""; // Since input isn't available in Deno and handling user input is not the focus here, let's leave it empty for now
        skipSteps = opt === "e" || opt === "q";
      } catch (error) {
        console.log("\nExecution aborted.");
        return;
      }
    }

    storeClocks();
  }

  if (silent) {
    console.log();
    utils.printPipelineRegs();
    utils.printRegMem();
    utils.printDataMem();
  } else {
    console.log("Empty pipeline, ending execution...");
  }

  console.log();
  console.log(`Program ran in ${clk} clocks.`);
  console.log();

  utils.printHistory(clkHistory);
};

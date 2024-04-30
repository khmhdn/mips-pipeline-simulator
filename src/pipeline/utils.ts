// Assuming instTranslator, G_MEM, and G_UTL are modules that are also converted to TypeScript
import * as instTranslator from "./instTranslator";
import * as G_MEM from "./G_MEM";
import * as G_UTL from "./G_UTL";

export async function readFile(): Promise<string[]> {
  const fileContent: string = JSON.parse(
    localStorage.getItem("MISP-string-file")!
  );
  const lines: string[] = fileContent
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  return lines;
}

export function printFwdAndHazard(): void {
  console.log(
    "               ╔═════════════[FORWARDING AND HAZARD UNITS]══════════════╗"
  );
  if (
    G_MEM.FWD["PC_WRITE"] === 1 &&
    G_MEM.FWD["IF_ID_WRITE"] === 1 &&
    G_MEM.FWD["FWD_A"] === 0 &&
    G_MEM.FWD["FWD_B"] === 0
  ) {
    console.log(
      "               ║ No action.                                             ║"
    );
  } else {
    if (
      (G_MEM.FWD["PC_WRITE"] === 0 && G_MEM.FWD["IF_ID_WRITE"] === 0) ||
      G_MEM.ID_EX_CTRL["BRANCH"] === 1 ||
      G_MEM.EX_MEM_CTRL["BRANCH"] === 1
    ) {
      console.log(
        "               ║ Stalling (blocking write on PC and IF/ID)...           ║"
      );
    }
    if (G_MEM.FWD["FWD_A"] !== 0) {
      console.log(
        "               ║ FWD_A={} (MEM/WB.ALU_OUT -> A)...                       ║",
        G_MEM.FWD["FWD_A"]
      );
    }
    if (G_MEM.FWD["FWD_B"] !== 0) {
      console.log(
        "               ║ FWD_B={} (MEM/WB.ALU_OUT -> Mux @ aluB and EX/MEM.B)... ║",
        G_MEM.FWD["FWD_B"]
      );
    }
  }
  console.log(
    "               ╚════════════════════════════════════════════════════════╝"
  );
}

export function printPipelineRegs(): void {
  console.log(
    "╔════════════════════╦═══════════[PIPELINE REGISTERS]══════════╦════════════════════╗"
  );
  console.log(
    "║      [IF/ID]       ║      [ID/EX]       ║      [EX/MEM]      ║      [MEM/WB]      ║"
  );
  console.log(
    "║════════════════════╬════════════════════╬════════════════════╬══════════════════"
  );
  console.log(
    "║                    ║     MEM_TO_REG=[{}] ║     MEM_TO_REG=[{}] ║     MEM_TO_REG=[{}] ║",
    G_MEM.ID_EX_CTRL["MEM_TO_REG"],
    G_MEM.EX_MEM_CTRL["MEM_TO_REG"],
    G_MEM.MEM_WB_CTRL["MEM_TO_REG"]
  );
  console.log(
    "║                    ║      REG_WRITE=[{}] ║      REG_WRITE=[{}] ║      REG_WRITE=[{}] ║",
    G_MEM.ID_EX_CTRL["REG_WRITE"],
    G_MEM.EX_MEM_CTRL["REG_WRITE"],
    G_MEM.MEM_WB_CTRL["REG_WRITE"]
  );
  console.log(
    "║                    ║         BRANCH=[{}] ║         BRANCH=[{}] ║                    ║",
    G_MEM.ID_EX_CTRL["BRANCH"],
    G_MEM.EX_MEM_CTRL["BRANCH"]
  );
  console.log(
    "║                    ║       MEM_READ=[{}] ║       MEM_READ=[{}] ║                    ║",
    G_MEM.ID_EX_CTRL["MEM_READ"],
    G_MEM.EX_MEM_CTRL["MEM_READ"]
  );
  console.log(
    "║                    ║      MEM_WRITE=[{}] ║      MEM_WRITE=[{}] ║                    ║",
    G_MEM.ID_EX_CTRL["MEM_WRITE"],
    G_MEM.EX_MEM_CTRL["MEM_WRITE"]
  );
  console.log(
    "║                    ║        REG_DST=[{}] ║                    ║                    ║",
    G_MEM.ID_EX_CTRL["REG_DST"]
  );
  console.log(
    "║                    ║        ALU_SRC=[{}] ║                    ║                    ║",
    G_MEM.ID_EX_CTRL["ALU_SRC"]
  );
  console.log(
    "║                    ║        ALU_OP=[{:02b}] ║                    ║                    ║",
    G_MEM.ID_EX_CTRL["ALU_OP"]
  );
  console.log(
    "╠════════════════════╬════════════════════╬════════════════════╬════════════════════╣"
  );
  console.log(
    "║     NPC=[{:08X}] ║     NPC=[{:08X}] ║  BR_TGT=[{:08X}] ║                    ║",
    G_MEM.IF_ID["NPC"],
    G_MEM.ID_EX["NPC"],
    G_MEM.EX_MEM["BR_TGT"]
  );
  console.log(
    "║                    ║       A=[{:08X}] ║    ZERO=[{:08X}] ║     LMD=[{:08X}] ║",
    G_MEM.ID_EX["A"],
    G_MEM.EX_MEM["ZERO"],
    G_MEM.MEM_WB["LMD"]
  );
  console.log(
    "║      IR=[{:08X}] ║       B=[{:08X}] ║ ALU_OUT=[{:08X}] ║                    ║",
    G_MEM.IF_ID["IR"],
    G_MEM.ID_EX["B"],
    G_MEM.EX_MEM["ALU_OUT"]
  );
  console.log(
    "║                    ║      RT=[{:08X}] ║       B=[{:08X}] ║ ALU_OUT=[{:08X}] ║",
    G_MEM.ID_EX["RT"],
    G_MEM.EX_MEM["B"],
    G_MEM.MEM_WB["ALU_OUT"]
  );
  console.log(
    "║                    ║      RD=[{:08X}] ║      RD=[{:08X}] ║      RD=[{:08X}] ║",
    G_MEM.ID_EX["RD"],
    G_MEM.EX_MEM["RD"],
    G_MEM.MEM_WB["RD"]
  );
  console.log(
    "║                    ║     IMM=[{:08X}] ║                    ║                    ║",
    G_MEM.ID_EX["IMM"]
  );
  if (G_UTL.hazard.data_hzd || G_UTL.hazard.ctrl_hzd) {
    console.log(
      "║                    ║      RS=[{:08X}] ║                    ║                    ║",
      G_MEM.ID_EX["RS"]
    );
  }
  console.log(
    "╚════════════════════╩════════════════════╩════════════════════╩════════════════════╝"
  );
}

export function printPC(): void {
  console.log("                                   ╔════[PC]════╗");
  console.log(
    `                                   ║ [${Number(G_MEM.PC)
      .toString(16)
      .padStart(8, "0")}] ║`
  );
  console.log("                                   ╚════════════╝");
}

export function printInstMem(): void {
  console.log(
    "╔═════╦═════════════════════════════[PROGRAM]═══════════╦════════════════════════╗"
  );

  for (let i = 0; i < G_MEM.INST.length; i++) {
    console.log(
      "║ " +
        (i * 4).toString().padStart(3, " ") +
        " ║ 0x" +
        Number(G_MEM.INST[i]).toString(16).padStart(8, "0") +
        " = 0b" +
        Number(G_MEM.INST[i]).toString(2).padStart(32, "0") +
        " ║ " +
        instTranslator.decode(+G_MEM.INST[i]).padEnd(22, " ") +
        " ║"
    );
  }

  console.log(
    "╚═════╩═════════════════════════════════════════════════╩════════════════════════╝"
  );
}

export function printRegMem(): void {
  console.log(
    "╔════════════════════╦═══════════════[REGISTERS]═══════════════╦══════════════════╗"
  );
  console.log(
    "║ $00[ 0]=[{:08X}] ║ $t0[ 8]=[{:08X}] ║ $s0[16]=[{:08X}] ║ $t8[24]=[{:08X}] ║",
    G_MEM.REGS[0],
    G_MEM.REGS[8],
    G_MEM.REGS[16],
    G_MEM.REGS[24]
  );
  console.log(
    "║ $at[ 1]=[{:08X}] ║ $t1[ 9]=[{:08X}] ║ $s1[17]=[{:08X}] ║ $t9[25]=[{:08X}] ║",
    G_MEM.REGS[1],
    G_MEM.REGS[9],
    G_MEM.REGS[17],
    G_MEM.REGS[25]
  );
  console.log(
    "║ $v0[ 2]=[{:08X}] ║ $t2[10]=[{:08X}] ║ $s2[18]=[{:08X}] ║ $k0[26]=[{:08X}] ║",
    G_MEM.REGS[2],
    G_MEM.REGS[10],
    G_MEM.REGS[18],
    G_MEM.REGS[26]
  );
  console.log(
    "║ $v1[ 3]=[{:08X}] ║ $t3[11]=[{:08X}] ║ $s3[19]=[{:08X}] ║ $k1[27]=[{:08X}] ║",
    G_MEM.REGS[3],
    G_MEM.REGS[11],
    G_MEM.REGS[19],
    G_MEM.REGS[27]
  );
  console.log(
    "║ $a0[ 4]=[{:08X}] ║ $t4[12]=[{:08X}] ║ $s4[20]=[{:08X}] ║ $gp[28]=[{:08X}] ║",
    G_MEM.REGS[4],
    G_MEM.REGS[12],
    G_MEM.REGS[20],
    G_MEM.REGS[28]
  );
  console.log(
    "║ $a1[ 5]=[{:08X}] ║ $t5[13]=[{:08X}] ║ $s5[21]=[{:08X}] ║ $sp[29]=[{:08X}] ║",
    G_MEM.REGS[5],
    G_MEM.REGS[13],
    G_MEM.REGS[21],
    G_MEM.REGS[29]
  );
  console.log(
    "║ $a2[ 6]=[{:08X}] ║ $t6[14]=[{:08X}] ║ $s6[22]=[{:08X}] ║ $fp[30]=[{:08X}] ║",
    G_MEM.REGS[6],
    G_MEM.REGS[14],
    G_MEM.REGS[22],
    G_MEM.REGS[30]
  );
  console.log(
    "║ $a3[ 7]=[{:08X}] ║ $t7[15]=[{:08X}] ║ $s7[23]=[{:08X}] ║ $ra[31]=[{:08X}] ║",
    G_MEM.REGS[7],
    G_MEM.REGS[15],
    G_MEM.REGS[23],
    G_MEM.REGS[31]
  );
  console.log(
    "╚════════════════════╩════════════════════╩══════════════════════════════════════╝"
  );
}

export function printDataMem(): void {
  console.log(
    "    ╔══════════════════╦═══════════════[MEMORY]══════════════╦══════════════════╗"
  );

  const memSize: number = G_MEM.DATA.length;
  for (let i = 0; i < memSize / 4; i++) {
    const a = i * 4,
      b = memSize + i * 4,
      c = memSize * 2 + i * 4,
      d = memSize * 3 + i * 4;
    console.log(
      "    ║ [{:03}]=[{:08X}] ║ [{:03}]=[{:08X}] ║ [{:03}]=[{:08X}] ║ [{:03}]=[{:08X}] ║",
      a,
      G_MEM.DATA[a / 4],
      b,
      G_MEM.DATA[b / 4],
      c,
      G_MEM.DATA[c / 4],
      d,
      G_MEM.DATA[d / 4]
    );
  }

  console.log(
    "    ╚══════════════════╩══════════════════╩══════════════════╩══════════════════╝"
  );
}

export function printHistory(clkHistory: any[][]): void {
  // Convert clkHistory to history board
  const history: string[][] = new Array(G_MEM.INST.length)
    .fill(0)
    .map(() => new Array(clkHistory.length).fill(" "));
  for (let i = 0; i < clkHistory.length; i++) {
    for (const exe of clkHistory[i]) {
      if (exe[2]) {
        // Idle
        history[exe[1][0]][i] = " ";
      } else {
        history[exe[1][0]][i] = exe[0];
      }
    }
  }

  // Print header and column titles
  console.log(
    "╔═════╦════════════════════════╦" + "═".repeat(6 * clkHistory.length) + "╗"
  );
  console.log(
    "║ Mem ║ " + "Clock #".padStart(22) + " ║",
    ...Array.from({ length: clkHistory.length }, (_, i) =>
      String(i).padStart(5)
    ),
    "║"
  );
  console.log(
    "╠═════╬════════════════════════╬" + "═".repeat(6 * clkHistory.length) + "╣"
  );

  localStorage.setItem("MIPS-Clock-History", JSON.stringify(history));

  // Print history board
  for (let i = 0; i < history.length; i++) {
    console.log(
      "║ {:>3} ║ {:>22} ║",
      i * 4,
      instTranslator.decode(+G_MEM.INST[i]),
      ...history[i],
      "║"
    );
  }
  console.log(
    "╚═════╩════════════════════════════════╩" +
      "═".repeat(6 * clkHistory.length) +
      "╝"
  );
}

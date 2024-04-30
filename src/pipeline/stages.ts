import {
  MEM_WB_CTRL,
  EX_MEM_CTRL,
  ID_EX_CTRL,
  MEM_WB,
  EX_MEM,
  ID_EX,
  IF_ID,
  PC,
  REGS,
  DATA,
  FWD,
  INST,
  changePC,
} from "./G_MEM";
import { rTypeWords, forward, hazard, ran, wasIdle, DATA_SIZE } from "./G_UTL";

// Control Unit ROM
// RegDst, ALUSrc, MemToReg, RegWrite, MemRead, MemWrite, Branch, AluOp
const ctrl: { [key: number]: number[] } = {
  0b000000: [0b1, 0b0, 0b0, 0b1, 0b0, 0b0, 0b0, 0b10], // R-Type
  0b100011: [0b0, 0b1, 0b1, 0b1, 0b1, 0b0, 0b0, 0b00], // lw
  0b101011: [0b0, 0b1, 0b0, 0b0, 0b0, 0b1, 0b0, 0b00], // sw
  0b000100: [0b0, 0b0, 0b0, 0b0, 0b0, 0b0, 0b1, 0b01], // beq
  0b001000: [0b0, 0b1, 0b0, 0b1, 0b0, 0b0, 0b0, 0b00],
}; // addi

export function EX_fwd(): void {
  if (
    MEM_WB_CTRL.REG_WRITE === 1 &&
    MEM_WB.RD !== 0 &&
    MEM_WB.RD === ID_EX.RS &&
    (EX_MEM.RD !== ID_EX.RS || EX_MEM_CTRL.REG_WRITE === 0)
  ) {
    FWD.FWD_A = 1;
  } else if (
    EX_MEM_CTRL.REG_WRITE === 1 &&
    EX_MEM.RD !== 0 &&
    EX_MEM.RD === ID_EX.RS
  ) {
    FWD.FWD_A = 2;
  } else {
    FWD.FWD_A = 0;
  }

  if (
    MEM_WB_CTRL.REG_WRITE === 1 &&
    MEM_WB.RD !== 0 &&
    MEM_WB.RD === ID_EX.RT &&
    (EX_MEM.RD !== ID_EX.RT || EX_MEM_CTRL.REG_WRITE === 0)
  ) {
    FWD.FWD_B = 1;
  } else if (
    EX_MEM_CTRL.REG_WRITE === 1 &&
    EX_MEM.RD !== 0 &&
    EX_MEM.RD === ID_EX.RT
  ) {
    FWD.FWD_B = 2;
  } else {
    FWD.FWD_B = 0;
  }

  if (FWD.FWD_A === 0 || !hazard.data_hzd) {
    forward.outFwdA = ID_EX.A;
  } else if (FWD.FWD_A === 1) {
    forward.outFwdA =
      MEM_WB_CTRL.MEM_TO_REG === 1 ? MEM_WB.LMD : MEM_WB.ALU_OUT;
  } else if (FWD.FWD_A === 2) {
    forward.outFwdA = EX_MEM.ALU_OUT;
  }

  if (FWD.FWD_B === 0 || !hazard.data_hzd) {
    forward.outFwdB = ID_EX.B;
  } else if (FWD.FWD_B === 1) {
    forward.outFwdB =
      MEM_WB_CTRL.MEM_TO_REG === 1 ? MEM_WB.LMD : MEM_WB.ALU_OUT;
  } else if (FWD.FWD_B === 2) {
    forward.outFwdB = EX_MEM.ALU_OUT;
  }
}

export function ID_hzd(): void {
  const if_id_rs = (IF_ID.IR & 0x03e00000) >> 21;
  const if_id_rt = (IF_ID.IR & 0x001f0000) >> 16;

  if (
    ID_EX_CTRL.MEM_READ === 1 &&
    (ID_EX.RT === if_id_rs || ID_EX.RT === if_id_rt) &&
    hazard.data_hzd
  ) {
    FWD.PC_WRITE = 0;
    FWD.IF_ID_WRITE = 0;
    FWD.STALL = 1;
  } else if (
    (ID_EX_CTRL.BRANCH === 1 || EX_MEM_CTRL.BRANCH === 1) &&
    hazard.ctrl_hzd
  ) {
    FWD.IF_ID_WRITE = 0;
    FWD.STALL = 1;
  } else {
    FWD.PC_WRITE = 1;
    FWD.IF_ID_WRITE = 1;
    FWD.STALL = 0;
  }
}

export function IF(): void {
  let curInst;
  try {
    curInst = INST[PC / 4];
    if (curInst == undefined) throw Error;
  } catch (error) {
    curInst = 0;
  }

  ran.IF = FWD.STALL === 1 ? [0, 0] : [PC / 4, +curInst];
  wasIdle.IF = FWD.STALL === 1;

  if (FWD.IF_ID_WRITE === 1 || !hazard.data_hzd) {
    IF_ID.NPC = PC + 4;
    IF_ID.IR = +curInst;
  }

  if (FWD.PC_WRITE === 1 || !hazard.data_hzd) {
    changePC(FWD.STALL === 1 ? PC : PC + 4);
  }
}

export function ID(): void {
  ran.ID = FWD.STALL === 1 ? [0, 0] : ran.IF;
  wasIdle.ID = FWD.STALL === 1;

  if (FWD.STALL === 1) {
    ID_EX_CTRL.REG_DST = 0;
    ID_EX_CTRL.ALU_SRC = 0;
    ID_EX_CTRL.MEM_TO_REG = 0;
    ID_EX_CTRL.REG_WRITE = 0;
    ID_EX_CTRL.MEM_READ = 0;
    ID_EX_CTRL.MEM_WRITE = 0;
    ID_EX_CTRL.BRANCH = 0;
    ID_EX_CTRL.ALU_OP = 0;
  } else {
    let opcode = (IF_ID.IR & 0xfc000000) >>> 26;
    console.log(IF_ID.IR);
    ID_EX_CTRL.REG_DST = ctrl[opcode][0];
    ID_EX_CTRL.ALU_SRC = ctrl[opcode][1];
    ID_EX_CTRL.MEM_TO_REG = ctrl[opcode][2];
    ID_EX_CTRL.REG_WRITE = ctrl[opcode][3];
    ID_EX_CTRL.MEM_READ = ctrl[opcode][4];
    ID_EX_CTRL.MEM_WRITE = ctrl[opcode][5];
    ID_EX_CTRL.BRANCH = ctrl[opcode][6];
    ID_EX_CTRL.ALU_OP = ctrl[opcode][7];
  }

  ID_EX.NPC = IF_ID.NPC;
  ID_EX.A = REGS[(IF_ID.IR & 0x03e00000) >> 21];
  ID_EX.B = REGS[(IF_ID.IR & 0x001f0000) >> 16];
  ID_EX.RT = (IF_ID.IR & 0x001f0000) >> 16;
  ID_EX.RD = (IF_ID.IR & 0x0000f800) >> 11;
  const imm = (IF_ID.IR & 0x0000ffff) >> 0;
  ID_EX.IMM = imm;
  ID_EX.RS = (IF_ID.IR & 0x03e00000) >> 21;
}

export function EX(): void {
  ran.EX = ran.ID;
  wasIdle.EX = false;

  EX_MEM_CTRL.MEM_TO_REG = ID_EX_CTRL.MEM_TO_REG;
  EX_MEM_CTRL.REG_WRITE = ID_EX_CTRL.REG_WRITE;
  EX_MEM_CTRL.BRANCH = ID_EX_CTRL.BRANCH;
  EX_MEM_CTRL.MEM_READ = ID_EX_CTRL.MEM_READ;
  EX_MEM_CTRL.MEM_WRITE = ID_EX_CTRL.MEM_WRITE;
  EX_MEM.BR_TGT = ID_EX.NPC + (ID_EX.IMM << 2);

  const aluA = forward.outFwdA;
  const aluB = ID_EX_CTRL.ALU_SRC === 1 ? ID_EX.IMM : forward.outFwdB;
  EX_MEM.ZERO = aluA - aluB === 0 ? 1 : 0;

  let out = 0;
  if (ID_EX_CTRL.ALU_OP === 0) {
    out = aluA + aluB;
  } else if (ID_EX_CTRL.ALU_OP === 1) {
    out = aluA - aluB;
  } else if (ID_EX_CTRL.ALU_OP === 2) {
    const funct = ID_EX.IMM & 0x0000003f;
    const shamt = ID_EX.IMM & 0x000007c0;
    if (funct === rTypeWords.add) {
      out = aluA + aluB;
    } else if (funct === rTypeWords.sub) {
      out = aluA - aluB;
    } else if (funct === rTypeWords.and) {
      out = aluA & aluB;
    } else if (funct === rTypeWords.or) {
      out = aluA | aluB;
    } else if (funct === rTypeWords.sll) {
      out = aluA << shamt;
    } else if (funct === rTypeWords.srl) {
      out = aluA >>> shamt;
    } else if (funct === rTypeWords.xor) {
      out = aluA ^ aluB;
    } else if (funct === rTypeWords.nor) {
      out = ~(aluA | aluB);
    } else if (funct === rTypeWords.mult) {
      out = aluA * aluB;
    } else if (funct === rTypeWords.div) {
      out = Math.floor(aluA / aluB);
    }
  }
  EX_MEM.ALU_OUT = out;

  EX_MEM.B = forward.outFwdB;

  EX_MEM.RD = ID_EX_CTRL.REG_DST === 1 ? ID_EX.RD : ID_EX.RT;
}

export function MEM(): void {
  ran.MEM = ran.EX;
  wasIdle.MEM = EX_MEM_CTRL.MEM_READ !== 1 && EX_MEM_CTRL.MEM_WRITE !== 1;

  MEM_WB_CTRL.MEM_TO_REG = EX_MEM_CTRL.MEM_TO_REG;
  MEM_WB_CTRL.REG_WRITE = EX_MEM_CTRL.REG_WRITE;

  if (EX_MEM_CTRL.MEM_READ === 1) {
    if (EX_MEM.ALU_OUT / 4 < DATA_SIZE) {
      MEM_WB.LMD = DATA[Math.floor(EX_MEM.ALU_OUT / 4)];
    } else {
      console.warn("***WARNING***");
      console.warn(`\tMemory Read at position ${EX_MEM.ALU_OUT} not executed:`);
      console.warn(`\t\tMemory only has ${DATA_SIZE * 4} positions.`);
    }
  }

  if (EX_MEM_CTRL.MEM_WRITE === 1) {
    if (EX_MEM.ALU_OUT / 4 < DATA_SIZE) {
      DATA[Math.floor(EX_MEM.ALU_OUT / 4)] = EX_MEM.B;
    } else {
      console.warn("***WARNING***");
      console.warn(
        `\tMemory Write at position ${EX_MEM.ALU_OUT} not executed:`
      );
      console.warn(`\t\tMemory only has ${DATA_SIZE * 4} positions.`);
    }
  }

  MEM_WB.ALU_OUT = EX_MEM.ALU_OUT;
  MEM_WB.RD = EX_MEM.RD;
}

export function WB(): void {
  ran.WB = ran.MEM;
  wasIdle.WB = MEM_WB_CTRL.REG_WRITE !== 1 || MEM_WB.RD === 0;

  if (MEM_WB_CTRL.REG_WRITE === 1 && MEM_WB.RD !== 0) {
    REGS[MEM_WB.RD] =
      MEM_WB_CTRL.MEM_TO_REG === 1 ? MEM_WB.LMD : MEM_WB.ALU_OUT;
  }
}

//
// File to store simulation registers, control signals and memory
//

import * as G_UTL from "./G_UTL";

// Program Counter
export let PC: number = 0;

export const changePC = (value: number) => {
  PC = value;
};

// Instruction Memory
export const INST: string[] = [];

// Registers
export const REGS: number[] = new Array(32).fill(0);

// Data Memory
export let DATA: number[] = new Array(G_UTL.DATA_SIZE).fill(0);
export const setDataMemory = (size: number) => {
  DATA = new Array(size).fill(0);
};

// Pipeline Registers
export const IF_ID: { [key: string]: number } = { NPC: 0, IR: 0 };
export const ID_EX: { [key: string]: number } = {
  NPC: 0,
  A: 0,
  B: 0,
  RT: 0,
  RD: 0,
  IMM: 0,
  RS: 0,
};
export const EX_MEM: { [key: string]: number } = {
  BR_TGT: 0,
  ZERO: 0,
  ALU_OUT: 0,
  B: 0,
  RD: 0,
};
export const MEM_WB: { [key: string]: number } = { LMD: 0, ALU_OUT: 0, RD: 0 };

// Control Signals
export const ID_EX_CTRL: { [key: string]: number } = {
  REG_DST: 0,
  ALU_SRC: 0,
  MEM_TO_REG: 0,
  REG_WRITE: 0,
  MEM_READ: 0,
  MEM_WRITE: 0,
  BRANCH: 0,
  ALU_OP: 0,
};
export const EX_MEM_CTRL: { [key: string]: number } = {
  MEM_READ: 0,
  MEM_WRITE: 0,
  BRANCH: 0,
  MEM_TO_REG: 0,
  REG_WRITE: 0,
};
export const MEM_WB_CTRL: { [key: string]: number } = {
  MEM_TO_REG: 0,
  REG_WRITE: 0,
};

// Forwarding Unit Signals
export const FWD: { [key: string]: number } = {
  PC_WRITE: 1,
  IF_ID_WRITE: 1,
  FWD_A: 0,
  FWD_B: 0,
  STALL: 0,
};

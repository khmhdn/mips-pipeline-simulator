//
// File to store simulator global variables
//

// Simulator flags for the history board at the end
export const ran: { [key: string]: number[] } = {
  IF: [0, 0],
  ID: [0, 0],
  EX: [0, 0],
  MEM: [0, 0],
  WB: [0, 0],
};

export const wasIdle: { [key: string]: boolean } = {
  IF: false,
  ID: false,
  EX: false,
  MEM: false,
  WB: false,
};

// Dictionaries for easier processing
export const rTypeWords: { [key: string]: number } = {
  add: 0b100000,
  sub: 0b100010,
  and: 0b100100,
  or: 0b100101,
  sll: 0b000000,
  srl: 0b000010,
  xor: 0b100110,
  nor: 0b100111,
  mult: 0b011000,
  div: 0b011001,
};

export const rTypeBins: { [key: string]: string } = {};
for (const k in rTypeWords) {
  if (rTypeWords.hasOwnProperty(k)) {
    const v = rTypeWords[k];
    rTypeBins[v] = k;
  }
}

export const regNames: string[] = [
  "$zero",
  "$at",
  "$v0",
  "$v1",
  "$a0",
  "$a1",
  "$a2",
  "$a3",
  "$t0",
  "$t1",
  "$t2",
  "$t3",
  "$t4",
  "$t5",
  "$t6",
  "$t7",
  "$s0",
  "$s1",
  "$s2",
  "$s3",
  "$s4",
  "$s5",
  "$s6",
  "$s7",
  "$t8",
  "$t9",
  "$k0",
  "$k1",
  "$gp",
  "$sp",
  "$fp",
  "$ra",
];

// Data Memory size, can be changed to any multiple of 4
export let DATA_SIZE: number = 16;

export const setDataSize = (data: number) => {
  DATA_SIZE = data;
};

// Error Signals
export const EINST: number = -1;
export const EARG: number = -2;
export const EFLOW: number = -3;
export const ERROR: number[] = [EINST, EARG, EFLOW];

// Enable or disable hazard protections
export const hazard: { [key: string]: boolean } = {
  data_hzd: true,
  ctrl_hzd: true,
};

// Forwarding+Hazard Units helper variables
export const forward: { [key: string]: number } = {
  outFwdA: 0,
  outFwdB: 0,
};

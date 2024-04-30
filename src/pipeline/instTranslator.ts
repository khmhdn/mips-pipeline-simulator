// Supported Instructions:
// add $d, $s, $t     // 000000|rs[5]|rt[5]|rd[5]|00000|100000 // rd = rs + rt
// sub $d, $s, $t     // 000000|rs[5]|rt[5]|rd[5]|00000|100010 // rd = rs - rt
// and $d, $s, $t     // 000000|rs[5]|rt[5]|rd[5]|00000|100100 // rd = rs & rt
// or $d, $s, $t      // 000000|rs[5]|rt[5]|rd[5]|00000|100101 // rd = rs | rt
// xor $d, $s, $t     // 000000|rs[5]|rt[5]|rd[5]|00000|100110 // rd = rs ^ rt
// nor $d, $s, $t     // 000000|rs[5]|rt[5]|rd[5]|00000|100111 // rd = ~(rs | rt)
// mult $d, $s, $t    // 000000|rs[5]|rt[5]|rd[5]|00000|011000 // rd = rs * rt
// div $d, $s, $t     // 000000|rs[5]|rt[5]|rd[5]|00000|011001 // rd = rs // rt
// sll $d, $t, shamt  // 000000|00000|rt[5]|rd[5]|shamt|000000 // rd = rt << shamt
// srl $d, $t, shamt  // 000000|00000|rt[5]|rd[5]|shamt|000010 // rd = rt >> shamt
// lw $t, offset($s)  // 100011|rs[5]|rt[5]|     offset[16]    // rt = mem(rs + offset)
// sw $t, offset($s)  // 101011|rs[5]|rt[5]|     offset[16]    // mem(rs + offset) = rt
// beq $s, $t, offset // 000100|rs[5]|rt[5]|     offset[16]    // if rs == rt: advance_pc(offset << 2))
// addi $t, $s, imm   // 001000|rs[5]|rt[5]|      imm[16]      // rt = rs + imm

import * as G_UTL from "./G_UTL";

// Convert from string to int
export function encode(inst: string): number {
  inst = inst.replace(/,/g, ""); // Ignore commas

  // Replace register names with its index
  for (let i = 0; i < G_UTL.regNames.length; i++) {
    inst = inst.split(G_UTL.regNames[i]).join(i.toString());
  }
  inst = inst.replace(/\$/g, ""); // $0, $4, $7, etc.

  let instArray = inst.split(" ");
  instArray = instArray.filter((item) => item != "");

  let out = G_UTL.EINST;
  if (instArray[0] in G_UTL.rTypeWords) {
    // R-Type
    out = 0b000000 << 5;

    if (instArray[0] === "sll" || instArray[0] === "srl") {
      try {
        const [rd, rt, shamt] = instArray.slice(1).map((i) => parseInt(i, 0)); // Accepts any base (e.g. 0b, 0o, 0x)
        if (isNaN(rd) || isNaN(rt) || isNaN(shamt)) {
          throw new Error("Not correct number of arguments");
        }

        // Check for under/overflow
        const nrd = rd & 0x1f;
        const nrt = rt & 0x1f;
        const nshamt = shamt & 0x1f;
        if (nrd !== rd || nrt !== rt || nshamt !== shamt) {
          throw new Error("Overflow");
        }

        // Encode
        out |= rt;
        out <<= 5;
        out |= rd;
        out <<= 5;
        out |= shamt;
        out <<= 6;
        out |= G_UTL.rTypeWords[instArray[0]];
      } catch (error) {
        if (error instanceof Error) {
          if (error.message === "Not correct number of arguments") {
            return G_UTL.EARG;
          } else if (error.message === "Overflow") {
            return G_UTL.EFLOW;
          }
        }
      }
    } else {
      // R-Types other than sll/srl
      try {
        const [rd, rs, rt] = instArray.slice(1).map((i) => parseInt(i, 0)); // Accepts any base (e.g. 0b, 0o, 0x)
        if (isNaN(rd) || isNaN(rs) || isNaN(rt)) {
          throw new Error("Not correct number of arguments");
        }

        // Check for under/overflow
        const nrd = rd & 0x1f;
        const nrs = rs & 0x1f;
        const nrt = rt & 0x1f;
        if (nrd !== rd || nrs !== rs || nrt !== rt) {
          throw new Error("Overflow");
        }

        // Encode
        out |= rs;
        out <<= 5;
        out |= rt;
        out <<= 5;
        out |= rd;
        out <<= 11;
        out |= G_UTL.rTypeWords[instArray[0]];
      } catch (error) {
        if (error instanceof Error) {
          if (error.message === "Not correct number of arguments") {
            return G_UTL.EARG;
          } else if (error.message === "Overflow") {
            return G_UTL.EFLOW;
          }
        }
      }
    }
  } else if (instArray[0] === "lw" || instArray[0] === "sw") {
    const opcode: { [key: string]: number } = { lw: 0b100011, sw: 0b101011 };
    out = opcode[instArray[0]] << 5;

    try {
      let [offset, rs]: any = instArray[2].split("(");
      offset = parseInt(offset, 0);
      rs = parseInt(rs.slice(0, -1), 0);

      const rt = parseInt(instArray[1], 0); // Accepts any base (e.g. 0b, 0o, 0x)

      // Check for under/overflow
      const nrt = rt & 0x1f;
      const nrs = rs & 0x1f;
      const noffset = offset & 0xffff;
      if (nrt !== rt || nrs !== rs || noffset !== offset) {
        return G_UTL.EFLOW;
      }

      // Encode
      out |= nrs;
      out <<= 5;
      out |= nrt;
      out <<= 16;
      out |= noffset;
      if (out < 0) {
        out = out >>> 0;
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Not correct number of arguments") {
          return G_UTL.EARG;
        }
      }
    }
  } else if (instArray[0] === "beq") {
    out = 0b000100 << 5;

    try {
      const [rs, rt, offset] = instArray.slice(1).map((i) => parseInt(i, 0)); // Accepts any base (e.g. 0b, 0o, 0x)
      if (isNaN(offset) || isNaN(rt) || isNaN(rs)) {
        throw new Error("Not correct number of arguments");
      }

      // Check for under/overflow
      const nrs = rs & 0x1f;
      const nrt = rt & 0x1f;
      const noffset = offset & 0xffff;
      if (nrs !== rs || nrt !== rt || noffset !== offset) {
        return G_UTL.EFLOW;
      }

      // Encode
      out |= nrs;
      out <<= 5;
      out |= nrt;
      out <<= 16;
      out |= noffset;
      if (out < 0) {
        out = out >>> 0;
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Not correct number of arguments") {
          return G_UTL.EARG;
        }
      }
    }
  } else if (instArray[0] === "addi") {
    out = 0b001000 << 5;

    try {
      const [rt, rs, imm] = instArray.slice(1).map((i) => parseInt(i, 0)); // Accepts any base (e.g. 0b, 0o, 0x)
      console.log(rt, rs, imm);
      if (isNaN(imm) || isNaN(rs) || isNaN(rt)) {
        throw new Error("Not correct number of arguments");
      }

      // Check for under/overflow
      const nrt = rt & 0x1f;
      const nrs = rs & 0x1f;
      const nimm = imm & 0xffff;
      if (nrt !== rt || nrs !== rs || nimm !== imm) {
        return G_UTL.EFLOW;
      }

      // Encode
      out |= rs;
      out <<= 5;
      out |= rt;
      out <<= 16;
      out |= imm;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        if (error.message === "Not correct number of arguments") {
          return G_UTL.EARG;
        }
      }
    }
  }

  return out;
}

// Convert from int to string
export function decode(inst: number): string {
  let instBinary = inst.toString(2);
  while (instBinary.length < 32) {
    instBinary = "0" + instBinary;
  }

  let out = "";
  const opcode = parseInt(instBinary.substring(0, 6), 2);
  const rs = parseInt(instBinary.substring(6, 11), 2);
  const rt = parseInt(instBinary.substring(11, 16), 2);
  const last16 = instBinary.substring(16);

  if (opcode === 0b000000) {
    // R-Type
    const rd = parseInt(last16.substring(0, 5), 2);
    const aluOp = parseInt(last16.substring(10), 2);

    if (
      aluOp === G_UTL.rTypeWords["sll"] ||
      aluOp === G_UTL.rTypeWords["srl"]
    ) {
      const shamt = parseInt(last16.substring(5, 10), 2);
      out = `${G_UTL.rTypeBins[aluOp]} ${G_UTL.regNames[rd]}, ${G_UTL.regNames[rt]}, ${shamt}`;
    } else {
      out = `${G_UTL.rTypeBins[aluOp]} ${G_UTL.regNames[rd]}, ${G_UTL.regNames[rs]}, ${G_UTL.regNames[rt]}`;
    }
  } else if (opcode === 0b100011 || opcode === 0b101011) {
    // lw/sw
    if (opcode === 0b100011) {
      out = "lw";
    } else if (opcode === 0b101011) {
      out = "sw";
    }

    out += ` ${G_UTL.regNames[rt]}, ${parseInt(last16, 2)}(${
      G_UTL.regNames[rs]
    })`;
  } else if (opcode === 0b000100) {
    // beq
    out = `beq ${G_UTL.regNames[rs]}, ${G_UTL.regNames[rt]}, ${parseInt(
      last16,
      2
    )}`;
  } else if (opcode === 0b001000) {
    // addi
    out = `addi ${G_UTL.regNames[rt]}, ${G_UTL.regNames[rs]}, ${parseInt(
      last16,
      2
    )}`;
  }

  return out;
}

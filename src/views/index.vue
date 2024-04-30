<template>
  <div
    class="container mx-auto px-[5%] overflow-y-auto overflow-x-hidden"
    style="height: calc(100vh - 72px)"
  >
    <h1 class="font-medium text-2xl text-center mb-2">
      MIPS Pipeline Simulator
    </h1>
    <h3 class="font-normal text-xl text-center mb-3">
      A MIPS Simulator with a 5-stage pipeline
    </h3>
    <p class="text-center mb-5">
      The simulator will run code from a file given as assembelly and display
      the actions and resulting memory after every clock
    </p>
    <!------ instruction display table ------->
    <span class="relative flex justify-center mb-4 mt-8">
      <div
        class="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-indigo-800 to-transparent opacity-75"
      ></div>

      <span class="relative bg-gray-100 text-lg font-medium px-6"
        >Supported Instructions</span
      >
    </span>
    <div
      class="overflow-x-auto rounded-lg border border-gray-200 w-[360px] sm:w-full mx-auto"
    >
      <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead class="ltr:text-left rtl:text-right">
          <tr class="text-left">
            <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Instruction
            </th>
            <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Format
            </th>
            <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Result
            </th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-200">
          <tr class="odd:bg-gray-50">
            <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              add $d, $s, $t
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
              000000 | rs[5] | rt[5] | rd[5] | 00000 | 100000
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
              rd = rs + rt
            </td>
          </tr>

          <tr class="odd:bg-gray-50">
            <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              sub $d, $s, $t
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
              000000 | rs[5] | rt[5] | rd[5] | 00000 | 100010
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
              rd = rs - rt
            </td>
          </tr>

          <tr class="odd:bg-gray-50">
            <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              and $d, $s, $t
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
              000000 | rs[5] | rt[5] | rd[5] | 00000 | 100100
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
              rd = rs & rt
            </td>
          </tr>

          <tr class="odd:bg-gray-50">
            <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              or $d, $s, $t
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
              000000 | rs[5] | rt[5] | rd[5] | 00000 | 100101
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
              rd = rs | rt
            </td>
          </tr>

          <tr class="odd:bg-gray-50">
            <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              xor $d, $s, $t
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
              000000 | rs[5] | rt[5] | rd[5] | 00000 | 100110
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
              rd = rs ^ rt
            </td>
          </tr>

          <tr class="odd:bg-gray-50">
            <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              nor $d, $s, $t
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
              000000 | rs[5] | rt[5] | rd[5] | 00000 | 100111
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
              rd = ~(rs | rt)
            </td>
          </tr>

          <tr class="odd:bg-gray-50">
            <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              mult $d, $s, $t
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
              000000 | rs[5] | rt[5] | rd[5] | 00000 | 011000
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
              rd = rs * rt
            </td>
          </tr>

          <tr class="odd:bg-gray-50">
            <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              div $d, $s, $t
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
              000000 | rs[5] | rt[5] | rd[5] | 00000 | 011001
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
              rd = rs // rt
            </td>
          </tr>

          <tr class="odd:bg-gray-50">
            <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              sll $d, $t, shamt
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
              000000 | 00000 | rt[5] | rd[5] | shamt | 000000
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
              rd = rt &lt&lt shamt
            </td>
          </tr>

          <tr class="odd:bg-gray-50">
            <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              srl $d, $t, shamt
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
              000000 | 00000 | rt[5] | rd[5] | shamt | 000010
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
              rd = rt >> shamt
            </td>
          </tr>

          <tr class="odd:bg-gray-50">
            <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              lw $t, offset($s)
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
              100011 | rs[5] | rt[5] | ----offset[16]----
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
              rt = mem(rs + offset)
            </td>
          </tr>

          <tr class="odd:bg-gray-50">
            <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              sw $t, offset($s)
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
              101011 | rs[5] | rt[5] | ----offset[16]----
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
              mem(rs + offset) = rt
            </td>
          </tr>

          <tr class="odd:bg-gray-50">
            <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              beq $s, $t, offset
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
              000100 | rs[5] | rt[5] | ----offset[16]----
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
              if rs == rt: advance_pc(offset &lt&lt 2)
            </td>
          </tr>

          <tr class="odd:bg-gray-50">
            <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              addi $t, $s, imm
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
              001000 | rs[5] | rt[5] | ------imm[16]-----
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
              rt = rs + imm
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!------ instruction display table ------->
    <span class="relative flex justify-center mb-4 mt-8">
      <div
        class="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75"
      ></div>

      <span class="relative bg-gray-100 text-lg font-medium px-6"
        >Data Path</span
      >
    </span>
    <!-- <h3 class="font-medium text-lg mb-2 text-center mt-8">Data Path</h3> -->
    <!-- <img src="../assets/images/diagram.png" alt="" class="w-1/2 mb-5 mx-auto" /> -->
    <div class="text-center w-1/3 mb-10 mx-auto">
      <FullScreenImage :imageUrl="'/src/assets/images/diagram.png'" />
    </div>

    <div class="flex items-center justify-center mb-5">
      Copyright © 2024 DtechB -
      <img src="/src/assets/images/logo.png" alt="" class="w-10" /> Danial
      Bayati
    </div>
  </div>
</template>

<script setup lang="ts">
import FullScreenImage from "../components/FullScreenImage.vue";
</script>

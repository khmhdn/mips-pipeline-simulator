<template>
  <div
    class="overflow-x-auto rounded-lg border border-gray-200 w-[360px] sm:w-full mx-auto"
  >
    <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
      <thead class="ltr:text-left rtl:text-right">
        <tr class="text-left">
          <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
            #
          </th>
          <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
            IF/ID
          </th>
          <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
            ID/EX
          </th>
          <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
            EX/MEM
          </th>
          <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
            MEM/WB
          </th>
        </tr>
      </thead>

      <tbody class="divide-y divide-gray-200">
        <tr class="odd:bg-gray-50">
          <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
            1
          </td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700"></td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">
            MEM_TO_REG = [{{ data.ID_EX_CTRL["MEM_TO_REG"] }}]
          </td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">
            MEM_TO_REG = [{{ data.EX_MEM_CTRL["MEM_TO_REG"] }}]
          </td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">
            MEM_TO_REG = [{{ data.MEM_WB_CTRL["MEM_TO_REG"] }}]
          </td>
        </tr>

        <tr class="odd:bg-gray-50">
          <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
            2
          </td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700"></td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">
            REG_WRITE = [{{ data.ID_EX_CTRL["REG_WRITE"] }}]
          </td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">
            REG_WRITE = [{{ data.EX_MEM_CTRL["REG_WRITE"] }}]
          </td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">
            REG_WRITE = [{{ data.MEM_WB_CTRL["REG_WRITE"] }}]
          </td>
        </tr>

        <tr class="odd:bg-gray-50">
          <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
            3
          </td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700"></td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">
            BRANCH = [{{ data.ID_EX_CTRL["BRANCH"] }}]
          </td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">
            BRANCH = [{{ data.EX_MEM_CTRL["BRANCH"] }}]
          </td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700"></td>
        </tr>

        <tr class="odd:bg-gray-50">
          <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
            4
          </td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700"></td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">
            MEM_READ = [{{ data.ID_EX_CTRL["MEM_READ"] }}]
          </td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">
            MEM_READ = [{{ data.EX_MEM_CTRL["MEM_READ"] }}]
          </td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700"></td>
        </tr>

        <tr class="odd:bg-gray-50">
          <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
            5
          </td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700"></td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">
            MEM_WRITE = [{{ data.ID_EX_CTRL["MEM_WRITE"] }}]
          </td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">
            MEM_WRITE = [{{ data.EX_MEM_CTRL["MEM_WRITE"] }}]
          </td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700"></td>
        </tr>

        <tr class="odd:bg-gray-50">
          <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
            6
          </td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700"></td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">
            REG_DST = [{{ data.ID_EX_CTRL["REG_DST"] }}]
          </td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700"></td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700"></td>
        </tr>

        <tr class="odd:bg-gray-50">
          <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
            7
          </td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700"></td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">
            ALU_SRC = [{{ data.ID_EX_CTRL["ALU_SRC"] }}]
          </td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700"></td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700"></td>
        </tr>

        <tr class="odd:bg-gray-50">
          <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
            8
          </td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700"></td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">
            ALU_OP = [{{
              Number(data.ID_EX_CTRL["ALU_OP"]).toString(2).padStart(2, "0")
            }}]
          </td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700"></td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700"></td>
        </tr>

        <tr class="odd:bg-gray-50">
          <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
            9
          </td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">
            NPC = [{{
              Number(data.IF_ID["NPC"]).toString(16).padStart(8, "0")
            }}]
          </td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">
            NPC = [{{
              Number(data.ID_EX["NPC"]).toString(16).padStart(8, "0")
            }}]
          </td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">
            BR_TGT = [{{
              Number(data.EX_MEM["BR_TGT"]).toString(16).padStart(8, "0")
            }}]
          </td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700"></td>
        </tr>

        <tr class="odd:bg-gray-50">
          <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
            10
          </td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700"></td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">
            A = [{{ Number(data.ID_EX["A"]).toString(16).padStart(8, "0") }}]
          </td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">
            ZERO = [{{
              Number(data.EX_MEM["ZERO"]).toString(16).padStart(8, "0")
            }}]
          </td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">
            LMD = [{{
              Number(data.MEM_WB["LMD"]).toString(16).padStart(8, "0")
            }}]
          </td>
        </tr>

        <tr class="odd:bg-gray-50">
          <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
            11
          </td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">
            IR = [{{ Number(data.IF_ID["IR"]).toString(16).padStart(8, "0") }}]
          </td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">
            B = [{{ Number(data.ID_EX["B"]).toString(16).padStart(8, "0") }}]
          </td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">
            ALU_OUT = [{{
              Number(data.EX_MEM["ALU_OUT"]).toString(16).padStart(8, "0")
            }}]
          </td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700"></td>
        </tr>

        <tr class="odd:bg-gray-50">
          <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
            12
          </td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700"></td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">
            RT = [{{ Number(data.ID_EX["RT"]).toString(16).padStart(8, "0") }}]
          </td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">
            B = [{{ Number(data.EX_MEM["B"]).toString(16).padStart(8, "0") }}]
          </td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">
            ALU_OUT = [{{
              Number(data.MEM_WB["ALU_OUT"]).toString(16).padStart(8, "0")
            }}]
          </td>
        </tr>

        <tr class="odd:bg-gray-50">
          <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
            13
          </td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700"></td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">
            RD = [{{ Number(data.ID_EX["RD"]).toString(16).padStart(8, "0") }}]
          </td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">
            RD = [{{ Number(data.EX_MEM["RD"]).toString(16).padStart(8, "0") }}]
          </td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">
            RD = [{{ Number(data.MEM_WB["RD"]).toString(16).padStart(8, "0") }}]
          </td>
        </tr>

        <tr class="odd:bg-gray-50">
          <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
            14
          </td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700"></td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">
            IMM = [{{
              Number(data.ID_EX["IMM"]).toString(16).padStart(8, "0")
            }}]
          </td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700"></td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700"></td>
        </tr>

        <tr class="odd:bg-gray-50">
          <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
            15
          </td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700"></td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">
            RS = [{{ Number(data.ID_EX["RS"]).toString(16).padStart(8, "0") }}]
          </td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700"></td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700"></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>

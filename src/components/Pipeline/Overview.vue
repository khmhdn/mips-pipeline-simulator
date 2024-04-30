<template>
  <div
    class="overflow-x-auto rounded-lg border border-gray-200 w-[360px] sm:w-full mx-auto"
  >
    <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
      <thead class="ltr:text-left rtl:text-right">
        <tr class="text-left">
          <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
            PC
          </th>
          <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
            Forwarding and Hazards
          </th>
        </tr>
      </thead>

      <tbody class="divide-y divide-gray-200">
        <template
          v-if="
            data.FWD['PC_WRITE'] == 1 &&
            data.FWD['IF_ID_WRITE'] == 1 &&
            data.FWD['FWD_A'] == 0 &&
            data.FWD['FWD_B'] == 0
          "
        >
          <tr class="odd:bg-gray-50">
            <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              {{ data.PC }}
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">No action</td>
          </tr>
        </template>

        <template v-else>
          <tr
            class="odd:bg-gray-50"
            v-if="
              (data.FWD['PC_WRITE'] == 0 && data.FWD['IF_ID_WRITE'] == 0) ||
              data.ID_EX_CTRL['BRANCH'] == 1 ||
              data.EX_MEM_CTRL['BRANCH'] == 1
            "
          >
            <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              {{ data.PC }}
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
              Stalling (blocking write on PC and IF/ID)...
            </td>
          </tr>

          <tr class="odd:bg-gray-50" v-if="data.FWD['FWD_A'] != 0">
            <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              {{ data.PC }}
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
              FWD_A={{ data.FWD["FWD_A"] }} (MEM/WB.ALU_OUT -> A)...
            </td>
          </tr>

          <tr class="odd:bg-gray-50" v-if="data.FWD['FWD_B'] != 0">
            <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              {{ data.PC }}
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
              FWD_B={{ data.FWD["FWD_B"] }} (MEM/WB.ALU_OUT -> Mux @ aluB and
              EX/MEM.B)...
            </td>
          </tr>
        </template>
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

<template>
  <div
    class="container mx-auto px-[5%] overflow-y-auto overflow-x-hidden"
    style="height: calc(100vh - 72px)"
  >
    <h2 class="text-xl font-medium mb-5">Pipeline Clock History</h2>
    <div
      class="overflow-x-auto rounded-lg border border-gray-200 w-[360px] sm:w-full mx-auto"
    >
      <table
        class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm"
        v-if="clockHistory.length"
      >
        <thead class="ltr:text-left rtl:text-right">
          <tr class="text-left">
            <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Mem
            </th>
            <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Clock #
            </th>
            <th
              v-for="index in clockHistory[0].length"
              class="whitespace-nowrap px-4 py-2 font-medium text-gray-900"
            >
              {{ index }}
            </th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-200">
          <tr class="odd:bg-gray-50" v-for="(clocks, index) in clockHistory">
            <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              {{ index * 4 }}
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
              {{ decode(+INST[index]) }}
            </td>
            <td
              v-for="clock in clocks"
              class="whitespace-nowrap px-4 py-2 text-gray-700"
            >
              {{ clock }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref, onMounted, ref } from "vue";

import { INST } from "../../pipeline/G_MEM";
import { decode } from "../../pipeline/instTranslator";

const clockHistory: Ref<any[]> = ref([]);
onMounted(() => {
  if (localStorage.getItem("MIPS-Clock-History"))
    clockHistory.value = JSON.parse(
      localStorage.getItem("MIPS-Clock-History")!
    );
});
</script>

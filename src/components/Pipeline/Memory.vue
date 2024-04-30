<template>
  <div class="flex flex-col md:flex-row gap-4">
    <div
      class="overflow-x-auto rounded-lg border border-gray-200 w-[360px] sm:w-full md:w-1/2 mx-auto h-96"
    >
      <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead class="ltr:text-left rtl:text-right">
          <tr class="text-left sticky top-0 bg-white border-b">
            <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              #
            </th>
            <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              registers
            </th>
            <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              value (hex)
            </th>
            <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              value (dec)
            </th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-200">
          <tr class="odd:bg-gray-50" v-for="(item, index) in G_UTL.regNames">
            <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              {{ index }}
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-900">
              {{ item }}
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
              {{ Number(data.REGS[index]).toString(16).padStart(8, "0") }}
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
              {{ data.REGS[index] }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div
      class="overflow-x-auto rounded-lg border border-gray-200 w-[360px] sm:w-full md:w-1/2 mx-auto h-96"
    >
      <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead class="ltr:text-left rtl:text-right">
          <tr class="text-left sticky top-0 bg-white border-b">
            <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Memory
            </th>
            <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              value (hex)
            </th>
            <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              value (dec)
            </th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-200">
          <tr
            class="odd:bg-gray-50"
            v-for="(item, index) in data.DATA"
            :key="index"
          >
            <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              {{ index }}
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
              {{ Number(item).toString(16).padStart(8, "0") }}
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
              {{ item }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

import * as G_UTL from "../../pipeline/G_UTL";

defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>

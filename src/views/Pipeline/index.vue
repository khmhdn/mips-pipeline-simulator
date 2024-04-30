<template>
  <div
    class="container mx-auto px-[5%] overflow-y-auto overflow-x-hidden"
    style="height: calc(100vh - 72px)"
  >
    <h2 class="text-xl font-medium mb-5">Pipeline Program</h2>
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
              DATA
            </th>
            <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              INSTRUCTION
            </th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-200">
          <tr class="odd:bg-gray-50" v-for="(inst, index) in INST">
            <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              {{ index * 4 }}
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
              {{ Number(inst).toString(16).padStart(8, "0") }} =
              {{ Number(inst).toString(2).padStart(32, "0") }}
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
              {{ decode(+inst) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { INST } from "../../pipeline/G_MEM";
import { decode } from "../../pipeline/instTranslator";
</script>

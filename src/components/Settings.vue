<template>
  <div>
    <!------- data memory size -------->
    <label for="HeadlineAct" class="block text-sm font-medium text-gray-900">
      Data Memory Size
    </label>

    <select
      v-model="memorySize"
      name="HeadlineAct"
      id="HeadlineAct"
      class="mt-2 mb-6 w-full rounded-lg border p-1 border-gray-300 text-gray-700 sm:text-sm outline-indigo-500"
    >
      <option :value="16">16</option>
      <option :value="32">32</option>
      <option :value="64">64</option>
      <option :value="128">128</option>
    </select>

    <!------- data hazard ------->
    <div class="flex items-center justify-between mb-4">
      <h4 class="mb-2 block text-sm font-medium text-gray-900">Data Hazard</h4>
      <label
        for="AcceptConditions"
        class="relative block h-6 w-12 cursor-pointer rounded-full bg-gray-300 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-green-500"
      >
        <input
          v-model="isDataHazard"
          type="checkbox"
          id="AcceptConditions"
          class="peer sr-only [&:checked_+_span_svg[data-checked-icon]]:block [&:checked_+_span_svg[data-unchecked-icon]]:hidden"
        />

        <span
          class="absolute inset-y-0 start-0 z-10 m-1 inline-flex size-4 items-center justify-center rounded-full bg-white text-gray-400 transition-all peer-checked:start-6 peer-checked:text-green-600"
        >
          <svg
            data-unchecked-icon
            xmlns="http://www.w3.org/2000/svg"
            class="h-3 w-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>

          <svg
            data-checked-icon
            xmlns="http://www.w3.org/2000/svg"
            class="hidden h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
      </label>
    </div>

    <!------- control hazard ------->
    <div class="flex items-center justify-between">
      <h4 class="mb-2 block text-sm font-medium text-gray-900">
        Control Hazard
      </h4>
      <label
        for="AcceptConditions1"
        class="relative block h-6 w-12 cursor-pointer rounded-full bg-gray-300 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-green-500"
      >
        <input
          v-model="isControlHazard"
          type="checkbox"
          id="AcceptConditions1"
          class="peer sr-only [&:checked_+_span_svg[data-checked-icon]]:block [&:checked_+_span_svg[data-unchecked-icon]]:hidden"
        />

        <span
          class="absolute inset-y-0 start-0 z-10 m-1 inline-flex size-4 items-center justify-center rounded-full bg-white text-gray-400 transition-all peer-checked:start-6 peer-checked:text-green-600"
        >
          <svg
            data-unchecked-icon
            xmlns="http://www.w3.org/2000/svg"
            class="h-3 w-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>

          <svg
            data-checked-icon
            xmlns="http://www.w3.org/2000/svg"
            class="hidden h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
      </label>
    </div>

    <!------ action buttons ------>
    <div class="flex items-center justify-end gap-2 bg-white mt-8">
      <button
        @click="emits('closeSidebar')"
        type="button"
        class="rounded bg-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-600"
      >
        close
      </button>

      <button
        @click="saveSettings"
        type="button"
        class="rounded bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700"
      >
        save
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineEmits } from "vue";

import { loadSettings } from "../utils/index";

const emits = defineEmits(["closeSidebar"]);

const memorySize = ref(16);
const isDataHazard = ref(false);
const isControlHazard = ref(false);

const importSettings = () => {
  let settings = loadSettings();
  memorySize.value = settings.memorySize;
  isDataHazard.value = settings.dataHazard.data;
  isControlHazard.value = settings.dataHazard.control;
};

const saveSettings = () => {
  localStorage.setItem(
    "MIPS-Settings",
    JSON.stringify({
      dataHazard: {
        control: isControlHazard.value,
        data: isDataHazard.value,
      },
      memorySize: memorySize.value,
    })
  );

  emits("closeSidebar");
};

onMounted(() => {
  importSettings();
});
</script>

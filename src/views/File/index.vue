<template>
  <div class="container mx-auto px-[5%]">
    <label class="text-lg font-medium" for="OrderNotes"
      >Assembelly format</label
    >

    <div
      class="overflow-hidden code-editor mt-4 rounded-lg border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
    >
      <textarea
        v-model="code"
        id="OrderNotes"
        class="w-full h-full resize-none border-none align-top focus:ring-0 p-4 outline-none"
        rows="24"
        placeholder="Enter your assembely code here ..."
      ></textarea>

      <div class="flex items-center justify-end gap-2 bg-white p-3 border-t">
        <button
          @click="code = ''"
          type="button"
          class="rounded bg-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-600"
        >
          Clear
        </button>

        <button
          @click="addFile"
          type="button"
          class="rounded bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700"
        >
          Add and Run Pipeline
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from "vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

import { runPipeline } from "../../pipeline/mips";
import { showNotification } from "../../plugins/toast";
// import { isAssemblyCodeFormatCorrect } from "../utils/index";

const router = useRouter();

const code: Ref<string> = ref(
  JSON.parse(localStorage.getItem("MISP-string-file")!)
);

const addFile = () => {
  if (!code.value) {
    showNotification("Textarea can not be empty", "error");
    return;
  }
  // console.log(isAssemblyCodeFormatCorrect(code.value));
  localStorage.setItem("MISP-string-file", JSON.stringify(code.value));
  runPipeline();
  router.push("/pipeline");
};
</script>

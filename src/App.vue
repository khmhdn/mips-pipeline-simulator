<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from "vue";

import { runPipeline } from "./pipeline/mips";

onMounted(() => {
  runPipeline();
});
</script>

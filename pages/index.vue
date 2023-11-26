<template>
  <canvas id="c"></canvas>
</template>
<script setup lang="ts">
import Experience from "~/experience/Experience";

onMounted(() => {
  new Experience(document.querySelector("#c") as HTMLCanvasElement);
});
</script>

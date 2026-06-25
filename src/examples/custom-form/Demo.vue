<script setup lang="ts">
import { onMounted, ref } from "vue";
import { VueScheduler } from "@dhtmlx/trial-vue-scheduler";
import type { VueSchedulerRef } from "@dhtmlx/trial-vue-scheduler";
import "@dhtmlx/trial-vue-scheduler/dist/vue-scheduler.css";
import CustomLightbox from "./CustomLightbox.vue";
import { mainDate, schedulerEvents } from "../shared/demoData";

const schedulerRef = ref<VueSchedulerRef | null>(null);

onMounted(() => {
  document.title = "DHTMLX Vue Scheduler | Custom Form";
});
</script>

<template>
  <div class="demo-panel">
    <VueScheduler ref="schedulerRef" class="demo-scheduler" :events="schedulerEvents" :date="mainDate" :custom-lightbox="CustomLightbox" />
  </div>
</template>

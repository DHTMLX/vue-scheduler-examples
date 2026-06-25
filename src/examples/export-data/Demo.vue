<script setup lang="ts">
import { onMounted, ref } from "vue";
import { VueScheduler, type VueSchedulerRef } from "@dhtmlx/trial-vue-scheduler";
import type { SchedulerConfig, VueSchedulerProps } from "@dhtmlx/trial-vue-scheduler";
import "@dhtmlx/trial-vue-scheduler/dist/vue-scheduler.css";
import { mainDate, schedulerEvents } from "../shared/demoData";

const schedulerRef = ref<VueSchedulerRef | null>(null);

onMounted(() => {
  document.title = "DHTMLX Vue Scheduler | Export";
});

const plugins = {
  export_api: true
};

const config: SchedulerConfig = {};

const data: VueSchedulerProps["data"] = {
  save: (entity, action, data, id) => {
    console.log(entity, action, data, id);
  }
};

function handleExport(exportType: "pdf" | "png") {
  const scheduler = schedulerRef.value?.instance as any;
  if (!scheduler) {
    return;
  }
  if (exportType === "pdf") {
    scheduler.exportToPDF();
  } else {
    scheduler.exportToPNG();
  }
}
</script>

<template>
  <div class="demo-panel">
    <div class="demo-toolbar sample-actions">
      <button data-cy="export-pdf" @click="handleExport('pdf')">Export To PDF</button>
      <button data-cy="export-png" @click="handleExport('png')">Export To PNG</button>
    </div>

    <VueScheduler
      ref="schedulerRef"
      class="demo-scheduler"
      :plugins="plugins"
      :events="schedulerEvents"
      :date="mainDate"
      :config="config"
      :data="data"
    />
  </div>
</template>

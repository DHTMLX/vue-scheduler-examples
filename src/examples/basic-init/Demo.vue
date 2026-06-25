<script setup lang="ts">
import { onMounted } from "vue";
import { VueScheduler } from "@dhtmlx/trial-vue-scheduler";
import type { SchedulerConfig } from "@dhtmlx/trial-vue-scheduler";
import "@dhtmlx/trial-vue-scheduler/dist/vue-scheduler.css";
import { mainDate, schedulerEvents } from "../shared/demoData";

onMounted(() => {
  document.title = "DHTMLX Vue Scheduler | Basic Init";
});

const config: SchedulerConfig = {
  time_step: 15
};

</script>

<template>
  <div class="demo-panel">
    <VueScheduler 
      class="demo-scheduler" 
      view="week" 
      :events="schedulerEvents" 
      :date="mainDate"
      :config="config" 
    />
  </div>
</template>
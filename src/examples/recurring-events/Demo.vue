<script setup lang="ts">
import { VueScheduler } from "@dhtmlx/trial-vue-scheduler";
import "@dhtmlx/trial-vue-scheduler/dist/vue-scheduler.css";
import { baseDate, demoEvents } from "../shared/events";

const plugins = { recurring: true };
const events = [
  ...demoEvents,
  { id: 10, start_date: "2026-05-18 05:00", duration: 7200, end_date: "2026-05-26 05:00", text: "Recurring", rrule: "FREQ=DAILY" }
];
</script>

<template>
  <div class="demo-panel">
    <VueScheduler class="demo-scheduler" :events="events" :date="baseDate" view="week" :plugins="plugins" />
  </div>
</template>

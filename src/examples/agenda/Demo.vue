<script setup lang="ts">
import { onMounted } from "vue";
import { VueScheduler, defineSchedulerTemplates } from "@dhtmlx/trial-vue-scheduler";
import type { SchedulerConfig } from "@dhtmlx/trial-vue-scheduler";
import "@dhtmlx/trial-vue-scheduler/dist/vue-scheduler.css";
import { agendaDate, agendaEvents } from "../shared/demoData";

onMounted(() => {
  document.title = "DHTMLX Vue Scheduler | List View";
});

const config: SchedulerConfig = {
  time_step: 15,
  header: [
    "day",
    "week",
    "month",
    "agenda",
    "date",
    "prev",
    "today",
    "next"
  ]
};

const templates = defineSchedulerTemplates({
  event_class: (_start: Date, _end: Date, event: any) => event.classname || ""
});

const views: any = {
  agenda: {
    date: {
      start: (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0),
      add: (date: Date, step: number) => new Date(date.getFullYear(), date.getMonth() + step, 1, 0, 0, 0, 0)
    }
  }
};

const plugins = { agenda_view: true };
</script>

<template>
  <div class="demo-panel">
    <VueScheduler
      class="demo-scheduler"
      :events="agendaEvents"
      :date="agendaDate"
      view="agenda"
      :views="views"
      :templates="templates"
      :config="config"
      :plugins="plugins"
    />
  </div>
</template>

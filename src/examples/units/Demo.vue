<script setup lang="ts">
import { onMounted } from "vue";
import { VueScheduler, defineSchedulerTemplates } from "@dhtmlx/trial-vue-scheduler";
import type { SchedulerConfig, SchedulerViewsProp } from "@dhtmlx/trial-vue-scheduler";
import "@dhtmlx/trial-vue-scheduler/dist/vue-scheduler.css";
import { doctors, unitEvents } from "../shared/demoData";

onMounted(() => {
  document.title = "DHTMLX Vue Scheduler | Units View";
});

const locale = {
  labels: {
    unit_tab: "Day Units",
    week_unit_tab: "Week Units",
    section_custom: "Section"
  }
};

const config: SchedulerConfig = {
  header: ["unit", "week_unit", "month", "date", "prev", "today", "next"],
  hour_size_px: 50,
  first_hour: 8,
  last_hour: 20,
  lightbox: {
    sections: [
      { name: "description", height: 130, map_to: "text", type: "textarea", focus: true },
      { name: "custom", height: 23, type: "select", options: doctors, map_to: "doctor_id" },
      { name: "time", height: 72, type: "time", map_to: "auto" }
    ]
  }
};

const views: SchedulerViewsProp = {
  units: [
    {
      name: "unit",
      property: "doctor_id",
      list: doctors
    },
    {
      name: "week_unit",
      property: "doctor_id",
      list: doctors,
      days: 5
    }
  ]
};

const templates = defineSchedulerTemplates({
  event_class: (_start: Date, _end: Date, event: any) => event.classname || ""
});
</script>

<template>
  <div class="demo-panel">
    <VueScheduler
      class="demo-scheduler"
      :events="unitEvents"
      :date="new Date('2026-07-27T09:00')"
      :locale="locale"
      :views="views"
      view="week_unit"
      :templates="templates"
      :config="config"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { VueScheduler } from "@dhtmlx/trial-vue-scheduler";
import type { SchedulerViewsProp, SchedulerXY } from "@dhtmlx/trial-vue-scheduler";
import "@dhtmlx/trial-vue-scheduler/dist/vue-scheduler.css";
import { timelineEvents, timelineSections } from "../shared/demoData";

type Zoom = "day" | "week" | "month";

onMounted(() => {
  document.title = "DHTMLX Vue Scheduler | Timeline View & Custom Toolbar";
});

const zoom = ref<Zoom>("day");
const currentDate = ref(new Date("2026-08-02"));
const query = ref("");

const views: SchedulerViewsProp = {
  timeline: [
    {
      name: "rooms-day",
      x_unit: "hour",
      x_date: "%H:%i",
      x_step: 2,
      x_size: 8,
      x_start: 4,
      x_length: 12,
      event_dy: 60,
      resize_events: false,
      y_property: "section",
      render: "bar",
      y_unit: timelineSections,
      date: {
        start: (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate(), 8, 0, 0),
        add: (date: Date, step: number, scheduler: any) => scheduler.date.add(date, step, "day")
      }
    },
    {
      name: "rooms-week",
      x_unit: "day",
      x_date: "%D %d",
      x_step: 1,
      x_size: 7,
      x_start: 0,
      x_length: 7,
      event_dy: 60,
      y_property: "section",
      render: "bar",
      y_unit: timelineSections,
      date: {
        start: (date: Date, scheduler: any) => scheduler.date.week_start(date),
        add: (date: Date, step: number, scheduler: any) => scheduler.date.add(date, step, "week")
      }
    },
    {
      name: "rooms-month",
      x_unit: "week",
      x_date: "W%W",
      x_step: 1,
      x_size: 4,
      x_start: 0,
      x_length: 4,
      event_dy: 60,
      y_property: "section",
      render: "bar",
      y_unit: timelineSections,
      date: {
        start: (date: Date, scheduler: any) => scheduler.date.month_start(date),
        add: (date: Date, step: number, scheduler: any) => scheduler.date.add(date, step, "month")
      }
    }
  ]
};

const xy: SchedulerXY = {
  nav_height: 0
};

const currentViewName = computed(() => {
  if (zoom.value === "day") {
    return "rooms-day";
  }
  if (zoom.value === "week") {
    return "rooms-week";
  }
  return "rooms-month";
});

const formattedDate = computed(() =>
  currentDate.value.toLocaleDateString(undefined, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric"
  })
);

function addDate(step: number) {
  const next = new Date(currentDate.value);
  if (zoom.value === "day") {
    next.setDate(next.getDate() + step);
  } else if (zoom.value === "week") {
    next.setDate(next.getDate() + step * 7);
  } else {
    next.setMonth(next.getMonth() + step);
  }
  currentDate.value = next;
}

function handleViewChange(mode: string, date: Date) {
  if (mode.includes("rooms-day")) {
    zoom.value = "day";
  } else if (mode.includes("rooms-week")) {
    zoom.value = "week";
  } else {
    zoom.value = "month";
  }
  currentDate.value = date;
}

const eventFilter = computed(() => {
  const value = query.value.trim().toLowerCase();
  return (event: any) => {
    if (!value) {
      return true;
    }
    return String(event.text || "").toLowerCase().includes(value);
  };
});
</script>

<template>
  <div class="demo-panel">
    <div class="demo-toolbar timeline-toolbar">
      <button :class="{ active: zoom === 'day' }" @click="zoom = 'day'">Day</button>
      <button :class="{ active: zoom === 'week' }" @click="zoom = 'week'">Week</button>
      <button :class="{ active: zoom === 'month' }" @click="zoom = 'month'">Month</button>
      <input v-model="query" class="scheduler_input_styled search-input" placeholder="Search events..." />
      <span class="toolbar-spacer" />
      <span class="toolbar-date">{{ formattedDate }}</span>
      <span class="toolbar-spacer" />
      <button @click="addDate(-1)">&lt;</button>
      <button @click="currentDate = new Date()">Today</button>
      <button @click="addDate(1)">&gt;</button>
    </div>
    <VueScheduler
      class="demo-scheduler"
      :events="timelineEvents"
      :date="currentDate"
      :view="currentViewName"
      :filter="eventFilter"
      :onViewChange="handleViewChange"
      :locale="{ labels: { 'rooms-day_tab': 'Day', 'rooms-week_tab': 'Week', 'rooms-month_tab': 'Month', section_custom: 'Room' } }"
      :xy="xy"
      :views="views"
    />
  </div>
</template>

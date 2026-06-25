<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { VueScheduler } from "@dhtmlx/trial-vue-scheduler";
import type { SchedulerXY } from "@dhtmlx/trial-vue-scheduler";
import "@dhtmlx/trial-vue-scheduler/dist/vue-scheduler.css";

import { useSchedulerStore } from "../../stores/schedulerStore";

const schedulerStore = useSchedulerStore();
const { events, date, view, canUndo, canRedo } = storeToRefs(schedulerStore);

const data = {
  batchSave: schedulerStore.applyBatch
};

const xy: SchedulerXY = {
  nav_height: 0
};

const formattedDate = computed(() =>
  date.value.toLocaleDateString(undefined, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric"
  })
);

function addDate(step: number) {
  const next = new Date(date.value);
  if (view.value === "day") {
    next.setDate(next.getDate() + step);
  } else if (view.value === "week") {
    next.setDate(next.getDate() + step * 7);
  } else {
    next.setMonth(next.getMonth() + step);
  }
  schedulerStore.setDate(next);
}
</script>

<template>
  <section class="demo-panel" data-cy="state-management-demo">
    <div class="demo-toolbar timeline-toolbar">
      <button data-cy="state-undo" type="button" :disabled="!canUndo" @click="schedulerStore.undo()">Undo</button>
      <button data-cy="state-redo" type="button" :disabled="!canRedo" @click="schedulerStore.redo()">Redo</button>
      <button data-cy="view-day" :class="{ active: view === 'day' }" type="button" @click="schedulerStore.setView('day')">
        Day
      </button>
      <button data-cy="view-week" :class="{ active: view === 'week' }" type="button" @click="schedulerStore.setView('week')">
        Week
      </button>
      <button data-cy="view-month" :class="{ active: view === 'month' }" type="button" @click="schedulerStore.setView('month')">
        Month
      </button>
      <span class="toolbar-spacer" />
      <span class="toolbar-date">{{ formattedDate }}</span>
      <span class="toolbar-spacer" />
      <button data-cy="state-prev" type="button" @click="addDate(-1)">&lt;</button>
      <button data-cy="state-today" type="button" @click="schedulerStore.setDate(new Date())">Today</button>
      <button data-cy="state-next" type="button" @click="addDate(1)">&gt;</button>
    </div>

    <VueScheduler class="demo-scheduler" :events="events" :date="date" :view="view" :data="data" :xy="xy" />
  </section>
</template>

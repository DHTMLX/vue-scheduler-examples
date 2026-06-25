<script setup lang="ts">
import { h, onMounted, ref } from "vue";
import { VueScheduler, defineSchedulerTemplates } from "@dhtmlx/trial-vue-scheduler";
import type { Marker, SchedulerConfig, VueSchedulerProps } from "@dhtmlx/trial-vue-scheduler";
import "@dhtmlx/trial-vue-scheduler/dist/vue-scheduler.css";

import EventTextBox from "../../components/EventTextBox.vue";
import { templateDate, templateEvents } from "../shared/demoData";

const schedulerRef = ref<any>(null);

onMounted(() => {
  document.title = "DHTMLX Vue Scheduler | Configs & Templates";
});

const theme = ref<"terrace" | "dark">("terrace");
const locale = ref<"en" | "es">("en");
const showEventDeleteDialog = ref(false);
const pendingEventDelete = ref<null | { message: string; callback: () => void }>(null);

const markers = ref<Marker[]>([
  {
    days: [0, 6],
    zones: "fullday",
    type: "dhx_time_block",
    css: "disabled-day"
  },
  {
    days: [1, 2, 3, 4, 5],
    zones: [0, 8 * 60, 20 * 60, 24 * 60],
    type: "dhx_time_block",
    css: "disabled-day"
  },
  {
    days: [1, 2, 3, 4, 5],
    zones: [13 * 60, 14 * 60],
    type: "dhx_time_block",
    css: "disabled-day",
    html: "<div class='dhx_time_block_text'>Lunch break</div>"
  }
]);

const templates = defineSchedulerTemplates({
  event_class: (_start: Date, _end: Date, event: any) => `templates-${event.classname || ""}`,
  event_text: (_start: Date, _end: Date, event: any) => h(EventTextBox, { event })
});

const config: SchedulerConfig = {
  first_hour: 6,
  last_hour: 22,
  hour_size_px: 60,
  mark_now: false
};

const dataCallback: VueSchedulerProps["data"] = {
  save: (entity, action, data, id) => {
    console.log(entity, action, data, id);
  }
};

function switchTheme() {
  theme.value = theme.value === "terrace" ? "dark" : "terrace";
}

function switchLocale() {
  locale.value = locale.value === "en" ? "es" : "en";
}

function handleDeleteEventConfirm(args: { event: any; callback: () => void }) {
  pendingEventDelete.value = {
    message: `Are you sure want to delete ${args.event.text}?`,
    callback: args.callback
  };
  showEventDeleteDialog.value = true;
}

function onDialogOption(result: boolean) {
  if (result && pendingEventDelete.value?.callback) {
    pendingEventDelete.value.callback();
  }
  showEventDeleteDialog.value = false;
  pendingEventDelete.value = null;
}
</script>

<template>
  <div class="demo-panel">
    <div class="demo-toolbar sample-actions">
      <button @click="switchTheme">Switch Theme</button>
      <button @click="switchLocale">Switch Locale</button>
    </div>

    <div v-if="showEventDeleteDialog" class="modal-backdrop" @click.self="onDialogOption(false)">
      <div class="confirm-dialog">
        <p>{{ pendingEventDelete?.message }}</p>
        <div class="confirm-actions">
          <button @click="onDialogOption(false)">No</button>
          <button class="danger" @click="onDialogOption(true)">DELETE</button>
        </div>
      </div>
    </div>

    <VueScheduler
      ref="schedulerRef"
      class="demo-scheduler"
      :date="templateDate"
      :events="templateEvents"
      :markers="markers"
      :templates="templates"
      :config="config"
      :theme="theme"
      :locale="locale"
      :modals="{ onBeforeEventDelete: handleDeleteEventConfirm }"
      :data="dataCallback"
    />
  </div>
</template>

<style>
.project-end {
  background-color: #0ca30a;
}

.dhx_title {
  --dhx-scheduler-event-title-font-size: 14px;
  padding: 3px 4px 8px;
  flex-shrink: 0;
  max-height: 22px;
}

.templates-blue {
  --dhx-scheduler-event-background: #006266;
}

.templates-green {
  --dhx-scheduler-event-background: #009432;
}

.templates-yellow {
  --dhx-scheduler-event-background: #ffc312;
}

.templates-purple {
  --dhx-scheduler-event-background: #ed4c67;
}

.disabled-day {
  background-color: #f0f0f055;
  background-image: repeating-linear-gradient(45deg, #eee 10px, #eee 12px, transparent 12px, transparent 20px);
}

[data-scheduler-theme="dark"] .disabled-day {
  background-color: #33333355;
  background-image: repeating-linear-gradient(45deg, #444 10px, #444 12px, transparent 12px, transparent 20px);
}
</style>

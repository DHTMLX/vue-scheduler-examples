<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { Event } from "@dhtmlx/trial-vue-scheduler";
import "@dhtmlx/trial-vue-scheduler/dist/vue-scheduler.css";
import { schedulerEvents } from "../shared/demoData";

const events = ref<Event[]>(schedulerEvents.map(event => ({ ...event })));

onMounted(() => {
  document.title = "DHTMLX Vue Scheduler | Custom Edit View";
});

function handleSaveEvent(updated: Event) {
  events.value = events.value.map(event => (event.id === updated.id ? { ...updated, $new: undefined } : event));
}

function handleDeleteEvent(id: string | number) {
  events.value = events.value.filter(event => String(event.id) !== String(id));
}

function createEvent(newEvent: Event) {
  const exists = events.value.find(event => event.id === newEvent.id);
  if (!exists) {
    events.value = [...events.value, newEvent];
    return;
  }
  events.value = events.value.map(event => (event.id === newEvent.id ? newEvent : event));
}

</script>

<template>
  <div class="demo-container">
    <RouterView v-slot="{ Component }">
      <component
        :is="Component"
        :events="events"
        :handle-save-event="handleSaveEvent"
        :handle-delete-event="handleDeleteEvent"
        :create-event="createEvent"
      />
    </RouterView>
  </div>
</template>

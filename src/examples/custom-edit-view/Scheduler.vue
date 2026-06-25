<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { VueScheduler } from "@dhtmlx/trial-vue-scheduler";
import type { Event, VueSchedulerProps, VueSchedulerRef } from "@dhtmlx/trial-vue-scheduler";
import { mainDate } from "../shared/demoData";

const props = defineProps<{
  events: Event[];
  handleSaveEvent: (event: Event) => void;
  handleDeleteEvent: (id: string | number) => void;
  createEvent: (event: Event) => void;
}>();

const router = useRouter();
const schedulerRef = ref<VueSchedulerRef | null>(null);

const data: VueSchedulerProps["data"] = {
  save: (entity, action, raw, id) => {
    if (entity !== "event") {
      return;
    }
    if (action === "update") {
      props.handleSaveEvent(raw as Event);
    } else if (action === "create") {
      props.createEvent(raw as Event);
    } else if (action === "delete") {
      props.handleDeleteEvent(id);
    }
  }
};

function handleEventCreated(schedulerEvent: Event) {
  props.createEvent(schedulerEvent);
  router.push(`/custom-edit-view/editor/${schedulerEvent.id}`);
  return false;
}

function handleEditEvent(eventId: string | number) {
  router.push(`/custom-edit-view/editor/${eventId}`);
  return false;
}

function beforeLightbox(eventId: string | number) {
  const event = schedulerRef.value?.instance?.getEvent(eventId) as any;
  if (event?.$new) {
    return handleEventCreated(event);
  }
  return handleEditEvent(eventId);
}
</script>

<template>
  <div class="demo-panel">
    <VueScheduler
      ref="schedulerRef"
      class="demo-scheduler"
      :events="events"
      :date="mainDate"
      :data="data"
      :onBeforeLightbox="beforeLightbox"
    />
  </div>
</template>

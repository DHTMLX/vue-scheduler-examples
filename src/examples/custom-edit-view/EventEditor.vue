<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import type { Event } from "@dhtmlx/trial-vue-scheduler";

const props = defineProps<{
  id: string;
  events: Event[];
  handleSaveEvent: (event: Event) => void;
  handleDeleteEvent: (id: string | number) => void;
  createEvent: (event: Event) => void;
}>();

const router = useRouter();
const defaultDurationMin = 60;
const existingEvent = computed(() => props.events.find(event => String(event.id) === String(props.id)));

function toDateTimeInputValue(date: Date) {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 16);
}

const formData = ref<Event>({
  id: Number(props.id),
  text: "New Event",
  start_date: new Date(),
  end_date: new Date(Date.now() + defaultDurationMin * 60000)
});

const startDateValue = ref("");
const durationMinutes = ref(defaultDurationMin);

function resetForm() {
  const start = existingEvent.value?.start_date ? new Date(existingEvent.value.start_date) : new Date();
  const end = existingEvent.value?.end_date
    ? new Date(existingEvent.value.end_date)
    : new Date(start.getTime() + defaultDurationMin * 60000);

  formData.value = {
    ...existingEvent.value,
    id: Number(props.id),
    text: existingEvent.value?.text || "New Event",
    start_date: start,
    end_date: end
  };
  startDateValue.value = toDateTimeInputValue(start);
  durationMinutes.value = Math.max(1, Math.round((end.getTime() - start.getTime()) / 60000));
}

watch(existingEvent, resetForm, { immediate: true });

onMounted(() => {
  document.title = "DHTMLX Vue Scheduler | Custom Edit View | Event Editor";
});

function applyStartDateChange(value: string) {
  const start = new Date(value);
  startDateValue.value = value;
  formData.value = {
    ...formData.value,
    start_date: start,
    end_date: new Date(start.getTime() + durationMinutes.value * 60000)
  };
}

function applyDurationChange(value: string) {
  const parsed = Number.parseInt(value, 10);
  durationMinutes.value = Number.isNaN(parsed) ? 1 : Math.max(1, parsed);
  const start = new Date(formData.value.start_date as Date);
  formData.value = {
    ...formData.value,
    end_date: new Date(start.getTime() + durationMinutes.value * 60000)
  };
}

function save() {
  props.handleSaveEvent(formData.value);
  router.push("/custom-edit-view");
}

function remove() {
  props.handleDeleteEvent(formData.value.id);
  router.push("/custom-edit-view");
}
</script>

<template>
  <div class="event-editor-panel" data-cy="event-editor">
    <h2>Editing Event "{{ formData.text }}"</h2>
    <label>
      Event Name
      <input v-model="formData.text" data-cy="event-name" />
    </label>
    <label>
      Start Date &amp; Time
      <input
        type="datetime-local"
        :value="startDateValue"
        data-cy="event-start"
        @input="applyStartDateChange(($event.target as HTMLInputElement).value)"
      />
    </label>
    <label>
      Duration (minutes)
      <input
        type="number"
        min="1"
        :value="durationMinutes"
        data-cy="event-duration"
        @input="applyDurationChange(($event.target as HTMLInputElement).value)"
      />
    </label>
    <div class="editor-actions">
      <button data-cy="event-save" @click="save">Save</button>
      <button @click="router.push('/custom-edit-view')">Cancel</button>
      <button class="danger" @click="remove">Delete</button>
    </div>
  </div>
</template>

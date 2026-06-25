<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
  data: any;
  onSave: (event: any) => void;
  onCancel: () => void;
  onDelete: () => void;
}>();

const description = ref(props.data?.text || "");

watch(
  () => props.data,
  next => {
    description.value = next?.text || "";
  },
  { immediate: true }
);

function save() {
  props.onSave({ ...props.data, text: description.value });
}
</script>

<template>
  <div class="modal-backdrop lightbox" data-cy="custom-lightbox" @click.self="props.onCancel">
    <div class="custom-lightbox-dialog">
      <div class="custom-lightbox-title">Edit Event</div>
      <label class="custom-lightbox-label" for="event_text">Description</label>
      <textarea id="event_text" v-model="description" class="custom-lightbox-textarea" autofocus />
      <div class="custom-lightbox-actions">
        <button data-cy="custom-lightbox-save" @click="save">Save</button>
        <button @click="props.onCancel">Cancel</button>
        <button @click="props.onDelete">Delete</button>
      </div>
    </div>
  </div>
</template>

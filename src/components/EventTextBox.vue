<script setup lang="ts">
defineProps<{
  event: { text: string; owner?: string; type?: string; classname?: string };
}>();
</script>

<template>
  <div class="event-text-box" data-cy="template-event-text">
    <span class="event-avatar">{{ event.owner?.substring(0, 2).toUpperCase() || "PM" }}</span>
    <span class="event-text-content">
      <span class="event-title">{{ event.text }}</span>
      <span v-if="event.type" class="event-chip">{{ event.type }}</span>
    </span>
  </div>
</template>

import type { SerializedEvent } from "@dhtmlx/trial-vue-scheduler";

export const baseDate = new Date(2026, 4, 18);

export const demoEvents: SerializedEvent[] = [
  { id: 1, start_date: "2026-05-18 09:00", end_date: "2026-05-18 10:30", text: "Planning" },
  { id: 2, start_date: "2026-05-18 12:00", end_date: "2026-05-18 17:00", text: "Design review" },
  { id: 3, start_date: "2026-05-19 14:00", end_date: "2026-05-19 15:30", text: "Implementation" },
  { id: 4, start_date: "2026-05-20 10:00", end_date: "2026-05-20 14:00", text: "QA sync", section_id: "qa" },
  { id: 5, start_date: "2026-05-21 09:00", end_date: "2026-05-21 13:00", text: "Release prep", section_id: "dev" }
];

export const sections = [
  { key: "dev", label: "Development" },
  { key: "qa", label: "QA" },
  { key: "design", label: "Design" }
];

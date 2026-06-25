export interface SampleListItem {
  path: string;
  name: string;
}

export const sampleList: SampleListItem[] = [
  { path: "basic-init", name: "Basic Initialization" },
  { path: "templates", name: "Configs & Templates" },
  { path: "custom-form", name: "Custom Event Form" },
  { path: "custom-edit-view", name: "Custom Edit View" },
  { path: "agenda", name: "Agenda" },
  { path: "recurring-events", name: "Recurring Events" },
  { path: "units", name: "Units View" },
  { path: "timeline", name: "Timeline View" },
  { path: "state-management", name: "State Management" },
  { path: "export-data", name: "Export" }
];

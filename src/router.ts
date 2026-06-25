import { createRouter, createWebHashHistory } from "vue-router";
import LayoutShell from "./layout/LayoutShell.vue";
import AgendaDemo from "./examples/agenda/Demo.vue";
import BasicInitDemo from "./examples/basic-init/Demo.vue";
import CustomEditViewDemo from "./examples/custom-edit-view/Demo.vue";
import CustomEditViewScheduler from "./examples/custom-edit-view/Scheduler.vue";
import EventEditor from "./examples/custom-edit-view/EventEditor.vue";
import CustomFormDemo from "./examples/custom-form/Demo.vue";
import ExportDataDemo from "./examples/export-data/Demo.vue";
import RecurringEventsDemo from "./examples/recurring-events/Demo.vue";
import StateManagementDemo from "./examples/state-management/Demo.vue";
import TemplatesDemo from "./examples/templates/Demo.vue";
import TimelineDemo from "./examples/timeline/Demo.vue";
import UnitsDemo from "./examples/units/Demo.vue";

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: LayoutShell,
      children: [
        { path: "", redirect: "/basic-init" },
        { path: "basic-init", component: BasicInitDemo },
        { path: "templates", component: TemplatesDemo },
        {
          path: "custom-edit-view",
          component: CustomEditViewDemo,
          children: [
            { path: "", component: CustomEditViewScheduler },
            { path: "editor/:id", component: EventEditor, props: true }
          ]
        },
        { path: "custom-form", component: CustomFormDemo },
        { path: "agenda", component: AgendaDemo },
        { path: "recurring-events", component: RecurringEventsDemo },
        { path: "units", component: UnitsDemo },
        { path: "timeline", component: TimelineDemo },
        { path: "state-management", component: StateManagementDemo },
        { path: "redux-toolkit", redirect: "/state-management" },
        { path: "export-data", component: ExportDataDemo },
        { path: "export", redirect: "/export-data" }
      ]
    },
    { path: "/:pathMatch(.*)*", redirect: "/basic-init" }
  ]
});

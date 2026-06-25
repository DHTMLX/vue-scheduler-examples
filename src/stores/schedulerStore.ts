import { defineStore } from "pinia";
import type { BatchChanges, SerializedEvent } from "@dhtmlx/trial-vue-scheduler";
import { baseDate, demoEvents } from "../examples/shared/events";

type SchedulerView = "day" | "week" | "month";

type Snapshot = {
  events: SerializedEvent[];
  date: Date;
  view: SchedulerView;
};

type HistoryState = {
  events: SerializedEvent[];
  date: Date;
  view: SchedulerView;
  past: Snapshot[];
  future: Snapshot[];
  maxHistory: number;
};

const cloneDate = (value: Date | string | null | undefined): Date | string | null | undefined => {
  if (value instanceof Date) {
    return new Date(value.getTime());
  }
  return value;
};

const cloneEvent = (event: SerializedEvent): SerializedEvent => {
  const next: SerializedEvent = { ...event };
  next.start_date = cloneDate(event.start_date) as SerializedEvent["start_date"];
  next.end_date = cloneDate(event.end_date) as SerializedEvent["end_date"];
  next.original_start = cloneDate(event.original_start) as SerializedEvent["original_start"];
  return next;
};

const createSnapshot = (state: HistoryState): Snapshot => ({
  events: state.events.map(cloneEvent),
  date: new Date(state.date.getTime()),
  view: state.view
});

const applyEventChange = (events: SerializedEvent[], change: NonNullable<BatchChanges["events"]>[number]) => {
  if (change.action === "delete") {
    return events.filter(event => String(event.id) !== String(change.id));
  }

  const nextEvent = cloneEvent(change.data as SerializedEvent);
  const exists = events.some(event => String(event.id) === String(change.id));

  if (change.action === "update") {
    return events.map(event => String(event.id) === String(change.id) ? { ...cloneEvent(event), ...nextEvent } : cloneEvent(event));
  }

  if (exists) {
    return events.map(event => String(event.id) === String(nextEvent.id) ? nextEvent : cloneEvent(event));
  }

  return [...events.map(cloneEvent), nextEvent];
};

export const useSchedulerStore = defineStore("scheduler", {
  state: () => ({
    events: demoEvents.map(cloneEvent),
    date: new Date(baseDate.getTime()),
    view: "week" as SchedulerView,
    past: [] as Snapshot[],
    future: [] as Snapshot[],
    maxHistory: 50
  }),
  getters: {
    canUndo: state => state.past.length > 0,
    canRedo: state => state.future.length > 0
  },
  actions: {
    pushHistory() {
      this.past = [...this.past, createSnapshot(this)];
      if (this.past.length > this.maxHistory) {
        this.past = this.past.slice(this.past.length - this.maxHistory);
      }
      this.future = [];
    },
    restoreSnapshot(snapshot: Snapshot) {
      this.events = snapshot.events.map(cloneEvent);
      this.date = new Date(snapshot.date.getTime());
      this.view = snapshot.view;
    },
    setView(view: SchedulerView) {
      if (this.view === view) {
        return;
      }
      this.pushHistory();
      this.view = view;
    },
    setDate(date: Date) {
      if (+this.date === +date) {
        return;
      }
      this.pushHistory();
      this.date = new Date(date.getTime());
    },
    applyBatch(changes: BatchChanges) {
      if (!changes.events?.length) {
        return;
      }

      this.pushHistory();
      this.events = changes.events.reduce(
        (nextEvents, change) => applyEventChange(nextEvents, change),
        this.events.map(cloneEvent)
      );
    },
    undo() {
      if (this.past.length === 0) {
        return;
      }

      const previous = this.past[this.past.length - 1];
      const current = createSnapshot(this);

      this.past = this.past.slice(0, -1);
      this.future = [current, ...this.future];
      this.restoreSnapshot(previous);
    },
    redo() {
      if (this.future.length === 0) {
        return;
      }

      const next = this.future[0];
      const current = createSnapshot(this);

      this.future = this.future.slice(1);
      this.past = [...this.past, current];
      if (this.past.length > this.maxHistory) {
        this.past = this.past.slice(this.past.length - this.maxHistory);
      }
      this.restoreSnapshot(next);
    }
  }
});

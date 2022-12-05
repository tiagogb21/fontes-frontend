export interface IParams {
  id: number | string;
  title: string;
  start: string;
  end: string;
  allDay: string;
}

export interface ICalendar {
  unselect(): void;
  addEvent(params: IParams): void;
}

export interface IView {
  calendar: ICalendar;
}

export interface ISelected {
  view: IView;
  dateStr: string;
  startStr: string;
  endStr: string;
  allDay: string;
}

export interface IEvent {
  id: string | number;
  title: string;
  start: string;
}

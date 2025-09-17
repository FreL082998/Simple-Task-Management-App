export type Status = "Backlog" | "Ready to Go" | "In Progress" | "Done";

export type ColumnProps = {
  status: Status;
  tasks: Task[];
};

export interface Task {
  id: number;
  title: string;
  description?: string;
  status: Status;
  position: number;
}

export interface Pagination {
  meta: any;
  links: any;
}

export interface TasksState {
  items: Task[];
  loading: boolean;
}

export interface TasksState {
  items: Task[];
  loading: boolean;
}

export const STATUSES: (Status)[] = ["Backlog", "Ready to Go", "In Progress", "Done"];
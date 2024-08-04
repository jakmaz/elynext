import { api } from "backend-api";

import TasksList from "@/components/task-list";

async function fetchTasks() {
  const response = await api.tasks.index.get();

  return response.data;
}

export default async function Page() {
  const tasks = await fetchTasks();

  return (
    <div>
      <TasksList tasks={tasks} />
    </div>
  );
}

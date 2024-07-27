import TasksList from "@/compontents/tasks-list";
import { api } from "backend-api";

async function getTasks() {
  const response = await api.tasks.index.get();
  return response.data;
}

export default async function Page() {
  const tasks = await getTasks();
  return (
    <div>
      <TasksList tasks={tasks} />
    </div>
  );
}

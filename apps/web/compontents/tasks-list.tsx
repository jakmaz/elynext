import { api, GetTreatyType } from "backend-api/src/eden";
import Task from "./task";

export type TasksType = GetTreatyType<typeof api.tasks.index.get>;

export default function TasksList({ tasks }: { tasks: TasksType }) {
  if (!tasks) {
    return (
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-6">Tasks List</h1>
        <p className="text-gray-700">No tasks available</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Tasks List</h1>
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
}

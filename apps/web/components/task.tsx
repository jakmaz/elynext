import { Card, CardHeader, CardBody } from "@nextui-org/card";

type TaskProps = {
  id: number;
  title: string;
  description: string;
};

export default function Task({ task }: { task: TaskProps }) {
  return (
    <Card className="p-4  w-full flex flex-col ">
      <div>
        <h1 className="m-0 text-xl font-bold">{task.title}</h1>
        <p className="text-foreground-600">{task.description}</p>
      </div>
    </Card>
  );
}

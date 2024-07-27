import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";

type TaskProps = {
  id: number;
  title: string;
  description: string;
};

export default function Task({ task }: { task: TaskProps }) {
  return (
    <Card>
      <CardHeader className="p-4">
        <h1 className="text-2xl font-bold">{task.title}</h1>
      </CardHeader>
      <CardBody className="p-4">
        <p className="text-gray-700">{task.description}</p>
      </CardBody>
    </Card>
  );
}

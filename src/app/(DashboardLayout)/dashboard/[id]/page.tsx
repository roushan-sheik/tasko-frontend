import React from "react";

interface TaskDetailsProps {
  params: {
    id: string;
  };
}

const TaskDetails = ({ params }: TaskDetailsProps) => {
  const { id } = params;

  return <div>TaskDetails for ID: {id}</div>;
};

export default TaskDetails;

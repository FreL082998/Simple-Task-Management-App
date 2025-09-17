import React, { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";
import { ColumnProps } from "../types/task";
import TaskCard from "./TaskCard";
import AddTaskForm from "./AddTaskForm";

export default function Column({ status, tasks }: ColumnProps) {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">{status}</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="text-xl font-bold text-blue-500 hover:text-blue-700"
        >
          +
        </button>
      </div>

      {showForm && <AddTaskForm status={status} />}

      <div className="flex flex-col gap-3">
        {tasks.map((task, index) => (
          <Draggable draggableId={task.id.toString()} index={index} key={task.id}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <TaskCard task={task} />
              </div>
            )}
          </Draggable>
        ))}
      </div>
    </div>
  );
}

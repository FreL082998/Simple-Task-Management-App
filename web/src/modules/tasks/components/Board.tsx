import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { loadTasks, moveTask, moveTaskLocal } from "../redux/tasksSlice";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import Column from "./Column";
import { Status, STATUSES } from "../types/task";

export default function Board() {
  const dispatch = useAppDispatch();
  const { items, loading } = useAppSelector((state) => state.tasks);

  useEffect(() => { dispatch(loadTasks()); }, [dispatch]);

  const grouped = STATUSES.reduce((acc, status) => {
    acc[status] = items.filter((t) => t.status === status).sort((a, b) => a.position - b.position);
    return acc;
  }, {} as Record<string, typeof items>);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const taskId = parseInt(result.draggableId, 10);
    const status = result.destination.droppableId as Status;
    const position = result.destination.index;

    dispatch(moveTaskLocal({ id: taskId, status, position }));
    dispatch(moveTask({ id: taskId, status, position }));
  };

  if (loading) return <p className="text-center mt-6">Loading...</p>;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-6 max-h-screen overflow-x-auto">
        {STATUSES.map((status) => (
          <Droppable droppableId={status} key={status}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="w-80 flex-shrink-0 bg-white rounded-xl shadow-lg p-4 min-h-[70vh]"
              >
                <Column status={status} tasks={grouped[status]} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}

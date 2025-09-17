import React, { useState } from "react";
import { useAppDispatch } from "../../../hooks/redux";
import { createTask } from "../redux/tasksSlice";
import { Status } from "../types/task";

export default function AddTaskForm({ status }: { status: Status }) {
  const [title, setTitle] = useState("");
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    await dispatch(createTask({ title, status }));
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex mb-3">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New task..."
        className="flex-1 border rounded-l px-2 py-1 text-sm"
      />
      <button type="submit" className="bg-blue-500 text-white px-3 rounded-r">
        +
      </button>
    </form>
  );
}

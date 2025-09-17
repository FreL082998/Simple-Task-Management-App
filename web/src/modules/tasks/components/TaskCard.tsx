import React, { useState } from "react";
import { Task } from "../types/task";
import { useAppDispatch } from "../../../hooks/redux";
import { deleteTask, removeTask, updateTask } from "../redux/tasksSlice";

export default function TaskCard({ task }: { task: Task }) {
  const dispatch = useAppDispatch();
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");
  const [status, setStatus] = useState(task.status);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!title.trim()) return;
    setSaving(true);
    await dispatch(updateTask({ id: task.id, data: { title, description, status } }));
    setSaving(false);
    setEditing(false);
  };

  const handleRemove = async () => {
    dispatch(removeTask(task.id));
    dispatch(deleteTask(task.id));
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-3 hover:shadow-md transition cursor-pointer">
      {editing ? (
        <div className="flex flex-col gap-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border px-2 py-1 rounded text-sm"
            placeholder="Title"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border px-2 py-1 rounded text-sm"
            placeholder="Description"
          />
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => setEditing(false)}
              className="text-gray-500 hover:text-gray-700 text-sm"
              disabled={saving}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="text-blue-500 hover:text-blue-700 text-sm"
              disabled={saving}
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-blue-300 flex items-center justify-center text-white text-xs">
                {task.title.charAt(0).toUpperCase()}
              </div>
              <p className="font-medium text-gray-800">{task.title}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setEditing(true)}
                className="text-blue-500 hover:text-blue-700 text-sm"
              >
                ✏️
              </button>
              <button
                onClick={() => handleRemove()}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                🗑
              </button>
            </div>
          </div>
          {task.description && <p className="text-sm text-gray-600">{task.description}</p>}
        </>
      )}
    </div>
  );
}

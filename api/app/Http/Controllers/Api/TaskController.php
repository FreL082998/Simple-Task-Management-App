<?php

namespace App\Http\Controllers\Api;

use App\Actions\Task\CreateTask;
use App\Actions\Task\DeleteTask;
use App\Actions\Task\ReorderTask;
use App\Actions\Task\RetrieveTask;
use App\Actions\Task\UpdateTask;
use App\Http\Controllers\Controller;
use App\Http\Requests\GetTaskRequest;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Http\Request;


class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  \App\Http\Requests\GetTaskRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function index(GetTaskRequest $request, RetrieveTask $retrieveTask)
    {
        $paginator = $retrieveTask->execute($request);
        return TaskResource::collection($paginator);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreTaskRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreTaskRequest $request)
    {
        return new TaskResource(
            CreateTask::run($request->validated())
        );
    }

    /**
     * Display the specified resource.
     *
     * @param  Task  $task
     * @return \Illuminate\Http\Response
     */
    public function show(Task $task)
    {
        return new TaskResource($task);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateTaskRequest  $request
     * @param  User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        return new TaskResource(
            UpdateTask::run($task, $request->validated())
        );
    }

    public function reorder(Request $request, Task $task)
    {
        $data = $request->validate([
            'status'   => 'required|in:Backlog,In Progress,Done',
            'position' => 'required|integer|min:0',
        ]);

        return new TaskResource(
            ReorderTask::run($task, $data['status'], $data['position'])
        );
    }

    /**
     * Delete the specified resource in storage.
     *
     * @param  Task  $task
     * @return \Illuminate\Http\Response
     */
    public function destroy(Task $task)
    {
        DeleteTask::run($task);
        return response()->json(['message' => 'Task deleted successfully.'], 200);
    }
}

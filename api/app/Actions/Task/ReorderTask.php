<?php
namespace App\Actions\Task;

use App\Models\Task;
use Lorisleiva\Actions\Concerns\AsAction;

class ReorderTask
{
    use AsAction;

    public function handle(Task $task, string $status, int $position): Task
    {
        Task::where('status', $status)
            ->where('id', '!=', $task->id)
            ->where('position', '>=', $position)
            ->increment('position');

        $task->update([
            'status' => $status,
            'position' => $position,
        ]);

        return $task;
    }
}
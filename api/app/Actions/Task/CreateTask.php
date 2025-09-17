<?php

namespace App\Actions\Task;

use App\Models\Task;
use Lorisleiva\Actions\Concerns\AsAction;

class CreateTask
{
    use AsAction;

    public function handle(array $data): Task
    {
        $data['position'] = Task::where('status', $data['status'])->max('position') + 1;
        return Task::create($data);
    }
}

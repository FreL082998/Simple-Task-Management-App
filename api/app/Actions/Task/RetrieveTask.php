<?php

namespace App\Actions\Task;

use App\Http\Requests\GetTaskRequest;
use App\Models\Task;
use Illuminate\Pagination\LengthAwarePaginator;

class RetrieveTask
{
    public function execute(GetTaskRequest $request): LengthAwarePaginator
    {
        $perPage = (int) $request->get('per_page', 10);
        
        return Task::orderBy('status')
            ->orderBy('position')
            ->paginate($perPage);
    }
}

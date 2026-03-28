<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Services\ResponseService;
use App\Traits\HandlesExceptions;
use App\Http\Controllers\Controller;
use App\Models\ReliefPrioritization;
use App\Http\Controllers\BaseResourceController;

class ReliefPrioritizationController extends BaseResourceController
{
    use HandlesExceptions;



    public function __construct(protected ResponseService $responseService)
    {
        $this->resourceName = 'relief-prioritizations';
        $this->abilityName = 'relief-prioritizations';
        $this->routeName = 'admin.relief-prioritizations';
        $this->model = ReliefPrioritization::class;
        $this->title = 'ReliefPrioritization';
        $this->with = [];
        $this->formType = 'modal';
        parent::__construct($responseService);
    }

    protected function mapRecords($records)
    {
        return $records->map(function ($record) {
            return [
                'id' => $record->id,
                'name' => $record->name,
                'name_np' => $record->name_np,
                'description' => $record->description,
                'status' => $record->status ? 'Active' : 'Inactive',
            ];
        });
    }


    protected function getFormPath()
    {
        return [];
    }
    protected function getAdditionalFormData()
    {
        return [];
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreReliefPrioritizationRequest $request)
    {
        return $this->handleRequest($request, function () use ($request) {
            $validated = $request->validated();
             ReliefPrioritization::create($validated);
        });
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateReliefPrioritizationRequest $request, ReliefPrioritization $reliefPrioritization)
    {
        return $this->handleRequest($request, function () use ($request) {
             $validated = $request->validated();
             $reliefPrioritization->update($validated);
        });
    }


}

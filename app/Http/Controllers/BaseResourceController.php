<?php

namespace App\Http\Controllers;

use App\Services\ResponseService;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Str;
use Inertia\Inertia;

abstract class BaseResourceController extends Controller
{
    protected string $resourceName;
    protected string $routeName;
    protected string $abilityName;
    protected string $title;
    protected $model;
    protected $with = [];
    protected $formType ;

    public function __construct(protected ResponseService $responseService)
    {
      $this->abilityName = $this->abilityName ?? $this->resourceName;
      $this->routeName = $this->routeName ?? "admin.{$this->resourceName}";
    }

    protected function authorizeAction(string $ability)
    {
        abort_if(Gate::denies($ability), 403, 'You do not have access to this page.');
    }

    public function index()
    {
        $this->authorizeAction('view-'.$this->abilityName);

        return Inertia::render('Pages/Backend/Resources/ResourceIndex', [
            'columns' => $this->model::getTableColumns(),
            'dataRoute' => route("{$this->routeName}.data"),
            'resourceName' => $this->resourceName,
            'title' => $this->title??Str::ucfirst(Str::singular($this->resourceName)),
            'modelName' => Str::singular($this->resourceName),
            'formType' => $this->formType,
            'additionalData' => $this->getAdditionalIndexData()
        ]);
    }

    public function getData(Request $request)
    {

        $query = $this->model::with($this->with);
        $search = $request->input('search.value');
        if (!empty($search)) {
            $query = $query->filter($search);
        }

        $totalRecords = $query->count();
        // $records = $query->paginate($request->input('length', 10));
        $records = $query->get();
        return response()->json([
                'draw' => (int)$request->input('draw', 1),
                'recordsTotal' => $totalRecords,
                'recordsFiltered' => $totalRecords,
                'data' => $this->mapRecords($records)
            ]);
    }


    protected function handleRequest(Request $request, callable $callback)
    {
        try {
            $result = $callback();
            $message = Str::headline($this->resourceName) . " processed successfully.";

            if ($request->header('X-Inertia')) {
                return back()->with(['success' => $message, 'toastr' => ['type' => 'success', 'message' => $message]]);
            }

            return $request->ajax()
                ? ($result instanceof JsonResponse ? $result : $this->responseService->sendJsonResponse('success', $message))
                : redirect()->route("{$this->routeName}.index")->with(['success' => $message, 'toastr' => ['type' => 'success', 'message' => $message]]);

        } catch (\Throwable $e) {
            $errorMessage = "An error occurred: {$e->getMessage()}";

            if ($request->header('X-Inertia')) {
                return back()->with(['error' => $errorMessage, 'toastr' => ['type' => 'error', 'message' => $errorMessage]]);
            }

            return $request->ajax()
                ? $this->responseService->errorGenericResponse($this->resourceName, true, '', $e)
                : redirect()->route("{$this->routeName}.index")->with(['error' => $errorMessage, 'toastr' => ['type' => 'error', 'message' => $errorMessage]]);
        }
    }

    abstract protected function mapRecords($records);
    abstract protected function getFormPath();
    abstract protected function getAdditionalFormData();

    protected function getAdditionalIndexData()
    {
        return [];
    }

    public function create()
    {
        $this->authorizeAction('create-' . $this->abilityName);
        return $this->renderForm();
    }

    public function edit($id)
    {
        $this->authorizeAction('edit-' . $this->abilityName);
        $model = $this->model::with($this->with)->findOrFail($id);
        return $this->renderForm($model);
    }
    protected function renderForm($model = null)
    {
        if ($this->formType === 'form') {
            return Inertia::render($this->getFormPath(), [
                'resourceName' => $this->resourceName,
                'title' => Str::singular($this->resourceName),
                'modelName' => $model,
                'routeName' => $this->routeName,
                'model' => Str::singular($this->resourceName),
                ...$this->getAdditionalFormData($model)
            ]);
        }

        return $this->customFormRender($model);
    }

    public function destroy(Request $request, $model)
    {
        $this->authorizeAction('delete-'.$this->abilityName);
        return $this->handleRequest($request, function () use ($model) {
            $this->model::findOrFail($model)->delete();
            return true;
        });
    }



}

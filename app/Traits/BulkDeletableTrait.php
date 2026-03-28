<?php

namespace App\Traits;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

trait BulkDeletableTrait
{
    public function bulkDestroy(Request $request, $model)
    {

        try {
            $ids = $request->input('ids');
            $modelClass = $this->getModelClass($model);
            if ($model === 'role') {
                $modelClass = Role::class; // Assign the correct Spatie Role model
            } elseif ($model === 'permission') {
                $modelClass = Permission::class; // Assign the correct Spatie Permission model
            }

            if (! class_exists($modelClass)) {
                return Inertia::render('ErrorPage', [
                    'message' => 'Model not found.',
                ]);
            }

            // Start a database transaction
            DB::beginTransaction();
            if (method_exists($modelClass, 'getAssociatedModels')) {
                $associations = $modelClass::getAssociatedModels();

                foreach ($associations as $associatedModel => $foreignKey) {
                    $associatedModel::whereIn($foreignKey, $ids)->delete();
                }
            }
            $deleted = $modelClass::whereIn('id', $ids)->delete();
            DB::commit();

            $routeName = "admin.{$model}s.index";

            return to_route($routeName)->with([
                'success' => "{$deleted} item(s) have been deleted successfully.",
                'message' => 'Bulk delete successful!',
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            $routeName = "admin.{$model}s.index";

            return to_route($routeName)->with([
                'success' => false,
                'message' => 'Error deleting items: '.$e->getMessage(),
            ]);
        }
    }

    protected function getModelClass($model)
    {
        // Convert the model name to the fully qualified class name
        $model = ucfirst($model);

        return "App\\Models\\$model";
    }
}

<?php

namespace App\Traits;

use Exception;
use Illuminate\Database\QueryException;
use Inertia\Inertia;

trait HandlesExceptions
{
    /**
     * Handle exceptions and return a JSON response.
     */
    public function handleExceptions(callable $callback, string $successRoute)
    {
        try {
            return $callback();
        } catch (QueryException $e) {
            return Inertia::render('backend/pages/miscellaneous/error', [
                'error' => 'Database error: '.$e->getMessage(),
            ]);
        } catch (Exception $e) {
            return Inertia::render('backend/pages/miscellaneous/error', [
                'error' => 'An unexpected error occurred: '.$e->getMessage(),
            ]);
        }
    }
}

<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Spatie\Permission\Exceptions\UnauthorizedException;

class CheckDynamicPermission
{
    public function handle(Request $request, Closure $next, $permission)
    {
        if (! $request->user()) {
            throw UnauthorizedException::notLoggedIn();
        }

        // Fetch the user's permissions from the database
        $userPermissions = $request->user()->getAllPermissions()->pluck('name');
        // Check if the required permission is in the user's permissions
        if (! $userPermissions->contains($permission)) {
            throw UnauthorizedException::forPermissions([$permission]);
        }

        return $next($request);
    }
}

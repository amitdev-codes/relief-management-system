<?php

use App\Console\Commands\ProjectSetup;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Routing\Router;


return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        function (Router $router) {
            $router->middleware('web')->group(base_path('routes/web.php'));
            $router->middleware('web')->group(base_path('routes/admin.php'));
            $router->middleware('web')->group(base_path('routes/user.php'));
            $router->middleware('web')->group(base_path('routes/master.php'));
        },
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withCommands([
        App\Console\Commands\ProjectSetup::class,
        \App\Console\Commands\CreateFormCommand::class,
    ])
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);
        $middleware->alias([
            'role' => \Spatie\Permission\Middleware\RoleMiddleware::class,
            'permission' => \Spatie\Permission\Middleware\PermissionMiddleware::class,
            'role_or_permission' => \Spatie\Permission\Middleware\RoleOrPermissionMiddleware::class,
            'check.permission' => \App\Http\Middleware\CheckDynamicPermission::class,
            'resource.permission' => \App\Http\Middleware\CheckResourcePermissions::class,
        ]);

        //
    })
    ->withExceptions(function (Exceptions $exceptions) {
        // $exceptions->render(function ($request, $exception) {
        //     if ($exception instanceof UnauthorizedException) {
        //         return Inertia::render('Errors/Unauthorized', [], 403);
        //     }

        //     return null; // This will fall back to the default exception handling
        // });
    })->create();

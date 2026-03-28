<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Illuminate\Http\UploadedFile;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    // public function share(Request $request): array
    // {
    //     return [
    //         ...parent::share($request),
    //         'auth' => [
    //             'user' => $request->user(),
    //         ],

    //     ];
    // }

    public function share(Request $request)
    {
        return array_merge(parent::share($request), [

            // ...
          'auth' => [
            'user' => $request->user() ? [
                'id' => $request->user()->id,
                'name' => $request->user()->name,
                'email' => $request->user()->email,
                'permissions' => $request->user()->getAllPermissions()->pluck('name'),
            ] : null,
        ],

            'errors' => function () use ($request) {
                return $this->resolveValidationErrors($request)
                    ->map(function ($message, $key) use ($request) {
                        return $request->hasFile($key)
                            ? $message
                            : $message[0] ?? $message;
                    });
            },
        ]);
    }
    public function resolveValidationErrors(Request $request)
    {
        if (! $request->hasSession() || ! $request->session()->has('errors')) {
            return collect();
        }

        return collect($request->session()->get('errors')->getBags())->flatMap->getMessages();
    }
}

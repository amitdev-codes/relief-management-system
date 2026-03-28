<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Landing', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('admin/dashboard', function () {
    return Inertia::render('admin/pages/Dashboard');
})->middleware(['auth', 'verified'])->name('adminDashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::fallback(function () {
    if (auth()->check()) {
        return Inertia::render('adminDashboard');
    } else {
        return Inertia::render('landing');
    }
})->name('fallback');

Route::get('404',function(){
    return Inertia::render('errors/ErrorPage', [
        'errorCode' => 404,
        'message' => 'Page Not Found',
    ]);
});
Route::get('500',function(){
    return Inertia::render('errors/ServerErrorPage', [
        'message' => 'An unexpected error occurred. Please try again later.',
    ]);
});



require __DIR__.'/auth.php';

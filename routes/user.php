<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\User\ApplicantProfileController;
use App\Http\Controllers\User\GrantFundAllocationController;
use App\Http\Controllers\User\LoanAllocationController;
use App\Http\Controllers\User\ReliefFundAllocationController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;




Route::prefix('user')->middleware(['auth'])->group(function(){
    Route::get('dashboard', function () {
        return Inertia::render('user/pages/Dashboard');
    })->name('userDashboard');;
    Route::get('applicantProfiles/{id}/edit',[ApplicantProfileController::class, 'edit'])->name('applicant_profile.update');



    //Route::get('reliefFundAllocations/create',[ReliefFundAllocationController::class, 'create'])->name('relief_fund_allocation.create');

    Route::controller(LoanAllocationController::class)->prefix('user_loan_allocations')->group(function(){
        Route::get('list','index')->name('user_loan_allocations.index');
        Route::get('create','create')->name('user_loan_allocations.create');
        Route::get('edit','edit')->name('user_loan_allocations.edit');
        Route::post('store','store')->name('user_loan_allocations.store');
    });


    Route::controller(ReliefFundAllocationController::class)->prefix('user_relief_fund_allocations')->group(function(){
        Route::get('list','index')->name('user_relief_fund_allocations.index');
        Route::get('create','create')->name('user_relief_fund_allocations.create');
        Route::get('edit','edit')->name('user_relief_fund_allocations.edit');
        Route::post('store','store')->name('user_relief_fund_allocations.store');
    });

    Route::controller(GrantFundAllocationController::class)->prefix('user_grant_fund_allocations')->group(function(){
        Route::get('list','index')->name('user_grant_fund_allocations.index');
        Route::get('create','create')->name('user_grant_fund_allocations.create');
        Route::get('edit','edit')->name('user_grant_fund_allocations.edit');
        Route::post('store','store')->name('user_grant_fund_allocations.store');
    });



});

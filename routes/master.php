<?php

use App\Http\Controllers\Master\AddressController;
use App\Http\Controllers\Master\ApiController;
use App\Http\Controllers\Master\Loan\EducationalLoanFacultyController;
use App\Http\Controllers\Master\Loan\LoanPurposeTypeController;
use App\Http\Controllers\Master\Loan\LoanSettingController;
use App\Http\Controllers\Master\Loan\LoanTypeController;
use App\Http\Controllers\Master\ReliefPackageController;
use App\Http\Controllers\Reports\LoanReportController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;




// Route::get('/user/dashboard', function () {
//     return Inertia::render('user/pages/ApplicantProfile');
// })->middleware(['auth', 'verified'])->name('userDashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/api/districts/{provinceId}', [AddressController::class, 'getDistricts'])->name('fetchDistricts');
    Route::get('/api/local-levels/{provinceId}/{districtId}', [AddressController::class, 'getLocalLevels'])->name('fetchLocalLevel');

    //master
    Route::controller(ApiController::class)->group(function () {
        Route::get('/api/relief-types', 'fetchReliefTypes')->name('fetchReliefTypes');
        Route::get('/api/relief-sub-categories', 'fetchReliefSubCategory')->name('fetchReliefSubCategory');
        Route::get('/api/length-units', 'fetchLengthUnit')->name('fetchLengthUnit');
        Route::get('/api/relief-types', 'fetchReliefTypes')->name('fetchReliefTypes');
        Route::get('/api/educational-faculties/{id}', 'fetchEducationalLoanAmount')->name('fetchEducationalLoanAmount');
        Route::get('/api/educational-faculties/interest_rate/{id}', 'fetchEducationalInterest')->name('fetchEducationalInterest');

        Route::get('/api/fetchInstallmentAmount/{userId}/{installmentId}', 'fetchInstallmentAmount')->name('fetchInstallmentAmount');
        Route::get('/api/calculateFine/{userId}/{installmentId}/{clearedDate}', 'calculateFine')->name('calculateFine');

        //loan
        Route::get('/api/loan-payments/{userId}', 'loanPayments')->name('loanPayments');
        Route::get('/api/user/permissions', 'permissions')->name('permissions');

    });
    Route::get('/api/personalLedger/{id}', [LoanReportController::class, 'personalLedger'])->name('personalLedger');
    // Route::resource('relief-packages', ReliefPackageController::class);
    //loansettings
    // Route::resource('loan-settings', LoanSettingController::class);
    // Route::resource('loan-purpose-types', LoanPurposeTypeController::class);
    // Route::resource('loan-types', LoanTypeController::class);
    //Route::resource('educational-loan-faculties', EducationalLoanFacultyController::class);

});

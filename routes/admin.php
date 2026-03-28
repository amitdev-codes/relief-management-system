<?php
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\BulkDeleteController;
use App\Http\Controllers\Admin\CasteController;
use App\Http\Controllers\Admin\HelpTypeController;
use App\Http\Controllers\Admin\ReligionController;
use App\Http\Controllers\Admin\GrantTypeController;
use App\Http\Controllers\Admin\PermissionController;
use App\Http\Controllers\Admin\ReliefTypeController;
use App\Http\Controllers\Reports\LoanReportController;
use App\Http\Controllers\Admin\LoanClearanceController;
use App\Http\Controllers\Admin\LoanAllocationController;
use App\Http\Controllers\Master\Loan\LoanTypeController;
use App\Http\Controllers\Master\ReliefPackageController;
use App\Http\Controllers\Admin\GrantAllocationController;
use App\Http\Controllers\Admin\ApplicantProfileController;
use App\Http\Controllers\Master\Loan\LoanSettingController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Admin\ReliefFundAllocationController;
use App\Http\Controllers\Admin\ReliefPrioritizationController;
use App\Http\Controllers\Master\Loan\LoanPurposeTypeController;
use App\Http\Controllers\Admin\Loan\LoanAllocationPaymentController;
use App\Http\Controllers\Master\Loan\EducationalLoanFacultyController;
use App\Http\Controllers\Admin\Loan\PaymentReimbursementSectionController;




Route::middleware('auth')->group(function () {
  Route::resource('castes', CasteController::class);
  Route::resource('grant-types', GrantTypeController::class);
  Route::resource('help-types', HelpTypeController::class);
  Route::resource('relief-packages', ReliefPackageController::class);
  //loan related
  Route::resource('loan-purpose-types', LoanPurposeTypeController::class);
  Route::resource('loan-types', LoanTypeController::class);
  Route::resource('loan-settings', LoanSettingController::class);
  Route::resource('educational-loan-faculties', EducationalLoanFacultyController::class);
  //relief or rahat
//   Route::resource('relief-prioritizations', ReliefPrioritizationController::class);
  Route::resource('relief-types', ReliefTypeController::class);
  Route::resource('religions', ReligionController::class);

    Route::prefix('admin')->group(function(){
        Route::resource('applicant-profiles',ApplicantProfileController::class);
        Route::resource('relief-fund-allocations',ReliefFundAllocationController::class);
        Route::resource('loan-allocations',LoanAllocationController::class);
        Route::resource('loan-payments',LoanAllocationPaymentController::class);
        Route::resource('payment-reimbursement-sections',PaymentReimbursementSectionController::class);
        Route::resource('loan-clearances',LoanClearanceController::class);
        Route::resource('grant-allocations',GrantAllocationController::class);


        Route::get('loanAgreement/{id}',[LoanAllocationController::class,'loanAgreement'])->name('loanAllocations.print');

        Route::delete('/loan-allocations/{loanAllocation}/media/{mediaId}', [LoanAllocationController::class, 'deleteMedia'])->name('loan-allocations.delete-media');

         //fetch installment amount
         Route::get('fetchInstallmentAmount/{userId}/{installmentId}',[LoanClearanceController::class,'fetchInstallmentAmount'])->name('loanClearances.LoanAllocationController');
         Route::get('calculateFine/{userId}/{installmentId}/{clearedDate}',[LoanClearanceController::class,'calculateFine'])->name('loanClearances.calculateFine');
         //fetch installment percentage amount
         Route::get('fetchRemibursementAmount/{loanAllocationId}/{installmentPercentage}/{installmentId}',[PaymentReimbursementSectionController::class,'fetchInstallmentAmount'])->name('loanAllocation.PaymentReimbursementSectionController');



        Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');

        Route::get('/api/fetch_relief_subcategory/{relief_type_id}',[ReliefFundAllocationController::class, 'fetchReliefSubCategory']);
        //reports
        Route::get('loanPurposeReport',[LoanReportController::class,'loanPurposeReport'])->name('loanPurposeReport');
    });



    Route::prefix('admin')->as('admin.')->group(function () {
        $commonExceptions = ['create',  'show'];
        // for common getdata for datatables
        Route::macro('resourceWithDatatables', function ($name, $controller, $options = []) {
            $defaultOptions = ['except' => ['show'], 'withExport' => true];
            $options = array_merge($defaultOptions, $options);
            Route::resource($name, $controller)->except($options['except']);
            Route::prefix($name)->group(function () use ($name, $controller) {
                Route::get('data', [$controller, 'getData'])
                    ->name("{$name}.data");
            });

            // // Optional export route
            if ($options['withExport']) {
                Route::prefix($name)->group(function () use ($name, $controller) {
                    Route::post('export', [$controller, 'export'])
                        ->name("{$name}.export");
                });
            }
        });

      //Bulk delete
        Route::delete('/bulk-delete/{model}', [BulkDeleteController::class, 'bulkDestroy'])->name('bulkDelete');
        $resources = [
            'users' => [UserController::class, ['except' => $commonExceptions, 'withExport' => true]],
            'relief-prioritizations' => [ReliefPrioritizationController::class, ['except' => $commonExceptions, 'withExport' => true]],
            'roles' => [RoleController::class, ['except' => ['show']]],
            'permissions' => [PermissionController::class, ['except' => $commonExceptions]],
        ];

        foreach ($resources as $name => [$controller, $options]) {
            Route::resourceWithDatatables($name, $controller, $options);
        }

    });



});

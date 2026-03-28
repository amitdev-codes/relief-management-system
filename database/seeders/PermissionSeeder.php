<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $superAdminRole = Role::findByName('SuperAdmin');
        $adminRole = Role::findByName('Admin');
        $userRole = Role::findByName('User');
        $localadminRole = Role::findByName('LocalLevelAdmin');

        $permissions = [
        'view-dashboard','create-dashboard','edit-dashboard','delete-dashboard',
        'view-applicant-profiles','create-applicant-profiles','edit-applicant-profiles','delete-applicant-profiles',
        'view-relief-fund-allocations','create-relief-fund-allocations','edit-relief-fund-allocations','delete-relief-fund-allocations',
        'view-grant-allocations','create-grant-allocations','edit-grant-allocations','delete-grant-allocations',
        'view-loan-allocations','create-loan-allocations','edit-loan-allocations','delete-loan-allocations',
        'view-loan-payments','create-loan-payments','edit-loan-payments','delete-loan-payments',
        'view-loan-clearances','create-loan-clearances','edit-loan-clearances','delete-loan-clearances',
        'view-relief-prioritizations','create-relief-prioritizations','edit-relief-prioritizations','delete-relief-prioritizations',
        'view-relief-types','create-relief-types','edit-relief-types','delete-relief-types',
        'view-help-types','create-help-types','edit-help-types','delete-help-types',
        'view-castes','create-castes','edit-castes','delete-castes',
        'view-languages','create-languages','edit-languages','delete-languages',
        'view-religions','create-religions','edit-religions','delete-religions',
        'view-relief-packages','create-relief-packages','edit-relief-packages','delete-relief-packages',
        'view-grant-types','create-grant-types','edit-grant-types','delete-grant-types',
        'view-loan-types','create-loan-types','edit-loan-types','delete-loan-types',
        'view-loan-purpose-types','create-loan-purpose-types','edit-loan-purpose-types','delete-loan-purpose-types',
        'view-loan-statuses','create-loan-statuses','edit-loan-statuses','delete-loan-statuses',
        'view-fiscal-years','create-fiscal-years','edit-fiscal-years','delete-fiscal-years',
        'view-educational-loan-faculties','create-educational-loan-faculties','edit-educational-loan-faculties','delete-educational-loan-faculties',
        'view-educational-loan-levels','create-educational-loan-levels','edit-educational-loan-levels','delete-educational-loan-levels',
        'view-educational-loan-faculties-types','create-educational-loan-faculties-types','edit-educational-loan-faculties-types','delete-educational-loan-faculties-types',
        'view-loan-settings','create-loan-settings','edit-loan-settings','delete-loan-settings',
        'view-loan-details','create-loan-details','edit-loan-details','delete-loan-details',
        'view-loan-reports','create-loan-reports','edit-loan-reports','delete-loan-reports',
        'view-users','create-users','edit-users','delete-users',
        'view-roles','create-roles','edit-roles','delete-roles',
        'view-permissions','create-permissions','edit-permissions','delete-permissions',
        'view-logs','create-logs','edit-logs','delete-logs',
        'view-payment-reimbursement-sections','create-payment-reimbursement-sections','edit-payment-reimbursement-sections','delete-payment-reimbursement-sections',
        ];

        // Looping and Inserting Array's Permissions into Permission Table
        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        $superAdminRole->givePermissionTo(Permission::all());
        $adminRole->givePermissionTo(Permission::all());
    }
}

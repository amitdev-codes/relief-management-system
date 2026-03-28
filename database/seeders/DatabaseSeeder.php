<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\RoleSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        $this->call(GenderSeeder::class);
        // $this->call(RoleSeeder::class);
        $this->call(MasterSeeder::class);
        $this->call(CountrySeeder::class);
        $this->call(LanguageSeeder::class);
        $this->call(CasteSeeder::class);
        $this->call(ProvinceSeeder::class);
        $this->call(DistrictSeeder::class);
        $this->call(LocalLevelSeeder::class);
        $this->call(OccupationSeeder::class);
        $this->call(MstFacultySeeder::class);
        $this->call(MstEduLevelSeeder::class);
        $this->call(MstEduDegreesSeeder::class);
        $this->call(MstEduDivisionsSeeder::class);
        $this->call(ReliefTypeSeeder::class);
        $this->call(GrantTypeSeeder::class);
        $this->call(LoanTypeSeeder::class);
        $this->call(LoanPurposeTypeSeeder::class);
        $this->call(InstallmentsSeeder::class);
        $this->call(GrantBusinessTypeSeeder::class);
        $this->call(GrantPurposeTypeSeeder::class);
        $this->call(MstStatusSeeder::class);
        $this->call(LoanSettingSeeder::class);
        $this->call(MstLengthUnitSeeder::class);
        $this->call(MstReliefSubCategorySeeder::class);
        $this->call(MstFinancialStatusSeeder::class);
        $this->call(MstFiscalYearSeeder::class);
        $this->call(EducationalLoanFacultySeeder::class);
        $this->call(MstPaymentSourceSeeder::class);


        $this->call(RoleSeeder::class);
        $this->call(PermissionSeeder::class);
        $this->call(UserSeeder::class);


    }
}

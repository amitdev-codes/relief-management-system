<?php

namespace Database\Seeders;

use App\Models\loan\LoanSetting;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LoanSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $loanSettings = [
            ['palika_id' => '370', 'fiscal_year_id' => '7', 'loan_purpose_type_id' => '2','interest_rate'=>6,'fine_interest'=>'5','loan_repayment_period'=>'3'],
        ];
        foreach ($loanSettings as $loanSetting) {
            LoanSetting::create($loanSetting);
        }
    }
}

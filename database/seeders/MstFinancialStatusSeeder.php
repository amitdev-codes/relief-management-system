<?php

namespace Database\Seeders;

use App\Models\FinancialStatus;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MstFinancialStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $financial_statuses= [
            ['code' => 'NM', 'name' => 'LOWER POVERTY', 'name_np' => 'निम्न बर्गीय','yearly_income'=>'100000'],
            ['code' => 'MP', 'name' => 'MEDIUM POVERTY', 'name_np' => 'मध्यम बर्गीय','yearly_income'=>'200000'],
            ['code' => 'HP', 'name' => 'UNABLE TO INCOME', 'name_np' => 'उच बर्गीय','yearly_income'=>'300000'],

        ];
        foreach ($financial_statuses as $financialStatus) {
            FinancialStatus::create($financialStatus);
        }
    }
}

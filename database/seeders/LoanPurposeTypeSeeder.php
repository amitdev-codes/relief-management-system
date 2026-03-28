<?php

namespace Database\Seeders;

use App\Models\LoanPurposeType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LoanPurposeTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $loan_purpose_types = [
            ['code' => 'AD', 'name' => 'Agricultural Development', 'name_np' => 'कृषि विकास'],
            ['code' => 'ED', 'name' => 'Educational Loan', 'name_np' => 'शैक्षिक ऋण'],
            ['code' => 'B', 'name' => 'Business operation', 'name_np' => 'व्यवसाय सञ्चालन'],
            ['code' => 'O', 'name' => 'Other', 'name_np' => 'अन्य'],
        ];

        foreach ($loan_purpose_types as $loan_type) {
            LoanPurposeType::create($loan_type);
        }
    }
}

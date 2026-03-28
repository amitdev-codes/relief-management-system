<?php

namespace Database\Seeders;

use App\Models\LoanType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LoanTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $loan_types = [
            ['code' => 'C', 'name' => 'Cash', 'name_np' => 'नगद'],
            ['code' => 'J', 'name' => 'Jinsi', 'name_np' => 'जिन्सी'],
            ['code' => 'O', 'name' => 'Other', 'name_np' => 'अन्य'],
        ];

        foreach ($loan_types as $loan_type) {
            LoanType::create($loan_type);
        }
    }
}

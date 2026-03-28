<?php

namespace Database\Seeders;

use App\Models\GrantPurposeType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GrantPurposeTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $loan_purpose_types = [
            ['code' => 'AD', 'name' => 'Agricultural Development', 'name_np' => 'कृषि विकास'],
            ['code' => 'B', 'name' => 'Business operation', 'name_np' => 'व्यवसाय सञ्चालन'],
            ['code' => 'O', 'name' => 'Other', 'name_np' => 'अन्य'],
        ];

        foreach ($loan_purpose_types as $loan_type) {
            GrantPurposeType::create($loan_type);
        }
    }
}

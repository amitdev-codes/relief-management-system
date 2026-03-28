<?php

namespace Database\Seeders;

use App\Models\GrantBusinessType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GrantBusinessTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $grant_business_types = [
            ['code' => 'SS', 'name' => 'Seed Subsidy', 'name_np' => 'बीउबिजन अनुदान'],
            ['code' => 'FS', 'name' => 'Fertilizer Subsidy', 'name_np' => 'मलखाद अनुदान'],
            ['code' => 'IS', 'name' => 'Irrigation Subsidy', 'name_np' => 'असिँचाइ अनुदानन्य'],
            ['code' => 'AES', 'name' => 'Agricultural Equipment Subsidy', 'name_np' => 'कृषि उपकरण अनुदान '],
            ['code' => 'LS', 'name' => 'Livestock Subsidy', 'name_np' => 'पशुपालन अनुदान'],
            ['code' => 'OT', 'name' => ' Other', 'name_np' => 'अन्य'],
        ];

        foreach ($grant_business_types as $loan_type) {
            GrantBusinessType::create($loan_type);
        }
    }
}

<?php

namespace Database\Seeders;

use App\Models\GrantType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GrantTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $grant_types = [
            ['code' => 'C', 'name' => 'Cash', 'name_np' => 'नगद'],
            ['code' => 'J', 'name' => 'Jinsi', 'name_np' => 'जिन्सी'],
            ['code' => 'O', 'name' => 'Other', 'name_np' => 'अन्य'],
        ];

        foreach ($grant_types as $grant_type) {
            GrantType::create($grant_type);
        }
    }
}

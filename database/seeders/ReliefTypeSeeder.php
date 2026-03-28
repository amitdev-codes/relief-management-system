<?php

namespace Database\Seeders;

use App\Models\ReliefType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReliefTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     *
     */
    public function run(): void
    {
        $relief_types = [
            ['code' => 'C', 'name' => 'Cash', 'name_np' => 'नगद'],
            ['code' => 'J', 'name' => 'Jinsi', 'name_np' => 'जिन्सी'],
            ['code' => 'F', 'name' => 'Food', 'name_np' => 'खाद्यान्न'],
            ['code' => 'CLT', 'name' => 'Clothes', 'name_np' => 'लत्ताकपडा'],
            ['code' => 'MD', 'name' => 'Medicine', 'name_np' => 'औषधि'],
            ['code' => 'OT', 'name' => ' Other', 'name_np' => 'अन्य'],
        ];

        foreach ($relief_types as $rt) {
            ReliefType::create($rt);
        }
    }
}

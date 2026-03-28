<?php

namespace Database\Seeders;

use App\Models\master\EduLevel;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MstEduLevelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $educationLevels = [
            ['code' => 'PRI', 'name' => 'Primary', 'name_np' => 'प्राथमिक'],
            ['code' => 'LOW', 'name' => 'Lower Secondary', 'name_np' => 'निम्न माध्यमिक'],
            ['code' => 'SEC', 'name' => 'Secondary', 'name_np' => 'माध्यमिक'],
            ['code' => 'HSE', 'name' => 'Higher Secondary', 'name_np' => 'उच्च माध्यमिक'],
            ['code' => 'BCH', 'name' => 'Bachelor', 'name_np' => 'स्नातक'],
            ['code' => 'MAS', 'name' => 'Master', 'name_np' => 'स्नातकोत्तर'],
            ['code' => 'MPH', 'name' => 'M.Phil', 'name_np' => 'एम.फिल'],
            ['code' => 'PHD', 'name' => 'Ph.D.', 'name_np' => 'पी.एच.डी'],
            ['code' => 'OTH', 'name' => 'Other', 'name_np' => 'अन्य'],
        ];
        foreach ($educationLevels as $educationLevel) {
            EduLevel::create($educationLevel);
        }
    }
}

<?php

namespace Database\Seeders;

use App\Models\master\EduDivision;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MstEduDivisionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $educationDivisions = [
            ['code' => 'FD', 'name' => 'First Division', 'name_np' => 'पहिलो श्रेणी'],
            ['code' => 'SD', 'name' => 'Second Division', 'name_np' => 'दोस्रो श्रेणी'],
            ['code' => 'TD', 'name' => 'Third Division', 'name_np' => 'तेस्रो श्रेणी'],
            ['code' => 'PASS', 'name' => 'Pass', 'name_np' => 'पास'],
        ];

        foreach ($educationDivisions as $educationDivision) {
            EduDivision::create($educationDivision);
        }

    }
}

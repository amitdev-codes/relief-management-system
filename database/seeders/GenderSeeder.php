<?php

namespace Database\Seeders;

use App\Models\Gender;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GenderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $genders = [
            ['code' => 'M', 'name' => 'Male', 'name_np' => 'पुरुष'],
            ['code' => 'F', 'name' => 'Female', 'name_np' => 'महिला'],
            ['code' => 'O', 'name' => 'Other', 'name_np' => 'अन्य'],
            ['code' => 'N', 'name' => 'Not Specified', 'name_np' => 'निर्दिष्ट गरिएको छैन'],
        ];

        foreach ($genders as $gender) {
            Gender::create($gender);
        }
    }
}

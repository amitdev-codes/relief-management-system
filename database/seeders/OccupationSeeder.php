<?php

namespace Database\Seeders;

use App\Models\master\Occupation;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OccupationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $occupations = [
            ['code' => 'AGR', 'name' => 'Agriculture', 'name_np' => 'कृषि'],
            ['code' => 'BUS', 'name' => 'Business', 'name_np' => 'व्यवसाय'],
            ['code' => 'ENG', 'name' => 'Engineer', 'name_np' => 'इन्जिनियर'],
            ['code' => 'DOC', 'name' => 'Doctor', 'name_np' => 'चिकित्सक'],
            ['code' => 'EDU', 'name' => 'Education', 'name_np' => 'शिक्षा'],
            ['code' => 'GOV', 'name' => 'Government Service', 'name_np' => 'सरकारी सेवा'],
            ['code' => 'LAB', 'name' => 'Laborer', 'name_np' => 'मजदुर'],
            ['code' => 'STU', 'name' => 'Student', 'name_np' => 'विद्यार्थी'],
            ['code' => 'RET', 'name' => 'Retired', 'name_np' => 'सेवानिवृत्त'],
            ['code' => 'HOM', 'name' => 'Homemaker', 'name_np' => 'गृहिणी'],
            ['code' => 'OTH', 'name' => 'Other', 'name_np' => 'अन्य'],
        ];
        foreach ($occupations as $occupation) {
            Occupation::create($occupation);
        }
    }
}

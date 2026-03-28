<?php

namespace Database\Seeders;

use App\Models\master\EduDegree;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MstEduDegreesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $educationDegrees = [
            ['edu_level_id' => 1, 'edu_faculty_id' => 1, 'code' => 'LIT', 'name' => 'Literacy', 'name_np' => 'साक्षरता'],
            ['edu_level_id' => 2, 'edu_faculty_id' => 2, 'code' => 'PRI', 'name' => 'Primary School Certificate', 'name_np' => 'प्राथमिक विद्यालय प्रमाणपत्र'],
            ['edu_level_id' => 3, 'edu_faculty_id' => 3, 'code' => 'LSE', 'name' => 'Lower Secondary School Certificate', 'name_np' => 'निम्न माध्यमिक विद्यालय प्रमाणपत्र'],
            ['edu_level_id' => 4, 'edu_faculty_id' => 4, 'code' => 'SEC', 'name' => 'Secondary School Certificate (SLC)', 'name_np' => 'माध्यमिक विद्यालय प्रमाणपत्र (एस.एल.सी.)'],
            ['edu_level_id' => 5, 'edu_faculty_id' => 5, 'code' => 'HSE', 'name' => 'Higher Secondary Education Certificate (HSEB)', 'name_np' => 'उच्च माध्यमिक शिक्षा परिषद प्रमाणपत्र'],
            ['edu_level_id' => 6, 'edu_faculty_id' => 6, 'code' => 'BCH', 'name' => 'Bachelor\'s Degree', 'name_np' => 'स्नातक उपाधि'],
            ['edu_level_id' => 7, 'edu_faculty_id' => 7, 'code' => 'MAS', 'name' => 'Master\'s Degree', 'name_np' => 'स्नातकोत्तर उपाधि'],
            ['edu_level_id' => 8, 'edu_faculty_id' => 8, 'code' => 'MPH', 'name' => 'M.Phil', 'name_np' => 'एम.फिल'],
            ['edu_level_id' => 9, 'edu_faculty_id' => 9, 'code' => 'PHD', 'name' => 'Ph.D.', 'name_np' => 'पी.एच.डी'],
            ['edu_level_id' => 9, 'edu_faculty_id' => 10, 'code' => 'OTH', 'name' => 'Other', 'name_np' => 'अन्य'],
        ];
        foreach ($educationDegrees as $educationDegree) {
            EduDegree::create($educationDegree);
        }

    }
}

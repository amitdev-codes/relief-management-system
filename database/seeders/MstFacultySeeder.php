<?php

namespace Database\Seeders;

use App\Models\master\Faculty;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MstFacultySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faculties = [
            ['code' => 'SCI', 'name' => 'Science', 'name_np' => 'विज्ञान'],
            ['code' => 'MAN', 'name' => 'Management', 'name_np' => 'व्यवस्थापन'],
            ['code' => 'HUM', 'name' => 'Humanities', 'name_np' => 'मानविकी'],
            ['code' => 'EDU', 'name' => 'Education', 'name_np' => 'शिक्षा'],
            ['code' => 'LAW', 'name' => 'Law', 'name_np' => 'कानून'],
            ['code' => 'ENG', 'name' => 'Engineering', 'name_np' => 'इन्जिनियरिङ'],
            ['code' => 'MED', 'name' => 'Medicine', 'name_np' => 'चिकित्सा'],
            ['code' => 'AGR', 'name' => 'Agriculture', 'name_np' => 'कृषि'],
            ['code' => 'SOC', 'name' => 'Social Sciences', 'name_np' => 'सामाजिक विज्ञान'],
            ['code' => 'FIN', 'name' => 'Finance', 'name_np' => 'वित्त'],
            ['code' => 'ART', 'name' => 'Arts', 'name_np' => 'कला'],
            ['code' => 'COM', 'name' => 'Commerce', 'name_np' => 'वाणिज्य'],
            ['code' => 'IT', 'name' => 'Information Technology', 'name_np' => 'सूचना प्रविधि'],
            ['code' => 'PHR', 'name' => 'Pharmacy', 'name_np' => 'फार्मेसी'],
            ['code' => 'NUR', 'name' => 'Nursing', 'name_np' => 'नर्सिङ'],
            ['code' => 'VET', 'name' => 'Veterinary Science', 'name_np' => 'पशु चिकित्सा विज्ञान'],
        ];
        foreach ($faculties as $faculty) {
            Faculty::create($faculty);
        }
    }
}

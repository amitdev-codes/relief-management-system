<?php

namespace Database\Seeders;

use App\Models\Province;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProvinceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $provinces = [
            ['code'=>2001, 'name' => 'Province 1', 'name_np' => 'कोशी प्रदेश'],
            ['code'=>2002,'name' => 'Madhesh', 'name_np' => 'मधेश प्रदेश'],
            ['code'=>2003,'name' => 'Bagmati Province', 'name_np' => 'बागमती प्रदेश'],
            ['code'=>2004,'name' => 'Gandaki Province', 'name_np' => 'गण्डकी प्रदेश'],
            ['code'=>2005,'name' => 'Lumbini Province', 'name_np' => 'लुम्बिनी प्रदेश'],
            ['code'=>2006,'name' => 'Karnali Province', 'name_np' => 'कर्णाली प्रदेश'],
            ['code'=>2007,'name' => 'Sudurpashchim Province', 'name_np' => 'सुदूरपश्चिम प्रदेश']
        ];

        foreach ($provinces as $province) {
            Province::create($province);
        }
    }
}

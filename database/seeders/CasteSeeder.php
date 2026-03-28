<?php

namespace Database\Seeders;

use App\Models\Caste;
use Faker\Factory as Faker;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CasteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        $castes = [
            'Brahmin', 'Chhetri', 'Thakur', 'Newar', 'Magar', 'Gurung',
            'Tamang', 'Sherpa', 'Rai', 'Limbu', 'Kshatriya', 'Yadav',
            'Madhesi', 'Muslim', 'Tharu', 'Buddhist', 'Hindu', 'Kirant',
            'Brahman', 'Kirat', 'Gorkha', 'Rajput', 'Dawadi', 'Rana',
            'Karki', 'Chaudhary', 'Bhujel', 'Kham', 'Bist', 'Ghatani',
            'Lohar', 'Sanyasi', 'Sadhu', 'Yogi', 'Nauka', 'Lohar',
            'Jogi', 'Teli', 'Sarki', 'Kami', 'Damai', 'Rana', 'Sanyasi',
            'Kumar', 'Pandit', 'Dhobi', 'Dharmasala', 'Jogi', 'Magar'
        ];

        foreach ($castes as $caste) {
            Caste::create([
                'name' => $caste,
                'name_np' => $faker->word, // Example Nepali name, replace with actual if needed
            ]);
        }
    }
}

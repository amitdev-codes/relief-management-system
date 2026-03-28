<?php

namespace Database\Seeders;

use App\Models\Country;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CountrySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $countries = [
            ['code' => 'AF', 'name' => 'Afghanistan', 'name_np' => 'अफगानिस्तान'],
            ['code' => 'AL', 'name' => 'Albania', 'name_np' => 'अल्बानिया'],
            ['code' => 'DZ', 'name' => 'Algeria', 'name_np' => 'अल्जेरिया'],
            ['code' => 'AS', 'name' => 'American Samoa', 'name_np' => 'अमेरिकन समोआ'],
            ['code' => 'AD', 'name' => 'Andorra', 'name_np' => 'एन्डोरा'],
            ['code' => 'AO', 'name' => 'Angola', 'name_np' => 'अङ्गोला'],
            ['code' => 'AG', 'name' => 'Antigua and Barbuda', 'name_np' => 'एन्टिगुआ र बारबुडा'],
            ['code' => 'AR', 'name' => 'Argentina', 'name_np' => 'अर्जेन्टिना'],
            ['code' => 'AM', 'name' => 'Armenia', 'name_np' => 'आर्मेनिया'],
            ['code' => 'AU', 'name' => 'Australia', 'name_np' => 'अस्ट्रेलिया'],
            ['code' => 'NP', 'name' => 'Nepal', 'name_np' => 'नेपाल'],
            // Add more countries as needed
        ];

        foreach ($countries as $country) {
            Country::create($country);
        }

    }
}

<?php

namespace Database\Seeders;

use App\Models\LengthUnit;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MstLengthUnitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $lengthUnits = [
            ['code' => 'RS', 'name' => 'RUPEE', 'name_np' => 'रुपैया'],
            ['code' => 'TH', 'name' => 'UNIT', 'name_np' => 'थान'],
            ['code' => 'PC', 'name' => 'PIECE', 'name_np' => 'पिस'],
            ['code' => 'KL', 'name' => 'KILO', 'name_np' => 'किलो'],
            ['code' => 'LT', 'name' => 'LITRE', 'name_np' => 'लिटर'],
            ['code' => 'DZ', 'name' => 'DOZEN', 'name_np' => 'दर्जन'],
            ['code' => 'SP', 'name' => 'STRIP', 'name_np' => 'पत्ता'],

        ];
        foreach ($lengthUnits as $lengthUnit) {
            LengthUnit::create($lengthUnit);
        }
    }
}

<?php

namespace Database\Seeders;

use App\Models\Installment;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class InstallmentsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $installments = [
            ['code' => 'total', 'name' => 'Total Amount', 'name_np' => 'एक मुस्ट'],
            ['code' => 'first', 'name' => 'First Installment', 'name_np' => 'पहिलो किस्ता'],
            ['code' => 'second', 'name' => 'Second Installment operation', 'name_np' => 'दोस्रो किस्ता '],
            ['code' => 'third', 'name' => 'Third Installment operation', 'name_np' => ' तेस्रो किस्ता '],
            ['code' => 'fourth', 'name' => 'Fourth Installment operation', 'name_np' => 'चौथौ किस्ता '],
            ['code' => 'other', 'name' => 'Other', 'name_np' => 'अन्य'],
        ];

        foreach ($installments as $installment) {
            Installment::create($installment);
        }
    }
}

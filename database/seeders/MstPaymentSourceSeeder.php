<?php

namespace Database\Seeders;

use App\Models\master\PaymentSource;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MstPaymentSourceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $payment_sources= [
            ['code' => 'cash', 'name' => 'CASH', 'name_np' => 'नगद'],
            ['code' => 'cheque', 'name' => 'CHEQUE', 'name_np' => 'चेक'],
            ['code' => 'voucher', 'name' => 'VOUCHER', 'name_np' => 'भौचर'],
            ['code' => 'bankTransfer', 'name' => 'BANK TRANSFER', 'name_np' => ' बैंक ट्रान्सफर '],

        ];
        foreach ($payment_sources as $payment_source) {
            PaymentSource::create($payment_source);
        }
    }
}

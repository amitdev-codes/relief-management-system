<?php

namespace Database\Seeders;

use App\Models\Status;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MstStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $loan_types = [
            ['code' => 'A', 'name' => 'Approved', 'name_np' => 'स्वीकृत'],
            ['code' => 'P', 'name' => 'Pending', 'name_np' => 'विचाराधीन'],
            ['code' => 'R', 'name' => 'Rejected', 'name_np' => 'अस्वीकृत'],
        ];

        foreach ($loan_types as $loan_type) {
            Status::create($loan_type);
        }
    }
}

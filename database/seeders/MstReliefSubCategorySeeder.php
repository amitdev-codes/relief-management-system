<?php

namespace Database\Seeders;

use App\Models\ReliefSubCategory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MstReliefSubCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $relief_sub_categories = [
            //cash
            ['code' => 'C','relief_type_id'=>1, 'name' => 'CASH', 'name_np' => 'नगद','amount'=>'5000','length_unit_id'=>1],
            ['code' => 'C','relief_type_id'=>1, 'name' => 'CASH', 'name_np' => 'नगद','amount'=>'10000','length_unit_id'=>1],
            ['code' => 'C','relief_type_id'=>1, 'name' => 'CASH', 'name_np' => 'नगद','amount'=>'15000','length_unit_id'=>1],
            ['code' => 'C','relief_type_id'=>1, 'name' => 'CASH', 'name_np' => 'नगद','amount'=>'20000','length_unit_id'=>1],
            ['code' => 'C','relief_type_id'=>1, 'name' => 'CASH', 'name_np' => 'नगद','amount'=>'25000','length_unit_id'=>1],
            ['code' => 'C','relief_type_id'=>1, 'name' => 'CASH', 'name_np' => 'नगद','amount'=>'30000','length_unit_id'=>1],
            ['code' => 'C','relief_type_id'=>1, 'name' => 'CASH', 'name_np' => 'नगद','amount'=>'35000','length_unit_id'=>1],
            //jinisi
            ['code' => 'J','relief_type_id'=>2, 'name' => 'TENT', 'name_np' => 'त्रिपाल','length_unit_id'=>2],
            ['code' => 'J','relief_type_id'=>2, 'name' => 'BUCKET', 'name_np' => 'बाल्टिन','length_unit_id'=>3],
            ['code' => 'J','relief_type_id'=>2, 'name' => 'MUG', 'name_np' => 'मग','length_unit_id'=>3],
            //Food
            ['code' => 'F','relief_type_id'=>3, 'name' => 'RICE', 'name_np' => 'चामल','length_unit_id'=>4],
            ['code' => 'F','relief_type_id'=>3, 'name' => 'LENTILS', 'name_np' => 'दाल','length_unit_id'=>4],
            ['code' => 'F','relief_type_id'=>3, 'name' => 'POTATO', 'name_np' => 'आलु','length_unit_id'=>4],
            ['code' => 'F','relief_type_id'=>3, 'name' => 'SALT', 'name_np' => 'नुन','length_unit_id'=>4],
            ['code' => 'F','relief_type_id'=>3, 'name' => 'OIL', 'name_np' => 'तेल','length_unit_id'=>5],
            ['code' => 'F','relief_type_id'=>3, 'name' => 'NOODLES', 'name_np' => 'चाउचाउ','length_unit_id'=>6],

            //Clothes
            ['code' => 'CLT','relief_type_id'=>4, 'name' => 'BLANKET', 'name_np' => 'ब्लान्केट','length_unit_id'=>2],
            ['code' => 'CLT','relief_type_id'=>4, 'name' => 'SHIRT', 'name_np' => 'शर्ट','length_unit_id'=>2],
            ['code' => 'CLT','relief_type_id'=>4, 'name' => 'PANTS', 'name_np' => 'प्यान्ट','length_unit_id'=>2],
            //mdeicine
            ['code' => 'MD','relief_type_id'=>5, 'name' => 'CETAMAOL', 'name_np' => 'सिटामोल','length_unit_id'=>6],
            ['code' => 'MD','relief_type_id'=>5, 'name' => 'COUGH SYRUP', 'name_np' => 'कफ  सिरप','length_unit_id'=>6],
            ['code' => 'MD','relief_type_id'=>5, 'name' => 'THERMOMETER', 'name_np' => 'थर्मोमिटर ','length_unit_id'=>3],
        ];
        foreach ($relief_sub_categories as $faculty) {
            ReliefSubCategory::create($faculty);
        }
    }
}

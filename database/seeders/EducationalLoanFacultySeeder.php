<?php

namespace Database\Seeders;

use App\Models\EducationalLoanFaculty;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EducationalLoanFacultySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $educational_loan_faculties= [
            ['fiscal_year_id' => '7', 'faculty_id' => '1', 'loan_amount' => '500000','code'=>'SC','status'=>true],
            ['fiscal_year_id' => '7', 'faculty_id' => '2', 'loan_amount' => '400000','code'=>'MG','status'=>true],
            ['fiscal_year_id' => '7', 'faculty_id' => '3', 'loan_amount' => '300000','code'=>'HM','status'=>true],
            ['fiscal_year_id' => '7', 'faculty_id' => '4', 'loan_amount' => '300000','code'=>'ED','status'=>true],
            ['fiscal_year_id' => '7', 'faculty_id' => '5', 'loan_amount' => '200000','code'=>'LW','status'=>true],

        ];
        foreach ($educational_loan_faculties as $educational_loan_faculty) {
            EducationalLoanFaculty::create($educational_loan_faculty);
        }

    }
}

<?php

namespace Database\Seeders;

use App\Models\SchoolYear;
use App\Models\Student;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'student_no' => '2019-00001',
                'address' => '1234 Street, City, Country',
                'phone' => '09123456789',
                'date_of_birth' => '2000-08-16',
                'gender' => 'male',
                'section_id' => 1,
                'course_id' => 1,
                'sy_id' => SchoolYear::where('is_active', true)->first()->id,
            ],
            [
                'student_no' => '2019-00002',
                'address' => '1234 Street, City, Country',
                'phone' => '09123456789',
                'date_of_birth' => '2000-08-16',
                'gender' => 'female',
                'section_id' => 1,
                'course_id' => 1,
                'sy_id' => SchoolYear::where('is_active', true)->first()->id,
            ],
            [
                'student_no' => '2019-00003',
                'address' => '1234 Street, City, Country',
                'phone' => '09123456789',
                'date_of_birth' => '2000-08-16',
                'gender' => 'male',
                'section_id' => 4,
                'course_id' => 2,
                'sy_id' => SchoolYear::where('is_active', true)->first()->id,
            ],
        ];
        foreach ($data as $student) {
            Student::create($student);
        }
    }
}
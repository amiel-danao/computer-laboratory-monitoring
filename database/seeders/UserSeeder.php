<?php

namespace Database\Seeders;

use App\Models\FacultyMember;
use App\Models\Student;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'email' => 'faculty1@email.com',
                'password' => Hash::make('password'),
                'role_id' => 1,
                'faculty_member_id' => 1,
                'full_name' => fake()->userName()
            ],
            [
                'email' => 'faculty2@email.com',
                'password' => Hash::make('password'),
                'role_id' => 2,
                'faculty_member_id' => 2,
                'full_name' => fake()->userName()
            ],
            [
                'email' => 'student1@email.com',
                'password' => Hash::make('password'),
                'role_id' => 4,
                'student_id' => 1,
                'full_name' => fake()->userName()
            ],
            [
                'email' => 'student2@email.com',
                'password' => Hash::make('password'),
                'role_id' => 4,
                'student_id' => 2,
                'full_name' => fake()->userName()
            ],
            [
                'email' => 'student3@email.com',
                'password' => Hash::make('password'),
                'role_id' => 4,
                'student_id' => 3,
                'full_name' => fake()->userName()
            ]
        ];
        foreach ($data as $item) {
            User::create($item);
        }
    }
}
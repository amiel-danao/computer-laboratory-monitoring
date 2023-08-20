<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FacultyMemberSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'first_name' => 'John',
                'last_name' => 'Doe',
                'email' => 'admin@email.com',
                'phone' => '09123456789',
                'department_id' => 1,
            ],
            [
                'first_name' => 'Juan',
                'last_name' => 'Tamad',
                'email' => 'teacher1@email.com',
                'phone' => '09123456789',
                'department_id' => 2,
            ],

        ];
        foreach ($data as $item) {
            \App\Models\FacultyMember::create($item);
        }
    }
}
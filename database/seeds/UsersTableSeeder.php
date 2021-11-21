<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = \App\User::firstOrCreate([
            'email' => 'admin@lainatti.com',
        ],[
            'name' =>  'Admin',
            'password' => bcrypt('!secret123@2020')
        ]);
    }
}

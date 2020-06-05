<?php

use Illuminate\Database\Seeder;

class AjaxAppSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(\App\AjaxApp::class, 20)->create();
    }
}

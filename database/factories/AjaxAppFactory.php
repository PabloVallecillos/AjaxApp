<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\AjaxApp;
use Faker\Generator as Faker;

$factory->define(AjaxApp::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'email' => $faker->unique()->email,
        'phonenumber' => $faker->unique()->phoneNumber,
    ];
});


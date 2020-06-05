<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
// Modelo Contact
        // id
        // name
        // email
        // phone
// crud ajax, paginado   
// get todas 

// Route::get('/', function () {
//     return view('welcome');
// });


Route::get('indexajax', 'AjaxAppController@indexajax');
Route::get('index', 'AjaxAppController@index');
Route::get('add', 'AjaxAppController@add');
Route::get('edit/{id}', 'AjaxAppController@edit');
Route::get('update/{id}', 'AjaxAppController@update');
Route::get('delete/{id}', 'AjaxAppController@delete');

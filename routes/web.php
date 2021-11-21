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
//Route::get('/', function () {
//    return view('construction');
//});

Route::get('/', 'PagesController@home')->name('home');

Route::get('/admin/{any?}', 'UsersController@returnPanel')
   ->where('any', '.*')
   ->name('frontend');


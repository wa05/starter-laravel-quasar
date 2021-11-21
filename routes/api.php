<?php

use Illuminate\Http\Request;

//header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
//header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization, Accept,charset,boundary,Content-Length');
//header('Access-Control-Allow-Origin: *');

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

//'middleware' => ['auth:api'],
Route::group(['prefix' => 'v1', 'middleware' => ['cors']], function () {

    Route::get('user', function (Request $request) {
        $user = $request->user();
        // $user['version'] = config('constants.version');

        return $user;

    });

    Route::get('getTableStructure', 'TablesController@getTableStructure');

    Route::group(['prefix' => 'treatments'], function() {
        Route::post('delete', 'TreatmentsController@delete');
        Route::post('forSelect', 'TreatmentsController@forSelect');
        Route::resource('resource', 'TreatmentsController');
    });

    Route::group(['prefix' => 'images'], function() {
        Route::post('delete', 'ImagesController@deleteImage');
        Route::resource('resource', 'ImagesController');
    });

    Route::group(['prefix' => 'subtreatments'], function() {
        Route::post('delete', 'SubTreatmentsController@delete');
        Route::resource('resource', 'SubTreatmentsController');
    });
});

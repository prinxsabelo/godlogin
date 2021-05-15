<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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



// Route::middleware('auth')->group(function () {
 
    Route::get('auth/google/url', 'App\Http\Controllers\Api\AuthController@googleRegUrl');
    Route::get('auth/google/callback', 'App\Http\Controllers\Api\AuthController@handleGoogleRegCallback');
    Route::post('/register', 'App\Http\Controllers\Api\AuthController@Register');
    Route::post('/login', 'App\Http\Controllers\Api\AuthController@Login');
    Route::middleware('auth')->group(function () {

    });     
    Route::middleware('auth:api')->get('/user', function (Request $request) {
        return auth()->user();
    });
// 
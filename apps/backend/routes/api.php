<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\AccountController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\LikeController;
use Illuminate\Support\Facades\Route;


Route::controller(AuthController::class)->group(function(){
    Route::post('/auth/login', 'login');
    Route::post('/auth/register', 'register');
    Route::post('/auth/logout', 'logout');
    Route::post('/auth/refresh', 'refresh');
});

Route::controller(AccountController::class)->group(function(){
    Route::get('/account/{handle}', 'get_profile');
    Route::get('/shop', 'get_shops');
    Route::get('/shop/work_hours/{shop_id}', 'get_shop_hours');
    Route::get('/post/get', [PostController::class, 'get_posts']);
});

Route::middleware('auth:api')->group(function(){
    Route::post('/user/update-profile', [UserController::class, 'update_profile']);
    Route::post('/user/update-profile-img', [UserController::class, 'update_profile_image']);
    Route::post('/user/create-post', [PostController::class, 'create_post']);
    Route::post('/post/like/{post_id}', [LikeController::class, 'toggle_like']);
    Route::post('/user/generate-image', [UserController::class, 'generate_image']);
    Route::post('/shop/day-reservations', [UserController::class, 'get_reservatione_of_day']);
});
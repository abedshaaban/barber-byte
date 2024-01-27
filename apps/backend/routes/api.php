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
    Route::post('/auth/check-email', 'check_email');
});

Route::controller(AccountController::class)->group(function(){
    Route::get('/account/{handle}', 'get_profile');
    Route::get('/shop', 'get_shops');
    Route::get('/shop/work_hours/{shop_id}', 'get_shop_hours');
    Route::get('/post/get', [PostController::class, 'get_posts']);
    Route::post('/post/get-by-handle', [PostController::class, 'get_user_posts_by_handle']);
});

Route::middleware('auth:api')->group(function(){
    Route::post('/user/update-profile', [UserController::class, 'update_profile']);
    Route::post('/user/update-profile-img', [UserController::class, 'update_profile_image']);
    Route::post('/user/create-post', [PostController::class, 'create_post']);
    Route::post('/user/get-user-posts', [PostController::class, 'get_user_posts']);
    Route::post('/post/like/{post_id}', [LikeController::class, 'toggle_like']);
    Route::post('/user/generate-image', [UserController::class, 'generate_image']);
    Route::post('/shop/day-reservations', [UserController::class, 'get_reservation_of_day']);
    Route::post('/user/create-reservations', [UserController::class, 'create_reservation']);
    Route::post('/user/get-reservations', [UserController::class, 'get_user_reservations']);
});

Route::middleware(['auth:api', 'is.admin'])->group(function(){
    Route::post('/admin/get-number-of-users', [UserController::class, 'get_number_of_users']);
    Route::post('/admin/get-number-of-likes', [LikeController::class, 'get_number_of_likes']);
    Route::post('/admin/get-user-gender', [UserController::class, 'get_user_gender']);
    Route::post('/admin/get-all-posts-for-admin', [PostController::class, 'get_posts_for_admin']);
    Route::post('/admin/get-ai-images', [UserController::class, 'get_ai_images_for_admin']);
    Route::post('/admin/get-all-reservations', [UserController::class, 'get_admin_reservations']);

});

Route::middleware(['auth:api', 'is.shop'])->group(function(){
    Route::post('/shop/get-all-reservations', [UserController::class, 'get_shop_reservations']);
});
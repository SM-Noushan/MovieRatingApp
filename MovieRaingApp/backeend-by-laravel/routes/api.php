<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\{AdminController, UserController, SigninController};

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//admin
Route::post('/signin',[SigninController::class,'signin']);
// Route::post('/admin/counter/add',[CounterController::class,'add_counter']);
Route::middleware('ApiAuth')->group(function (){
    Route::get('/signout',[SigninController::class, 'signout']);
    Route::prefix('admin/')->group(function(){
        Route::get('dashboard', [AdminController::class, 'index_admin']);
        Route::post('movie/add', [AdminController::class, 'add_movie']);
        Route::post('movie/edit/{id}', [AdminController::class, 'edit_movie']);

        Route::get('user/view', [AdminController::class, 'view_user']);
        Route::post('user/add', [AdminController::class, 'add_user']);
        Route::post('user/ban/{id}', [AdminController::class, 'ban_user']);
        Route::post('user/unban/{id}', [AdminController::class, 'unban_user']);
        Route::post('user/edit/{id}', [AdminController::class, 'edit_user']);
    });

    Route::prefix('user/')->group(function(){
        Route::get('dashboard', [UserController::class, 'index_user']);
        Route::get('movielist', [UserController::class, 'movie_list']);
        Route::get('movie/myrating', [UserController::class, 'movie_myrating']);
        Route::post('movie/rate', [UserController::class, 'movie_rate']);
        // Route::post('movie/add', [AdminController::class, 'add_movie']);
        // Route::post('movie/edit/{id}', [AdminController::class, 'edit_movie']);

        // Route::get('user/view', [AdminController::class, 'view_user']);
        // Route::post('user/add', [AdminController::class, 'add_user']);
        // Route::post('user/ban/{id}', [AdminController::class, 'ban_user']);
        // Route::post('user/unban/{id}', [AdminController::class, 'unban_user']);
        // Route::post('user/edit/{id}', [AdminController::class, 'edit_user']);
    });
    // Route::get('/logout', [AdminController::class, 'logout'])->name('admin.logout');

    //counters
    // Route::post('/counter/add',[CounterController::class,'add_counter']);
    // Route::post('/counter/add', [CounterController::class, 'add_counter'])->name('admin.counter.create');
    // Route::get('/counter/list', [CounterController::class, 'view_counter'])->name('admin.counter.view');
    // Route::get('/counter/update/{id}', [CounterController::class, 'form_edit_counter'])->name('admin.counter.edit');
    // Route::post('/counter/update/{id}', [CounterController::class, 'edit_counter'])->name('admin.counter.edit');
    // Route::get('/counter/remove/{id}', [CounterController::class, 'delete_counter'])->name('admin.counter.delete');
});

<?php

use App\Http\Controllers\InventoryController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/getInventory', [InventoryController::class, 'getInventory']);

<?php

use App\Http\Controllers\Customers;
use App\Http\Controllers\InventoryController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/getInventory', [InventoryController::class, 'getInventory']);
Route::get('/getCustomers', [Customers::class, 'getCustomers']);

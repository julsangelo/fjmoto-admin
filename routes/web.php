<?php

use App\Http\Controllers\CustomersController;
use App\Http\Controllers\OrdersController;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\EmployeesController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::post('/getInventory', [InventoryController::class, 'getInventory']);
Route::get('/getCustomers', [CustomersController::class, 'getCustomers']);
Route::post('/addInventory', [InventoryController::class, 'addInventory']);
Route::post('/editInventory', [InventoryController::class, 'editInventory']);
Route::post('/deleteInventory', [InventoryController::class, 'deleteInventory']);
Route::post('/getOrders', [OrdersController::class, 'getOrders']);
Route::post('/getEmployees', [EmployeesController::class, 'getEmployees']);
Route::post('/getPurchases', [CustomersController::class, 'getPurchases']);
Route::post('/getOrderItems', [OrdersController::class, 'getOrderItems']);
Route::post('/getCustomerInfo', [CustomerController::class, 'getCustomerInfo']);
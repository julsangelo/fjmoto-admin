<?php

use App\Http\Controllers\CustomersController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\OrdersController;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\EmployeesController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ProductCategoryController;
use App\Http\Controllers\ReferencesController;
use Illuminate\Support\Facades\Route;

Route::post('/getProducts', [InventoryController::class, 'getProducts']);
Route::get( '/getCustomers', [CustomersController::class, 'getCustomers']);
Route::post('/addInventory', [InventoryController::class, 'addInventory']);
Route::post('/editInventory', [InventoryController::class, 'editInventory']);
Route::post('/deleteInventory', [InventoryController::class, 'deleteInventory']);
Route::post('/getOrders', [OrdersController::class, 'getOrders']);
Route::post('/getEmployees', [EmployeesController::class, 'getEmployees']);
Route::post('/getViewEmployee', [EmployeesController::class, 'getViewEmployee']);
Route::post('/getPurchases', [CustomersController::class, 'getPurchases']);
Route::post('/getOrderItems', [OrdersController::class, 'getOrderItems']);
Route::post('/getCustomerInfo', [OrdersController::class, 'getCustomerInfo']);
Route::get( '/getReferences', [ReferencesController::class, 'getReferences']);
Route::post('/deleteEmployee', [EmployeesController::class, 'deleteEmployee']);
Route::post('/addEmployee', [EmployeesController::class, 'addEmployee']);
Route::post('/editEmployee', [EmployeesController::class, 'editEmployee']);
Route::post('/editProfile', [EmployeesController::class, 'editProfile']);

Route::post('/userLogin', [LoginController::class, 'userLogin']);
Route::get('/getUser', [LoginController::class, 'getUser']);

Route::post('/getAllOrder', [DashboardController::class, 'getAllOrder']);

Route::post('/setOrderFulfilled', [OrdersController::class, 'setOrderFulfilled']);
Route::post('/setOrderComplete', [OrdersController::class, 'setOrderComplete']);
Route::post('/addProductCategory', [ProductCategoryController::class, 'addProductCategory']);
Route::post('/deleteProductCategory', [ProductCategoryController::class, 'deleteProductCategory']);
Route::post('/editProductCategory', [ProductCategoryController::class, 'editProductCategory']);

Route::view('/{path?}', 'index');

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $table = 'product';
    protected $primaryKey = 'productID';
    public $timestamps = false;

    protected $fillable = [
        'productCode',
        'productName',
        'productStockQuantity',
        'productPrice',
        'productCategory',
        'productImage',
        'branchID',
    ];
}

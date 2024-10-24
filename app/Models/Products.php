<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Products extends Model
{
    protected $table = 'products';
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

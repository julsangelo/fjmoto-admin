<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Products extends Model
{
    protected $table = 'products';
    public $timestamps = false;

    protected $fillable = [
        'productId',
        'productName',
        'stockQuantity',
        'price',
        'category',
        'image',
        'branch',
    ];
}

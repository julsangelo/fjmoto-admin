<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductCategory extends Model
{
    protected $table = 'productCategory';

    protected $primaryKey = 'productCategoryID';

    public $timestamps = false;

    protected $fillable = [
        'productCategoryName',
        'productCategoryImage'
    ];
}

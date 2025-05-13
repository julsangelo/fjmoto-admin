<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderDelivery extends Model
{
    protected $table = 'orderDelivery';

    protected $primaryKey = 'orderDeliveryID';

    public $timestamps = false;
}

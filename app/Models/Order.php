<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $table = 'order';
    public $timestamps = false;

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'customerID', 'customerID');
    }
}

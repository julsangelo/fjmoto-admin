<?php

namespace App\Http\Repositories;

use App\Models\Customers;

class Customer
{
    public function getCustomers () 
    {
        $customers = Customers::get();

        $headers = array_keys($customers->first()->getAttributes());

        return [
            'headers' => $headers,
            'data' => $customers
        ];
    }
    
}

<?php

namespace App\Http\Repositories;

use App\Models\Customers;

class Customer
{
    public function getCustomers () 
    {
        $customers = Customers::select("customerName", "customerID", "customerEmail", "customerContactNo", "customerAddress")
            ->get();

        $headers = array_keys($customers->first()->getAttributes());

        return [
            'headers' => $headers,
            'data' => $customers
        ];
    }
}

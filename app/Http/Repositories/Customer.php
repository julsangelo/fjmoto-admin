<?php

namespace App\Http\Repositories;

use App\Models\Customers;
use Illuminate\Support\Facades\DB;

class Customer
{
    public function getCustomers () 
    {
        $customers = Customers::select(DB::raw('CONCAT(customerFirstName, " ", customerLastName) as customerName'), 'customerID', 'customerEmail', 'customerContactNo', 'customerAddress')
            ->get();

        $headers = array_keys($customers->first()->getAttributes());

        return [
            'headers' => $headers,
            'data' => $customers
        ];
    }
}

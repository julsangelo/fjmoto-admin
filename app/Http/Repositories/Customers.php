<?php

namespace App\Http\Repositories;

use App\Models\Customer;
use Illuminate\Support\Facades\DB;

class Customers
{
    public function getCustomers () 
    {
        $customers = Customer::select(DB::raw('CONCAT(customerFirstName, " ", customerLastName) as customerName'), 'customerID', 'customerEmail', 'customerContactNo', 'customerAddress')
            ->get();

        if ($customers->count() > 0) {
            $headers = array_keys($customers->first()->getAttributes());
        }

        return [
            'headers' => isset($headers) && !empty($headers) ? $headers : [],
            'data' => $customers
        ];
    }
}

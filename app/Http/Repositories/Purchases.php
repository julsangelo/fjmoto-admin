<?php

namespace App\Http\Repositories;

use App\Models\Orders;

class Purchases
{
    public function getPurchases($customerID)
    {
        $purchases = Orders::select()
            ->where('customerID', $customerID)
            ->orderBy('orderID', "DESC" )
            ->get()
            ;

        $headers = array_keys($purchases->first()->getAttributes());

        return [
            'headers' => $headers,
            'data' => $purchases
        ];
    }
}

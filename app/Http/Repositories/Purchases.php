<?php

namespace App\Http\Repositories;

use App\Models\Orders;

class Purchases
{
    public function getPurchases($customerID)
    {
        $purchases = Orders::select()
            ->where('customerId', $customerID)
            ->orderBy('id', "DESC" )
            ->get()
            ;

        $headers = array_keys($purchases->first()->getAttributes());

        return [
            'headers' => $headers,
            'data' => $purchases
        ];
    }
}

<?php

namespace App\Http\Repositories;

use App\Models\Orders;

class Order
{
    public function getOrders($branch)
    {
        $orders = Orders::select()
            ->where('branchID', $branch)
            ->orderBy('orderID', "DESC" )
            ->get()
            ;

        $headers = array_keys($orders->first()->getAttributes());

        return [
            'headers' => $headers,
            'data' => $orders
        ];
    }
}

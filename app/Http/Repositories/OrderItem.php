<?php

namespace App\Http\Repositories;

use App\Models\OrderItems;

class OrderItem
{
    public function getOrderItems($branch)
    {
        $orders = OrderItems::select()
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

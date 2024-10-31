<?php

namespace App\Http\Repositories;

use Illuminate\Support\Facades\DB;

class OrderItem
{
    public function getOrderItems($orderID)
    {
        $orderItems = DB::table('orderItems')
            ->join('products', 'orderItems.productID', '=', 'products.productID')
            // ->join('customers', 'orderItems.customerID', '=', 'customers.customerID')
            ->select(
                'orderItems.orderItemQuantity',
                'orderItems.orderItemTotal',
                'products.productName as productName',
                'products.productImage as productImage'
                // 'customers.customerID as customerID'
            )
            ->where('orderItems.orderID', $orderID)
            ->get();

        // $headers = array_keys($orderItems->first()->getAttributes());

        return [
            // 'headers' => $headers,
            'data' => $orderItems
        ];
    }
}

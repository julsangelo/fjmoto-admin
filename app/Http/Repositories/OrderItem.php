<?php

namespace App\Http\Repositories;

use App\Models\Customers;
use App\Models\OrderItems;
use Illuminate\Support\Facades\DB;

class OrderItem
{
    public function getOrderItems($orderID)
    {
        $orderItems = OrderItems::with(['product' => function ($query) {
            $query->select('productName', 'productImage', 'productPrice');
        }])
        ->where('orderID', $orderID)
        ->get();

        $headers = array_keys($orderItems->first()->getAttributes());

        return [
            'headers' => $headers,
            'data' => $orderItems
        ];
    }

    public function getCustomerInfo($customerID)
    {
        $customerInfo = Customers::select(DB::raw('CONCAT(customerFirstName, " ", customerLastName) as customerName'), 'customerID', 'customerEmail', 'customerContactNo', 'customerAddress')
            ->get();

        return [
            'data' => $customerInfo,
        ];
    }
}

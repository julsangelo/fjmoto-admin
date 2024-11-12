<?php

namespace App\Http\Repositories;

use App\Models\Customer;
use App\Models\OrderItem;
use Illuminate\Support\Facades\DB;

class OrderItems
{
    public function getOrderItems($orderID)
    {
        $orderItems = OrderItem::with(['product' => function ($query) {
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
        $customerInfo = Customer::select(DB::raw('CONCAT(customerFirstName, " ", customerLastName) as customerName'), 'customerID', 'customerEmail', 'customerContactNo', 'customerAddress')
            ->get();

        return [
            'data' => $customerInfo,
        ];
    }
}

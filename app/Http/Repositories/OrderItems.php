<?php

namespace App\Http\Repositories;

use App\Models\Customer;
use App\Models\OrderItem;
use Illuminate\Support\Facades\DB;

class OrderItems
{
    public function getOrderItems($orderID)
    {
        $orderItems = OrderItem::join('product', 'orderItem.productID', '=', 'product.productID')
        ->where('orderItem.orderID', $orderID)
        ->select('orderItem.*', 'product.productName', 'product.productImage', 'product.productPrice')
        ->get();

        return [
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

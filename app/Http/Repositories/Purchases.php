<?php

namespace App\Http\Repositories;

use App\Models\Order;

class Purchases
{
    public function getPurchases($customerID)
    {
        $purchases = Order::select(
            'order.*', 'orderStatus.orderStatusName as orderStatus', 'orderPaymentStatus.orderPaymentStatusName as orderPaymentStatus',
            'orderFulfillmentStatus.orderFulfillmentStatusName as orderFulfillmentStatus'
        )
        ->leftJoin('orderStatus', 'order.orderStatus', '=', 'orderStatus.orderStatusID')
        ->leftJoin('orderPaymentStatus', 'order.orderPaymentStatus', '=', 'orderPaymentStatus.orderPaymentStatusID')
        ->leftJoin('orderFulfillmentStatus', 'order.orderFulfillmentStatus', '=', 'orderFulfillmentStatus.orderFulfillmentStatusID')
        ->leftJoin('customer', 'order.customerID', '=', 'customer.customerID')
        ->where('order.customerID', $customerID)
        ->orderBy('order.orderID', "DESC")
        ->get();

        $headers = array_keys($purchases->first()->getAttributes());

        return [
            'headers' => $headers,
            'data' => $purchases
        ];
    }
}

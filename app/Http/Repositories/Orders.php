<?php

namespace App\Http\Repositories;

use App\Models\Order;
use Illuminate\Support\Facades\DB;

class Orders
{
    public function getOrders($branch)
    {
        $orders = Order::select(
                'order.*',
                DB::raw("CONCAT(customer.customerFirstName, ' ', customer.customerLastName) as customerName"), 'orderStatus.orderStatusName as orderStatus', 'orderPaymentStatus.orderPaymentStatusName as orderPaymentStatus',
                'orderFulfillmentStatus.orderFulfillmentStatusName as orderFulfillmentStatus'
            )
            ->leftJoin('orderStatus', 'order.orderStatus', '=', 'orderStatus.orderStatusID')
            ->leftJoin('orderPaymentStatus', 'order.orderPaymentStatus', '=', 'orderPaymentStatus.orderPaymentStatusID')
            ->leftJoin('orderFulfillmentStatus', 'order.orderFulfillmentStatus', '=', 'orderFulfillmentStatus.orderFulfillmentStatusID')
            ->leftJoin('customer', 'order.customerID', '=', 'customer.customerID')
            ->where('order.branchID', $branch)
            ->orderBy('order.orderID', "DESC")
            ->get();

        if ($orders->count() > 0) {
            $headers = array_keys($orders->first()->getAttributes());
        }

        return [
            'headers' => isset($headers) && !empty($headers) ? $headers : [],
            'data' => $orders
        ];
    }
}

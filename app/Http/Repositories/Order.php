<?php

namespace App\Http\Repositories;

use App\Models\Orders;
use Illuminate\Support\Facades\DB;

class Order
{
    public function getOrders($branch)
    {
        $orders = Orders::select(
                'orders.*',
                DB::raw("CONCAT(customers.customerFirstName, ' ', customers.customerLastName) as customerName")
            )
            ->join('customers', 'orders.customerID', '=', 'customers.customerID')
            ->where('orders.branchID', $branch)
            ->orderBy('orders.orderID', "DESC")
            ->get();

        $headers = array_keys($orders->first()->getAttributes());

        return [
            'headers' => $headers,
            'data' => $orders
        ];
    }
}

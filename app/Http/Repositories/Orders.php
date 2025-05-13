<?php

namespace App\Http\Repositories;

use App\Models\Order;
use Illuminate\Support\Facades\DB;

class Orders
{
    public function getOrders()
    {
        $orders = Order::select(
            'order.orderID',
            'order.orderDateTime',
            'order.orderTotal',
            'customer.customerUsername',
            'customer.customerID',
            'customer.customerEmail',
            'customer.customerContactNo',
            'orderStatus.orderStatusName as orderStatus',
            'orderPaymentStatus.orderPaymentStatusName as orderPaymentStatus',
            'orderFulfillmentStatus.orderFulfillmentStatusName as orderFulfillmentStatus',
            'orderDelivery.*',
        )
        ->leftJoin('orderStatus', 'order.orderStatus', '=', 'orderStatus.orderStatusID')
        ->leftJoin('orderPaymentStatus', 'order.orderPaymentStatus', '=', 'orderPaymentStatus.orderPaymentStatusID')
        ->leftJoin('orderFulfillmentStatus', 'order.orderFulfillmentStatus', '=', 'orderFulfillmentStatus.orderFulfillmentStatusID')
        ->leftJoin('customer', 'order.customerID', '=', 'customer.customerID')
        ->leftJoin('orderDelivery', 'order.orderDeliveryID', '=', 'orderDelivery.orderDeliveryID')
        ->orderBy('order.orderID', "DESC")
        ->get()
        ->map(function ($order) {
            $addressRepo = new \App\Http\Repositories\Address();
            $addressInfo = $addressRepo->getAddressInfo(
                $order->deliveryRegion, 
                $order->deliveryProvince, 
                $order->deliveryCity, 
                $order->deliveryBarangay
            );
    
            return [
                'orderID' => $order->orderID,
                'orderDate' => $order->orderDateTime,
                'orderTotal' => $order->orderTotal,
                'customerUsername' => $order->customerUsername,
                'customerID' => $order->customerID,
                'customerEmail' => $order->customerEmail,
                'customerContactNo' => $order->customerContactNo,
                'orderStatus' => $order->orderStatus,
                'orderPaymentStatus' => $order->orderPaymentStatus,
                'orderFulfillmentStatus' => $order->orderFulfillmentStatus,
                'orderDelivery' => [
                    'orderDeliveryID' => $order->orderDeliveryID,
                    'deliveryFullName' => $order->deliveryFullName,
                    'deliveryPhoneNo' => $order->deliveryPhoneNo,
                    'deliveryAddress' => $order->deliveryAddress,
                    'deliveryAddressExtra' => $order->deliveryAddressExtra,
                    'deliveryPostalCode' => $order->deliveryPostalCode,
                    'deliveryRegion' => optional($addressInfo['region']->first())->regionDescription,
                    'deliveryProvince' => optional($addressInfo['province']->first())->provinceName,
                    'deliveryCity' => optional($addressInfo['municipality']->first())->municipalityName,
                    'deliveryBarangay' => optional($addressInfo['barangay']->first())->barangayName,
                    'deliveryIsDefault' => $order->deliveryIsDefault,
                    'deliveryIsActive' => $order->deliveryIsActive,
                ]
            ];
        });
    
    return [
        'data' => $orders
    ];
    }
}

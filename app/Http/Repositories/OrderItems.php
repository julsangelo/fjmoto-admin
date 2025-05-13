<?php

namespace App\Http\Repositories;

use App\Models\Customer;
use App\Models\Order;
use App\Models\OrderDelivery;
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
        $customerInfo = Customer::select(
            'customer.customerUsername',
            'customer.customerID',
            'customer.customerEmail',
            'customer.customerContactNo',
            'orderDelivery.orderDeliveryID',
            'orderDelivery.deliveryFullName',
            'orderDelivery.deliveryPhoneNo',
            'orderDelivery.deliveryAddress',
            'orderDelivery.deliveryAddressExtra',
            'orderDelivery.deliveryPostalCode',
            'orderDelivery.deliveryRegion',
            'orderDelivery.deliveryProvince',
            'orderDelivery.deliveryCity',
            'orderDelivery.deliveryBarangay',
            'orderDelivery.deliveryIsDefault',
            'orderDelivery.deliveryIsActive'
        )
        ->leftJoin('orderDelivery', function ($join) {
            $join->on('orderDelivery.customerID', '=', 'customer.customerID')
                 ->where('orderDelivery.deliveryIsDefault', 1);
        })
        ->where('customer.customerID', $customerID)
        ->get()
        ->map(function ($customer) {
            $addressRepo = new \App\Http\Repositories\Address();
            $addressInfo = $addressRepo->getAddressInfo(
                $customer->deliveryRegion, 
                $customer->deliveryProvince, 
                $customer->deliveryCity, 
                $customer->deliveryBarangay
            );
    
            return [
                'customerUsername' => $customer->customerUsername,
                'customerID' => $customer->customerID,
                'customerEmail' => $customer->customerEmail,
                'customerContactNo' => $customer->customerContactNo,
                'customerAddress' => [
                    'orderDeliveryID' => $customer->orderDeliveryID,
                    'deliveryFullName' => $customer->deliveryFullName,
                    'deliveryPhoneNo' => $customer->deliveryPhoneNo,
                    'deliveryAddress' => $customer->deliveryAddress,
                    'deliveryAddressExtra' => $customer->deliveryAddressExtra,
                    'deliveryPostalCode' => $customer->deliveryPostalCode,
                    'deliveryRegion' => optional($addressInfo['region']->first())->regionDescription,
                    'deliveryProvince' => optional($addressInfo['province']->first())       ->provinceName,
                    'deliveryCity' => optional($addressInfo['municipality']->first())->municipalityName,
                    'deliveryBarangay' => optional($addressInfo['barangay']->first())->barangayName,
                    'deliveryIsDefault' => $customer->deliveryIsDefault,
                    'deliveryIsActive' => $customer->deliveryIsActive,
                ]
            ];
        });

        return [
            'data' => $customerInfo,
        ];
    }
}

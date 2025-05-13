<?php

namespace App\Http\Repositories;

use App\Models\Customer;
use Illuminate\Support\Facades\DB;

class Customers
{
    public function getCustomers () 
    {
        $customers = Customer::select(
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
            'data' => $customers
        ];
    }
}

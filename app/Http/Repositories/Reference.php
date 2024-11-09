<?php

namespace App\Http\Repositories;

use App\Models\Branches;
use App\Models\Categories;
use App\Models\EmploymentStatus;
use App\Models\FulfillmentStatus;
use App\Models\Orders;
use App\Models\OrderStatus;
use App\Models\PaymentStatus;
use App\Models\Position;

class Reference
{
    public function getReference()
    {
        $branches = Branches::get()->toArray();
        $categories = Categories::get()->toArray();
        $employmentStatus = EmploymentStatus::get()->toArray();
        $fulfillmentStatus = FulfillmentStatus::get()->toArray();
        $paymentStatus = PaymentStatus::get()->toArray();
        $orderStatus = OrderStatus::get()->toArray();
        $position = Position::get()->toArray(); 
        
        return [
            'branches' => $branches,
            'categories' => $categories,
            'employmentStatus' => $employmentStatus,
            'fulfillmentStatus' => $fulfillmentStatus,
            'paymentStatus' => $paymentStatus,
            'orderStatus' => $orderStatus,
            'position' => $position,
        ];
    }
}

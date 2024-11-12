<?php

namespace App\Http\Repositories;

use App\Models\Branch;
use App\Models\Employee;
use App\Models\ProductCategory;
use App\Models\EmployeeStatus;
use App\Models\OrderFulfillmentStatus;
use App\Models\OrderStatus;
use App\Models\OrderPaymentStatus;
use App\Models\EmployeePosition;

class References
{
    public function getReference()
    {
        $branch = Branch::get()->toArray();
        $productCategory = ProductCategory::get()->toArray();
        $employeeStatus = EmployeeStatus::get()->toArray();
        $orderFulfillmentStatus = OrderFulfillmentStatus::get()->toArray();
        $orderPaymentStatus = OrderPaymentStatus::get()->toArray();
        $orderStatus = OrderStatus::get()->toArray();
        $employeePosition = EmployeePosition::get()->toArray(); 
        $employeeAdminCount = Employee::where('employeePosition', 1)->count();
        
        return [
            'branch' => $branch,
            'productCategory' => $productCategory,
            'employeeStatus' => $employeeStatus,
            'orderFulfillmentStatus' => $orderFulfillmentStatus,
            'orderPaymentStatus' => $orderPaymentStatus,
            'orderStatus' => $orderStatus,
            'employeePosition' => $employeePosition,
            'employeeAdminCount' => $employeeAdminCount,
        ];
    }
}

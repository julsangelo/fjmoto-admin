<?php

namespace App\Http\Repositories;

use App\Models\Employees;

class Employee
{
    public function getEmployeeDetails($employeeID)
    {
        $employeeDetails = Employees::select()
            ->where('branch', $branch)
            ->orderBy('id', "DESC" )
            ->get()
            ;

        $headers = array_keys($employeeDetails->first()->getAttributes());

        return [
            'headers' => $headers,
            'data' => $employeeDetails
        ];
    }
}

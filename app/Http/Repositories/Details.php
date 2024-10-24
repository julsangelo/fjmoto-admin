<?php

namespace App\Http\Repositories;

use App\Models\Employees;

class Details
{
    public function getEmployeeDetails($employeeID)
    {
        $employees = Employees::select()
            ->where('employeeID', $employeeID)
            ->orderBy('employeeID', "DESC" )
            ->get()
            ;

        $headers = array_keys($employees->first()->getAttributes());

        return [
            'headers' => $headers,
            'data' => $employees
        ];
    }
}

<?php

namespace App\Http\Repositories;

use App\Models\Employees;

class Employee
{
    public function getEmployees($branch)
    {
        $employees = Employees::select()
            ->where('branch', $branch)
            ->orderBy('id', "DESC" )
            ->get()
            ;

        $headers = array_keys($employees->first()->getAttributes());

        return [
            'headers' => $headers,
            'data' => $employees
        ];
    }
}

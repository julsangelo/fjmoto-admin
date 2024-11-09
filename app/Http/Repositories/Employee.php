<?php

namespace App\Http\Repositories;

use App\Models\Employees;

class Employee
{
    public function getEmployees($branch)
    {
        $employees = Employees::select(
                'employees.*',
                'position.positionName as employeePosition',
                'employmentStatus.employmentStatusName as employeeStatus',
                'branches.branchName as branchBranch',
                'position.positionID as employeePositionID',
                'employmentStatus.employmentStatusID as employeeStatusID'
            )
            ->leftJoin('position', 'employees.employeePosition', '=', 'position.positionID')
            ->leftJoin('employmentStatus', 'employees.employeeStatus', '=', 'employmentStatus.employmentStatusID')
            ->leftJoin('branches', 'employees.branchID', '=', 'branches.branchID')
            ->where('employees.branchID', $branch)
            ->orderBy('employees.employeeID', 'DESC')
            ->get();

        $headers = array_keys($employees->first()->getAttributes());

        return [
            'headers' => $headers,
            'data' => $employees
        ];
    }
}

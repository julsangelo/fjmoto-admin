<?php

namespace App\Http\Repositories;

use App\Models\Employee;

class Employees
{
    public function getEmployees($branch)
    {
        $employees = Employee::select(
                'employee.employeeID',
                'employee.employeeFirstName',
                'employee.employeeMiddleName', 
                'employee.employeeLastName',
                'employeePosition.employeePositionName as employeePosition',
                'employeeStatus.employeeStatusName as employeeStatus',
            )
            ->leftJoin('employeePosition', 'employee.employeePosition', '=', 'employeePosition.employeePositionID')
            ->leftJoin('employeeStatus', 'employee.employeeStatus', '=', 'employeeStatus.employeeStatusID')
            ->where('employee.branchID', $branch)
            ->orderBy('employee.employeeID', 'DESC')
            ->get();

        if ($employees->count() > 0) {
            $headers = array_keys($employees->first()->getAttributes());
        }

        return [
            'headers' => isset($headers) && !empty($headers) ? $headers : [],
            'data' => $employees
        ];
    }

    public function getViewEmployee($employeeID) 
    {
        $employees = Employee::select(
            'employee.*',
            'employeePosition.employeePositionName as employeePosition',
            'employeePosition.employeePositionID as employeePositionID',
            'employeeStatus.employeeStatusName as employeeStatus',
            'employeeStatus.employeeStatusID as employeeStatusID',
            'branch.branchName as employeeBranch',
            'branch.branchID as employeeBranchID',
        )
        ->leftJoin('employeePosition', 'employee.employeePosition', '=', 'employeePosition.employeePositionID')
        ->leftJoin('employeeStatus', 'employee.employeeStatus', '=', 'employeeStatus.employeeStatusID')
        ->leftJoin('branch', 'employee.branchID', '=', 'branch.branchID')
        ->where('employee.employeeID', $employeeID)
        ->orderBy('employee.employeeID', 'DESC')
        ->get();

        return [
            'data' => $employees
        ];
    }
}

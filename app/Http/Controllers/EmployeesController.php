<?php

namespace App\Http\Controllers;

use App\Http\Repositories\Employee;
use App\Models\Employees;
use Illuminate\Http\Request;

class EmployeesController extends Controller
{
    protected $employee;

    public function __construct(Employee $employee)
    {
        $this->employee = $employee;
    }

    public function getEmployees(Request $request)
    {
        $branch = $request->input('branch');
        $data = $this->employee->getEmployees($branch);

        return response()->json($data);
    }

    public function addEmployee(Request $request) {
        $request->validate([
            'employeeFirstName' => 'required|string|max:50',
            'employeeMiddleName' => 'nullable|string|max:50',
            'employeeLastName' => 'required|string|max:50',
            'employeeEmail' => 'required|email|max:255|unique:employees,employeeEmail',
            'employeeContactNo' => 'required|digits:11',
            'employeeAddress' => 'required|string|min:5|max:255',
            'employeePosition' => 'required|integer|exists:position,positionID',
            'employeeDateHired' => 'required|date_format:Y-m-d',
            'employeeStatus' => 'required|integer|exists:employmentStatus,employmentStatusID',
            'employeeBranch' => 'required|integer|exists:branches,branchID',
        ]);
    
        $addEmployee = Employees::create([
            'branchID' => $request->employeeBranch,
            'employeeFirstName' => $request->employeeFirstName,
            'employeeMiddleName' => $request->employeeMiddleName,
            'employeeLastName' => $request->employeeLastName,
            'employeeEmail' => $request->employeeEmail,
            'employeeContactNo' => $request->employeeContactNo,
            'employeeAddress' => $request->employeeAddress,
            'employeePosition' => $request->employeePosition,
            'employeeDateHired' => $request->employeeDateHired,
            'employeeStatus' => $request->employeeStatus,
        ]);
    
        if($addEmployee) {
            return response()->json(['message' => 'Employee added successfully.', 'status' => 'success']);
        } else {
            return response()->json(['message' => 'Failed to add employee.', 'status' => 'error'], 500);
        }
    }
    
    public function editEmployee(Request $request) {
        $editEmployee = Employees::findOrFail($request->employeeID);

        $request->validate([
            'employeeFirstName' => 'required|string|max:50',
            'employeeMiddleName' => 'nullable|string|max:50',
            'employeeLastName' => 'required|string|max:50',
            'employeeEmail' => 'required|email|max:255',
            'employeeContactNo' => 'required|digits:11',
            'employeeAddress' => 'required|string|min:5|max:255',
            'employeePosition' => 'required|integer|exists:position,positionID',
            'employeeDateHired' => 'required|date_format:Y-m-d',
            'employeeStatus' => 'required|integer|exists:employmentStatus,employmentStatusID',
            'employeeBranch' => 'required|integer|exists:branches,branchID',
        ]);
    
        $editEmployee->update($request->only([
            'branchID',
            'employeeFirstName',
            'employeeMiddleName',
            'employeeLastName',
            'employeeEmail',
            'employeeContactNo',
            'employeeAddress',
            'employeePosition',
            'employeeDateHired',
            'employeeStatus',
        ]));
    
        if($editEmployee) {
            return response()->json(['message' => 'Employee updated successfully.', 'status' => 'success']);
        } else {
            return response()->json(['message' => 'Failed to add employee.', 'status' => 'error'], 500);
        }
    }

    public function deleteEmployee(Request $request) 
    {
        $employeeID = $request->input('employeeID');
        $employee = Employees::findOrFail($employeeID)->delete();

        if ($employee) {
            return response()->json(['message' => 'Employee deleted successfully.', 'status' => 'success']);
        } else {
            return response()->json(['message' => 'Error deleting the product.', 'status' => 'error']);
        }
    }
}

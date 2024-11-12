<?php

namespace App\Http\Controllers;

use App\Http\Repositories\Employees;
use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class EmployeesController extends Controller
{
    protected $employee;

    public function __construct(Employees $employee)
    {
        $this->employee = $employee;
    }

    public function getEmployees(Request $request)
    {
        $branch = $request->input('branch');
        $data = $this->employee->getEmployees($branch);

        return response()->json($data);
    }

    public function getViewEmployee(Request $request)
    {
        $employeeID = $request->input('employeeID');
        $data = $this->employee->getViewEmployee($employeeID);

        return response()->json($data);
    }

    public function addEmployee(Request $request) {
        $request->validate([
            'employeeFirstName' => 'required|string|max:50',
            'employeeMiddleName' => 'nullable|string|max:50',
            'employeeLastName' => 'required|string|max:50',
            'employeeEmail' => 'required|email|max:255|unique:employee,employeeEmail',
            'employeeContactNo' => 'required|digits:11',
            'employeeAddress' => 'required|string|min:5|max:255',
            'employeePosition' => 'required|integer|exists:employeePosition,employeePositionID',
            'employeeDateHired' => 'required|date_format:Y-m-d',
            'employeeStatus' => 'required|integer|exists:employeeStatus,employeeStatusID',
            'employeeBranch' => 'required|integer|exists:branch,branchID',
        ]);
    
        $addEmployee = Employee::create([
            'branchID' => $request->employeeBranch,
            'employeeFirstName' => $request->employeeFirstName,
            'employeeMiddleName' => $request->employeeMiddleName,
            'employeeLastName' => $request->employeeLastName,
            'employeeEmail' => $request->employeeEmail,
            'employeePassword' => Hash::make($request->employeeBranch . $request->employeeFirstName . $request->employeeLastName),
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
        $editEmployee = Employee::findOrFail($request->employeeID);

        $request->validate([
            'employeeFirstName' => 'required|string|max:50',
            'employeeMiddleName' => 'nullable|string|max:50',
            'employeeLastName' => 'required|string|max:50',
            'employeeEmail' => 'required|email|max:255',
            'employeeContactNo' => 'required|digits:11',
            'employeeAddress' => 'required|string|min:5|max:255',
            'employeePosition' => 'required|integer|exists:employeePosition,employeePositionID',
            'employeeDateHired' => 'required|date_format:Y-m-d',
            'employeeStatus' => 'required|integer|exists:employeeStatus,employeeStatusID',
            'employeeBranch' => 'required|integer|exists:branch,branchID',
        ]);
    
        $editEmployee->update([
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
    
        if($editEmployee) {
            return response()->json(['message' => 'Employee updated successfully.', 'status' => 'success']);
        } else {
            return response()->json(['message' => 'Failed to add employee.', 'status' => 'error'], 500);
        }
    }

    public function deleteEmployee(Request $request) 
    {
        $employeeID = $request->input('employeeID');
        $employee = Employee::findOrFail($employeeID)->delete();

        if ($employee) {
            return response()->json(['message' => 'Employee deleted successfully.', 'status' => 'success']);
        } else {
            return response()->json(['message' => 'Error deleting the product.', 'status' => 'error']);
        }
    }

    public function editProfile(Request $request)
    {
        $employeeID = $request->input('employeeID');
        $editEmployee = Employee::findOrFail($request->employeeID);

        $request->validate([
            'employeeFirstName' => 'required|string|max:50',
            'employeeMiddleName' => 'nullable|string|max:50',
            'employeeLastName' => 'required|string|max:50',
            'employeeEmail' => 'required|email|max:255',
            'employeePassword' => 'nullable|string|min:8|regex:/[a-z]/|regex:/[A-Z]/|regex:/[0-9]/',
            'employeeContactNo' => 'required|digits:11',
            'employeeAddress' => 'required|string|min:5|max:255',
        ]);

        $editEmployee->update([
            'employeeFirstName' => $request->employeeFirstName,
            'employeeMiddleName' => $request->employeeMiddleName,
            'employeeLastName' => $request->employeeLastName,
            'employeeEmail' => $request->employeeEmail,
            'employeePassword' => Hash::make($request->employeePassword),
            'employeeContactNo' => $request->employeeContactNo,
            'employeeAddress' => $request->employeeAddress,
        ]);
    
        if($editEmployee) {
            return response()->json(['message' => 'Profile updated successfully.', 'status' => 'success']);
        } else {
            return response()->json(['message' => 'Failed to add employee.', 'status' => 'error'], 500);
        }
    }
}

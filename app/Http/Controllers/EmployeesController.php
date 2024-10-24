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

}

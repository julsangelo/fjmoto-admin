<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employees extends Model
{
    protected $table = 'employees';
    protected $primaryKey = 'employeeID';
    public $timestamps = false;

    protected $fillable = [
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
    ];

    public function position()
    {
        return $this->belongsTo(Position::class, 'employeePosition', 'positionID');
    }

    public function status()
    {
        return $this->belongsTo(EmploymentStatus::class, 'employeeStatus', 'employmentStatusID');
    }

    public function branch()
    {
        return $this->belongsTo(Branches::class, 'branchID', 'branchID');
    }
}

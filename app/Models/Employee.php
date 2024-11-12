<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class Employee extends Authenticatable
{
    use HasApiTokens;
    protected $table = 'employee';
    protected $primaryKey = 'employeeID';
    public $timestamps = false;

    protected $fillable = [
        'branchID',
        'employeeFirstName',
        'employeeMiddleName',
        'employeeLastName',
        'employeeEmail',
        'employeePassword',
        'employeeContactNo',
        'employeeAddress',
        'employeePosition',
        'employeeDateHired',
        'employeeStatus',
    ];

    protected $hidden = [
        'employeePassword'
    ];

    public function getAuthPassword()
    {
        return $this->employeePassword;
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Repositories\Customer;
use Illuminate\Http\Request;

class Customers extends Controller
{
    protected $customers;

    public function __construct(Customer $customers)
    {
        $this->customers = $customers;
    }

    public function getCustomers()
    {
        $data = $this->customers->getCustomers();

        return response()->json($data);
    }
}

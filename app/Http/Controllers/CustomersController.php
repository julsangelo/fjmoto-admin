<?php

namespace App\Http\Controllers;

use App\Http\Repositories\Customer;
use App\Http\Repositories\Purchases;
use Illuminate\Http\Request;

class CustomersController extends Controller
{
    protected $customers;
    protected $purchases;

    public function __construct(Customer $customers, Purchases $purchases)
    {
        $this->customers = $customers;
        $this->purchases = $purchases;
    }

    public function getCustomers()
    {
        $data = $this->customers->getCustomers();

        return response()->json($data);
    }

    public function getPurchases(Request $request)
    {
        $customerID = $request->input('customerID');
        $data = $this->purchases->getPurchases($customerID);

        return response()->json($data);
    }
}

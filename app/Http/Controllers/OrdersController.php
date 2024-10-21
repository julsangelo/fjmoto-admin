<?php

namespace App\Http\Controllers;

use App\Http\Repositories\Order;
use App\Models\Products;
use Illuminate\Http\Request;

class OrdersController extends Controller
{
    protected $order;

    public function __construct(Order $order)
    {
        $this->order = $order;
    }

    public function getOrders(Request $request)
    {
        $branch = $request->input('branch');
        $data = $this->order->getOrders($branch);

        return response()->json($data);
    }

}

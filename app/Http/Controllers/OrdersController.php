<?php

namespace App\Http\Controllers;

use App\Http\Repositories\Order;
use App\Http\Repositories\OrderItem;
use App\Models\Products;
use Illuminate\Http\Request;

class OrdersController extends Controller
{
    protected $order;
    protected $orderItem;

    public function __construct(Order $order, OrderItem $orderItem)
    {
        $this->order = $order;
        $this->orderItem = $orderItem;
    }

    public function getOrders(Request $request)
    {
        $branch = $request->input('branch');
        $data = $this->order->getOrders($branch);

        return response()->json($data);
    }

    public function getOrderItems(Request $request)
    {
        $orderID = $request->input('orderID');
        $data = $this->orderItem->getOrderItems($orderID);

        return response()->json($data);
    }
}

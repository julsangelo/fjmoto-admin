<?php

namespace App\Http\Controllers;

use App\Http\Repositories\Orders;
use App\Http\Repositories\OrderItems;
use App\Models\Order;
use App\Models\Products;
use Illuminate\Http\Request;

class OrdersController extends Controller
{
    protected $order;
    protected $orderItem;

    public function __construct(Orders $order, OrderItems $orderItems)
    {
        $this->order = $order;
        $this->orderItem = $orderItems;
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

    public function getCustomerInfo(Request $request) 
    {
        $customerID = $request->input('customerID');
        $data = $this->orderItem->getCustomerInfo($customerID);

        return response()->json($data);
    }

    public function setOrderFulfilled (Request $request) 
    {
        $editOrder = Order::findOrFail($request->orderID);

        $editOrder->update([
            'orderFulfillmentStatus' => 1
        ]);

        if($editOrder) {
            return response()->json(['message' => 'Order fulfilled.', 'status' => 'success']);
        } else {
            return response()->json(['message' => 'Failed to fulfill.', 'status' => 'error'], 500);
        }
    }
}

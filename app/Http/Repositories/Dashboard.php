<?php

namespace App\Http\Repositories;

use App\Models\Order;
use Illuminate\Support\Facades\DB;

class Dashboard
{
    public function getAllOrder () 
    {
        $ordersPerMonth = Order::selectRaw('
            YEAR(orderDateTime) as year, 
            MONTH(orderDateTime) as month, 
            MONTHNAME(orderDateTime) as monthName, 
            COUNT(*) as orderCount
        ')
        ->groupBy(DB::raw('YEAR(orderDateTime)'), DB::raw('MONTH(orderDateTime)'), DB::raw('MONTHNAME(orderDateTime)'))
        ->orderBy(DB::raw('MONTH(orderDateTime)'), 'asc')
        ->get();

        $months = $ordersPerMonth->pluck('monthName');
        $totalOrders = $ordersPerMonth->pluck('orderCount');

        return [
            'month' => $months,
            'totalOrder' => $totalOrders
        ];
    }
}
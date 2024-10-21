<?php

namespace App\Http\Repositories;

use App\Models\Products;

class Inventory
{
    public function getInventory($branch)
    {
        $products = Products::select()
            ->where('branch', $branch)
            ->orderBy('id', "DESC" )
            ->get()
            ;

        $headers = array_keys($products->first()->getAttributes());

        return [
            'headers' => $headers,
            'data' => $products
        ];
    }
}

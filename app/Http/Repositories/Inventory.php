<?php

namespace App\Http\Repositories;

use App\Models\Products;

class Inventory
{
    public function getInventory($branch)
    {
        $products = Products::select("image", "productName", "productId", "category", "price", "stockQuantity")
            ->where('branch', $branch)->get();

        $headers = array_keys($products->first()->getAttributes());

        return [
            'headers' => $headers,
            'data' => $products
        ];
    }
}

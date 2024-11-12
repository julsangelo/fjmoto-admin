<?php

namespace App\Http\Repositories;

use App\Models\Product;

class Products
{
    public function getProducts($branch)
    {
        $products = Product::select('product.*', 'productCategory.productCategoryName as productCategory', 'productCategory.productCategoryID as productCategoryID')
            ->leftJoin('productCategory', 'product.productCategory', '=', 'productCategory.productCategoryID')
            ->where('branchID', $branch)
            ->orderBy('productID', "DESC" )
            ->get()
            ;

        $headers = array_keys($products->first()->getAttributes());

        return [
            'headers' => $headers,
            'data' => $products,
        ];
    }
}

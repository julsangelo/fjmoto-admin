<?php

namespace App\Http\Controllers;

use App\Http\Repositories\Products;
use App\Models\Product;
use Illuminate\Http\Request;

class InventoryController extends Controller
{
    protected $products;

    public function __construct(Products $products)
    {
        $this->products = $products;
    }

    public function getProducts(Request $request)
    {
        $branch = $request->input('branch');
        $data = $this->products->getProducts($branch);

        return response()->json($data);
    }

    public function addInventory(Request $request) {
        $request->validate([
            'productCode' => 'required|string|unique:product,productCode',
            'productName' => 'required|string',
            'productStockQuantity' => 'required|integer',
            'productPrice' => 'required|numeric',
            'productCategory' => 'required|numeric',
            'productImage' => 'required|image|max:2048',
            'branchID' => 'required|exists:branch,branchID'
        ]);

        $image = $request->file('productImage');
        $imageName = $image->getClientOriginalName();
        $image->move(public_path('fjmoto/images/products'), $imageName); 

        $imagePath = 'images/products/' . $imageName;

        $addInventory = Product::create([
            'productCode' => $request->productCode,
            'productName' => $request->productName,
            'productStockQuantity' => $request->productStockQuantity,
            'productPrice' => $request->productPrice,
            'productCategory' => $request->productCategory,
            'productImage' => $imagePath,
            'branchID' => $request->branchID
        ]);

        if ($addInventory) {
            return response()->json(['message' => 'Product added successfully.', 'status' => 'success']);
        } else {
            return response()->json(['message' => 'Error adding the product.', 'status' => 'error']);
        }
    }

    public function editInventory(Request $request) {
        $editProduct = Product::findOrFail($request->productID);
    
        $request->validate([
            'productCode' => 'required|string',
            'productName' => 'required|string',
            'productStockQuantity' => 'required|integer',
            'productPrice' => 'required|numeric',
            'productCategory' => 'required|string',
            'productImage' => 'nullable|image|max:2048',
        ]);
    
        if ($request->hasFile('productImage')) {
            $imageName = $request->file('productImage')->getClientOriginalName();
            $request->file('productImage')->move(public_path('fjmoto/images/products'), $imageName);
            $editProduct->productImage = 'images/products/' . $imageName;
        }
    
        $editProduct->update($request->only(['productCode', 'productName', 'productStockQuantity', 'productPrice', 'productCategory']));
    
        return response()->json(['message' => 'Product updated successfully.', 'status' => 'success']);
    }
    
    

    public function deleteInventory(Request $request) 
    {
        $productID = $request->input('productID');
        $deleteInventory = Product::findOrFail($productID)->delete();

        if ($deleteInventory) {
            return response()->json(['message' => 'Product deleted successfully.', 'status' => 'success']);
        } else {
            return response()->json(['message' => 'Error deleting the product.', 'status' => 'error']);
        }
    }
}

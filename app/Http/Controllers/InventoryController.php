<?php

namespace App\Http\Controllers;

use App\Http\Repositories\Inventory;
use App\Models\Products;
use Illuminate\Http\Request;

class InventoryController extends Controller
{
    protected $inventory;

    public function __construct(Inventory $inventory)
    {
        $this->inventory = $inventory;
    }

    public function getInventory(Request $request)
    {
        $branch = $request->input('branch');
        $data = $this->inventory->getInventory($branch);

        return response()->json($data);
    }

    public function addInventory(Request $request) {
        $request->validate([
            'productCode' => 'required|string',
            'productName' => 'required|string',
            'productStockQuantity' => 'required|integer',
            'productPrice' => 'required|numeric',
            'productCategory' => 'required|string',
            'productImage' => 'required|image|max:2048',
            'branchID' => 'required|exists:branches,branchID'
        ]);

        $image = $request->file('productImage');
        $imageName = $image->getClientOriginalName();
        $image->move(public_path('fjmoto/images/products'), $imageName); 

        $imagePath = 'images/products/' . $imageName;

        Products::create([
            'productCode' => $request->productCode,
            'productName' => $request->productName,
            'productStockQuantity' => $request->productStockQuantity,
            'productPrice' => $request->productPrice,
            'productCategory' => $request->productCategory,
            'productImage' => $imagePath,
            'branchID' => $request->branchID
        ]);
    }

    public function editInventory(Request $request) {
        $product = Products::findOrFail($request->productID);
    
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
            $product->productImage = 'images/products/' . $imageName;
        }
    
        $product->update($request->only(['productCode', 'productName', 'productStockQuantity', 'productPrice', 'productCategory']));
    
        return response()->json(['message' => 'Product updated successfully.']);
    }
    
    

    public function deleteInventory(Request $request) 
    {
        $productID = $request->input('productID');
        $product = Products::findOrFail($productID)->delete();
    }
}

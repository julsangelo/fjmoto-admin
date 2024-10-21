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
            'productId' => 'required|string',
            'productName' => 'required|string',
            'stockQuantity' => 'required|integer',
            'price' => 'required|numeric',
            'category' => 'required|string',
            'image' => 'required|image|max:2048',
            'branch' => 'required'
        ]);

        $imagePath = $request->file('image')->store('images/products', 'public');

        Products::create([
            'productId' => $request->productId,
            'productName' => $request->productName,
            'stockQuantity' => $request->stockQuantity,
            'price' => $request->price,
            'category' => $request->category,
            'image' => $imagePath,
            'branch' => $request->branch
        ]);
    }   

    public function deleteInventory(Request $request) 
    {
        $id = $request->input('id');
        Products::destroy($id);
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Repositories\Inventory;
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
        $branch = $request->query('branch');
        $products = $this->inventory->getInventory($branch);

        return response()->json($products);
    }
}

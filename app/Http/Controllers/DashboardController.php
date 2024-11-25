<?php

namespace App\Http\Controllers;

use App\Http\Repositories\Dashboard;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    protected $dashboard;

    public function __construct(Dashboard $dashboard)
    {
        $this->dashboard = $dashboard;
    }

    public function getAllOrder (Request $request) 
    {
        $branch = $request->input('branch');

        $data = $this->dashboard->getAllOrder($branch);

        return response()->json($data);
    }
}

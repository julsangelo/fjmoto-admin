<?php

namespace App\Http\Controllers;

use App\Http\Repositories\References;
use Illuminate\Http\Request;

class ReferencesController extends Controller
{
    protected $references;

    public function __construct(References $references)
    {
        $this->references = $references;
    }

    public function getReferences()
    {
        $data = $this->references->getReference();

        return response()->json($data);
    }
}

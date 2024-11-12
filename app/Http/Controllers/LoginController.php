<?php

namespace App\Http\Controllers;

use App\Models\EmployeePosition;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function userLogin(Request $request) 
    {
        $request->validate([
            'emailOrUserID' => 'required|string',
            'password' => 'required|string|min:8'
        ]);

        $credentials = filter_var($request->input('emailOrUserID'), FILTER_VALIDATE_EMAIL) ? 
        ['employeeEmail' => $request->input('emailOrUserID'), 'password' => $request->input('password')] : 
        ['employeeID' => $request->input('emailOrUserID'), 'password' => $request->input('password')];

        if (Auth::attempt($credentials)) {
            // $request->sessio n()->regenerate();
            $user = Auth::user();
            $token = $user->createToken('FJMoto Admin')->plainTextToken;

            return response()->json([
                'status' => 'success',
                'message' => 'Login successful.',
                'token' => $token,
                'user' => $user,
            ]);
        } else return response()->json([
            'status' => 'error',
            'message' => 'Wrong email/ID or password.'
        ]);
    } 

    public function getUser() 
    {
        $user = Auth::user();
        $position = EmployeePosition::where('employeePositionID', $user->employeePosition)
        ->value('employeePositionName');

        $user->employeePosition = $position;

        return response()->json([
            'user' => $user,
        ]);
    }
}

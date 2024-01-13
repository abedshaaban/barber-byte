<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;


class AuthController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login','register']]);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);
        $credentials = $request->only('email', 'password');

        $token = Auth::attempt($credentials);
        if (!$token) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized',
            ], 401);
        }

        $user = Auth::user();
        return response()->json([
                'status' => 'success',
                'user' => $user,
                'authorisation' => [
                    'token' => $token,
                    'type' => 'bearer',
                ]
            ]);

    }

    public function register(Request $request){
        $res = [];

        try{
            $request->validate([
                'is_barber_shop' => 'boolean'
            ]);

            $is_barber_shop = $request->is_barber_shop;


            if($is_barber_shop){
                // todo handle barber shop register
            } else {
                $request->validate([
                    'first_name' => 'required|string|max:255',
                    'last_name' => 'required|string|max:255',
                    'email' => 'required|string|email|unique:users',
                    'password' => 'required|string|min:8',
                    'birth_date' => 'required|date'
                ]);

                $user = User::create([
                    'role_id' => 1,
                    'gender_id' => 3,
                    'first_name' => $request->first_name,
                    'last_name' => $request->last_name,
                    'email' => $request->email,
                    'password' => Hash::make($request->password),
                    'birth_date' => $request->birth_date,
                ]);
                
                $token = Auth::login($user);
                $res = [
                    'status' => true,
                    'message' => 'User created successfully',
                    'data' => [
                        'role_id' => $user->role_id,
                        'gender_id' => $user->gender_id,
                        'first_name' => $user->first_name,
                        'last_name' => $user->last_name,
                        'email' => $user->email,
                        'birth_date' => $user->birth_date,
                        'token' => $token,
                    ],
                    'error' => '' 
                ];
            }
        }catch(\Exception $exception){
            return response()->json([
                'status' => false,
                'message' => 'Error occurred while registering user',
                'data' => '',
                'error' => $exception->getMessage() 
            ], 500);
        }

        return response()->json($res, 200);
    }

    public function logout()
    {
        Auth::logout();
        return response()->json([
            'status' => 'success',
            'message' => 'Successfully logged out',
        ]);
    }

    public function refresh()
    {
        return response()->json([
            'status' => 'success',
            'user' => Auth::user(),
            'authorisation' => [
                'token' => Auth::refresh(),
                'type' => 'bearer',
            ]
        ]);
    }
}

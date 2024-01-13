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
        $res = [];

        try{
            $credentials = $request->only('email', 'password');   
            $token = Auth::attempt($credentials);

            if (!$token) {
                return response()->json([
                    'status' => false,
                    'message' => 'Invalid credentials',
                    'data' => '',
                    'error' => 'Unauthorized'
                ]);
            }
    
            $token_payload = auth()->payload();

            $user = User::
                select(
                    'first_name',
                    'last_name',
                    'birth_date',
                    'description',
                    'img_url',
                    'roles.name as role_name',
                    'genders.name as gender_name',
                    'account_statuses.name as account_status'
                )
                    ->join('roles', 'users.role_id','=','roles.id')
                    ->join('genders', 'users.gender_id','=','genders.id')
                    ->join('account_statuses', 'users.account_status_id','=','account_statuses.id')
                    ->where('email', $token_payload['email'])->first();

            $res = [
                'status' => true,
                'message' => 'User created successfully',
                'data' => [
                    'first_name' => $user->first_name,
                    'last_name' => $user->last_name,
                    'birth_date' => $user->birth_date,
                    'description' => $user->description,
                    'img_url' => $user->img_url,
                    'token' => $token,
                    'role' => $user->role_name,
                    'gender' => $user->gender_name,
                    'account_status' => $user->account_status,
                ],
                'error' => '' 
            ];
        }catch(\Exception $exception){
            return response()->json([
                'status' => false,
                'message' => 'Unauthorized',
                'data' => '',
                'error' => $exception->getMessage() 
            ], 403);
        }

        return response()->json($res, 200);
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
                    'account_status_id' => 1,
                ]);
                
                $token = Auth::login($user);

                $token_payload = auth()->payload();

                $db_user = User::
                select(
                    'description',
                    'img_url',
                    'roles.name as role_name',
                    'genders.name as gender_name',
                    'account_statuses.name as account_status'
                )
                    ->join('roles', 'users.role_id','=','roles.id')
                    ->join('genders', 'users.gender_id','=','genders.id')
                    ->join('account_statuses', 'users.account_status_id','=','account_statuses.id')
                    ->where('email', $token_payload['email'])->first();

                $res = [
                    'status' => true,
                    'message' => 'User created successfully',
                    'data' => [
                        'first_name' => $user->first_name,
                        'last_name' => $user->last_name,
                        'birth_date' => $user->birth_date,
                        'description' => $user->description,
                        'img_url' => $user->img_url,
                        'token' => $token,
                        'role' => $db_user->role_name,
                        'gender' => $db_user->gender_name,
                        'account_status' => $db_user->account_status,
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
            'status' => true,
            'message' => 'Successfully logged out',
            'data' => '',
            'error' => ''
        ]);
    }
}

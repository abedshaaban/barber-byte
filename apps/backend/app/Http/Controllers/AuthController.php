<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Shop;
use App\Models\Address;
use App\Models\WorkDay;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;


class AuthController extends Controller
{

    public function __construct(){
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    public function login(Request $request){
        try{
            $credentials = $request->only('email', 'password');   
            $token = Auth::attempt($credentials);

            if (!$token) {
                return response()->json([
                    'status' => false,
                    'message' => 'Invalid credentials',
                    'data' => '',
                    'error' => 'Unauthorized'
                ], 401);
            }

            $user = auth()->user();

            $data = [
                'handle' => $user->handle,
                'birth_date' => $user->birth_date,
                'description' => $user->description,
                'img_url' => $user->img_url,
                'token' => $token,
                'role' => $user->role->name,
                'gender' => $user->gender->name,
                'account_status' => $user->account_status->name,
            ];

            if ($user->role->name === 'shop' && $user->shop) {
                $shopData = [
                    'shop_name' => $user->shop->name,
                    'country' => $user->shop->address->country,
                    'city' => $user->shop->address->city,
                    'street' => $user->shop->address->street,
                    'location' => $user->shop->address->location,
                    'work_days' => $user->shop->work_days
                ];
    
                $data = array_merge($data, $shopData);
            }
    
            return response()->json([
                'status' => true,
                'message' => 'User logged in',
                'data' => $data,
                'error' => ''
            ], 200);

        }catch(\Exception $exception){
            return response()->json([
                'status' => false,
                'message' => 'Unauthorized',
                'data' => '',
                'error' => $exception->getMessage() 
            ], 403);
        }
    }

    public function register(Request $request){
        $res = [];

        try{
            $request->validate([
                'is_barber_shop' => 'boolean'
            ]);

            $is_barber_shop = $request->is_barber_shop;


            if($is_barber_shop){
                $request->validate([
                    'handle' => 'required|string',
                    'email' => 'required|string|email|unique:users',
                    'password' => 'required|string|min:8',
                    'birth_date' => 'required|date',
                    'shop_name' => 'required|string',
                    'country' => 'required|string',
                    'city' => 'required|string',
                    'street' => 'required|string',
                    'location' => 'required|array',
                    'work_days' => 'required|array'
                ]);

                $user = User::create([
                    'role_id' => 2,
                    'gender_id' => 3,
                    'email' => $request->email,
                    'password' => Hash::make($request->password),
                    'birth_date' => $request->birth_date,
                    'account_status_id' => 1,
                    'handle' => $request->handle
                ]);

                $token = Auth::guard('api')->login($user);

                $token_payload = auth()->payload();

                $db_user = User::select()
                    ->where('email', $token_payload['email'])->first();

                Shop::create([
                    'owner_id' => $db_user->uuid,
                    'name' => $request->shop_name,
                ]);

                Address::create([
                    'shop_id' => $db_user->uuid,
                    'country' => $request->country,
                    'city' => $request->city,
                    'street' => $request->street,
                    'location' => $request->location,
                ]);

                $workDaysData = [];

                foreach ($request->work_days as $day) {
                    $workDaysData[] = [
                        'shop_id' => $db_user->uuid,
                        'order' => $day['order'],
                        'name' => $day['name'],
                        'start_date' => $day['start_date'],
                        'end_date' => $day['end_date'],
                        'is_open' => $day['is_open'],
                    ];
                }

                WorkDay::insert($workDaysData);

                $res = [
                    'status' => true,
                    'message' => 'User created successfully',
                    'data' => [
                        'handle' => $user->handle,
                        'birth_date' => $user->birth_date,
                        'description' => $user->description,
                        'img_url' => $user->img_url,
                        'token' => $token,
                        'role' => $user->role->name,
                        'gender' => $user->gender->name,
                        'account_status' => $user->account_status->name,
                    ],
                    'error' => '' 
                ];
            } else {
                $request->validate([
                    'handle' => 'required|string',
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
                    'handle' => $request->handle,
                    'account_status_id' => 1,
                ]);
                
                $token = Auth::guard('api')->login($user);

                $token_payload = auth()->payload();

                $res = [
                    'status' => true,
                    'message' => 'User created successfully',
                    'data' => [
                        'handle' => $user->handle,
                        'first_name' => $user->first_name,
                        'last_name' => $user->last_name,
                        'birth_date' => $user->birth_date,
                        'description' => $user->description,
                        'img_url' => $user->img_url,
                        'token' => $token,
                        'role' => $user->role->name,
                        'gender' => $user->gender->name,
                        'account_status' => $user->account_status->name,
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

    public function logout(){
        Auth::logout();
        return response()->json([
            'status' => true,
            'message' => 'Successfully logged out',
            'data' => '',
            'error' => ''
        ]);
    }

    public function refresh(){
        $user = auth()->user();
        
        try{
            if(!$user || !$user->email){
                $res = [
                    'status' => false,
                    'message' => 'Unauthorized',
                    'data' => '',
                    'error' => 'user not authorized' 
                ];
                return response()->json($res, 200);
            }

            $data = [
                'handle' => $user->handle,
                'birth_date' => $user->birth_date,
                'description' => $user->description,
                'img_url' => $user->img_url,
                'token' => Auth::refresh(),
                'role' => $user->role->name,
                'gender' => $user->gender->name,
                'account_status' => $user->account_status->name,
            ];

            if ($user->role->name === 'shop' && $user->shop) {
                $shopData = [
                    'shop_name' => $user->shop->name,
                    'country' => $user->shop->address->country,
                    'city' => $user->shop->address->city,
                    'street' => $user->shop->address->street,
                    'location' => $user->shop->address->location,
                    'work_days' => $user->shop->work_days
                ];
    
                $data = array_merge($data, $shopData);
            }

            return response()->json([
                'status' => true,
                'message' => 'Got user data',
                'data' => $data,
                'error' => ''
            ], 200);
        }catch(\Exception $exception){
            $res = [
                'status' => false,
                'message' => 'Error occurred while getting user data',
                'data' => '',
                'error' => $exception->getMessage() 
            ];
            return response()->json($res, 200);
        }
    }
}

<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Validator;
use App\Models\User;

class AccountController extends Controller
{

    public function get_profile($handle){
        $rules = [
            'handle' => 'required|string',
        ];
    
        $validator = Validator::make(['handle' => $handle], $rules);
    
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'User not found.',
                'data' => '',
                'error' => 'no user with this handle' 
            ], 400);
        }

        $res = [];

        try {
            $user_handle_and_status = User::
                select(
                    'account_statuses.name as account_status',
                    'roles.name as role'
                )
                ->join(
                    'account_statuses', 'users.account_status_id', '=', 'account_statuses.id')
                ->join(
                    'roles', 'users.role_id', '=', 'roles.id')
                ->where('handle', $handle)->first();

            if($user_handle_and_status->account_status === 'public'){
                if($user_handle_and_status->role === 'user'){
                    $user = User::
                    select(
                        'first_name',
                        'last_name',
                        'birth_date',
                        'description',
                        'img_url',
                        'genders.name as gender_name',
                    )
                        ->join('genders', 'users.gender_id','=','genders.id')
                        ->where('handle', $handle)->first();

                    $res = [
                        'status' => true,
                        'message' => 'Got public user info successfully',
                        'data' => [
                            'handle' => $handle,
                            'first_name' => $user->first_name,
                            'last_name' => $user->last_name,
                            'birth_date' => $user->birth_date,
                            'description' => $user->description,
                            'img_url' => $user->img_url,
                            'role' => $user_handle_and_status->role,
                            'gender' => $user->gender_name,
                            'account_status' => $user_handle_and_status->account_status,
                        ],
                        'error' => '' 
                    ];
                } else if($user_handle_and_status->role === 'shop'){
                    $user = User::
                    select(
                        'description',
                        'img_url',
                        'birth_date',
                        'genders.name as gender_name',
                        'shops.name as shop_name',
                        'addresses.country as country',
                        'addresses.city as city',
                        'addresses.street as street',
                        'addresses.location as location',
                    )
                    ->join('genders', 'users.gender_id','=','genders.id')
                    ->join('shops', 'users.uuid','=','shops.owner_id')
                    ->join('addresses', 'shops.owner_id','=','addresses.shop_id')
                    ->where('handle', $handle)->first();
    
                    $res = [
                        'status' => true,
                        'message' => 'Got public user info successfully',
                        'data' => [
                            'handle' => $handle,
                            'birth_date' => $user->birth_date,
                            'description' => $user->description,
                            'img_url' => $user->img_url,
                            'role' => $user_handle_and_status->role,
                            'gender' => $user->gender_name,
                            'account_status' => $user_handle_and_status->account_status,
                            'shop_name' => $user->shop_name,
                            'country' => $user->country,
                            'city' => $user->city,
                            'street' => $user->street,
                            'location' => json_decode($user->location)
                        ],
                        'error' => '' 
                    ];
                }
            } else {
                return response()->json([
                    'status' => false,
                    'message' => 'User not found',
                    'data' => '',
                    'error' => 'User not found' 
                ], 403);
            }

        } catch (\Exception $exception){
            return response()->json([
                'status' => false,
                'message' => 'User not found',
                'data' => '',
                'error' => $exception->getMessage() 
            ], 500);
        }

        return response()->json($res, 200);
    }
}

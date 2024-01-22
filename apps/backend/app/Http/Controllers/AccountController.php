<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Shop;

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
                $res =[
                    'status' => true,
                    'message' => 'User not found',
                    'data' => '',
                    'error' => '' 
                ];
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

    public function get_shops(Request $request){
        $page = intval($request->page) ?? 1;
        $query = $request->query('query') ?? '';

        try{
            $results = Shop::select(
                'users.uuid',
                'users.img_url',
                'users.handle',
                'shops.name',
                'addresses.country',
                'addresses.city',
                'addresses.street',
                )
            ->join('users', 'users.uuid', '=', 'shops.owner_id')
            ->join('account_statuses', 'users.account_status_id', '=', 'account_statuses.id')
            ->join('addresses', 'shops.owner_id', '=', 'addresses.shop_id')
            ->where('account_statuses.name', 'public')
            ->where(function ($s) use ($query) {
                $s->where('shops.name', 'like', '%' . $query . '%')
                    ->orWhere('users.handle', 'like', '%' . $query . '%')
                    ->orWhere('addresses.country', 'like', '%' . $query . '%')
                    ->orWhere('addresses.city', 'like', '%' . $query . '%')
                    ->orWhere('addresses.street', 'like', '%' . $query . '%');
            })
            ->latest()->paginate(2, ['*'], 'page', $page);
            return response()->json([
                'status' => true,
                'message' => 'Returned data',
                'data' => $results,
                'error' => '' 
            ]);

        } catch (\Exception $exception){
            return response()->json([
                'status' => false,
                'message' => 'User not found',
                'data' => '',
                'error' => $exception->getMessage() 
            ], 500);
        }
    }
}

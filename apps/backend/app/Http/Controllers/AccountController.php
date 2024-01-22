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
            $user = User::where('handle', '=', $handle)->first();

            if($user->account_status->name === 'public'){
                $data = [
                    'handle' => $user->handle,
                    'birth_date' => $user->birth_date,
                    'description' => $user->description,
                    'img_url' => $user->img_url,
                    'role' => $user->role->name,
                    'gender' => $user->gender->name,
                    'account_status' => $user->account_status->name,
                ];

                if ($user->role->name === 'user') {
                    $items = [
                        'first_name' => $user->first_name,
                        'last_name' => $user->last_name,
                    ];
        
                    $data = array_merge($data, $items);
                }

                if ($user->role->name === 'shop' && $user->shop) {
                    $items = [
                        'shop_name' => $user->shop->name,
                        'country' => $user->shop->address->country,
                        'city' => $user->shop->address->city,
                        'street' => $user->shop->address->street,
                        'location' => $user->shop->address->location,
                        'work_days' => $user->shop->work_days
                    ];
        
                    $data = array_merge($data, $items);
                }
             
                return response()->json([
                    'status' => true,
                    'message' => 'Got public user info successfully',
                    'data' => $data,
                    'error' => '' 
                ]);
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

    public function get_shop_hours($shop_id){
        $rules = [
            'shop_id' => 'required|string',
        ];
    
        $validator = Validator::make(['shop_id' => $shop_id], $rules);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'User not found.',
                'data' => '',
                'error' => 'incorrect shop_id' 
            ], 400);
        }

        try{
        $shop = Shop::find($shop_id);

        return response()->json([
            'status' => true,
            'message' => 'Shop work days and time.',
            'data' => $shop->work_days,
            'error' => ''
        ]);
        
        } catch (\Exception $exception){
            return response()->json([
                'status' => false,
                'message' => 'User not found',
                'data' => '',
                'error' => $exception->getMessage() 
            ]);
        }
    }
}

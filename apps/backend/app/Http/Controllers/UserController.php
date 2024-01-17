<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Shop;
use App\Models\Address;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    protected $user;

    public function __construct(){
        $this->user = Auth::user();
    }
    
    public function update_profile(Request $request){
        $res = [];

        if($this->user->handle === $request->handle){
            // continue
        }else if($this->user->handle !== $request->handle && strlen($request->handle) > 1){
            $db_handles = User::
                select('handle')
                ->where('handle', $request->handle)
                ->get();
            
            if(count($db_handles) === 0){
                $this->user->handle = $request->handle;

            }else{
                return response()->json([
                    'status' => false,
                    'message' => 'Handle is taken.',
                    'data' => '',
                    'error' => 'handle is taken'
                ]);
            }
        }


        if($this->user['role_id'] === 1){

            $db_user = User::
                select(
                    'first_name',
                    'last_name',
                    'birth_date',
                    'description',
                    'img_url',
                    'gender_id',
                    'account_status_id'
                )
                    ->where('email', $this->user['email'])->first();
                            
            $this->user->update([
                'first_name' => $request->first_name ?? $db_user['first_name'],
                'last_name' => $request->last_name ?? $db_user['last_name'],
                'birth_date' => $request->birth_date ?? $db_user['birth_date'],
                'description' => $request->description ?? $db_user['description'],
                'gender_id' => $request->gender ?? $db_user['gender_id'],
                'account_status_id' => $request->account_status ?? $db_user['account_status_id']
            ]);

            $db_user_meta_data = User::
            select(
                'roles.name as role_name',
                'genders.name as gender_name',
                'account_statuses.name as account_status',
            )
            ->join('roles', 'users.role_id','=','roles.id')
            ->join('genders', 'users.gender_id','=','genders.id')
            ->join('account_statuses', 'users.account_status_id','=','account_statuses.id')
            ->where('email', $this->user['email'])->first();
            
            $res = [
                'status' => true,
                'message' => 'Updated user successfully',
                'data' => [
                    'handle' => $this->user->handle,
                    'first_name' => $this->user->first_name,
                    'last_name' => $this->user->last_name,
                    'birth_date' => $this->user->birth_date,
                    'description' => $this->user->description,
                    'img_url' => $this->user->img_url,
                    'role' => $db_user_meta_data->role_name,
                    'gender' => $db_user_meta_data->gender_name,
                    'account_status' => $db_user_meta_data->account_status,
                ],
                'error' => '' 
            ];
        } else if ($this->user['role_id'] === 2){
            
            $db_user = User::
            select(
                'birth_date',
                'description',
                'img_url',
                'gender_id',
                'account_status_id'
            )
                ->where('email', $this->user['email'])->first();

            $this->user->update([
                'birth_date' => $request->birth_date ?? $db_user['birth_date'],
                'description' => $request->description ?? $db_user['description'],
                'gender_id' => $request->gender ?? $db_user['gender_id'],
                'account_status_id' => $request->account_status ?? $db_user['account_status_id']
            ]);

            $shop = Shop::find($this->user['uuid']);
            $shop->update(['name' => $request->shop_name ?? $shop['name']]);

            $address = Address::
                where('shop_id', $this->user['uuid'])->first();
            $address->update([
                'country' => $request->country ?? $address['country'],
                'city' => $request->city ?? $address['city'],
                'street' => $request->street ?? $address['street'],
                'location' => $request->location ?? $address['location'],
            ]);

            $db_user_meta_data = User::
            select(
                'roles.name as role_name',
                'genders.name as gender_name',
                'account_statuses.name as account_status',
            )
            ->join('roles', 'users.role_id','=','roles.id')
            ->join('genders', 'users.gender_id','=','genders.id')
            ->join('account_statuses', 'users.account_status_id','=','account_statuses.id')
            ->where('email', $this->user['email'])->first();


            $res = [
                'status' => true,
                'message' => 'Updated user successfully',
                'data' => [
                    'handle' => $this->user->handle,
                    'birth_date' => $this->user->birth_date,
                    'description' => $this->user->description,
                    'img_url' => $this->user->img_url,
                    'role' => $db_user_meta_data->role_name,
                    'gender' => $db_user_meta_data->gender_name,
                    'account_status' => $db_user_meta_data->account_status,
                    'shop_name' => $shop->name,
                    'country' => $address->country,
                    'city' => $address->city,
                    'street' => $address->street,
                    'location' => json_decode($address->location)
                ],
                'error' => '' ,
            ];
        }


        return response()->json($res);
    }

}

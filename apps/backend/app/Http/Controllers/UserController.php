<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Shop;
use App\Models\Address;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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

        if($this->user->role->name === 'user'){
            $this->user->update([
                'first_name' => $request->first_name ?? $this->user->first_name,
                'last_name' => $request->last_name ?? $this->user->last_name,
                'birth_date' => $request->birth_date ?? $this->user->birth_date,
                'description' => $request->description ?? $this->user->description,
                'gender_id' => $request->gender ?? $this->user->gender->id,
                'account_status_id' => $request->account_status ?? $this->user->account_status->id
            ]);
            
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
                    'role' => $this->user->role->name,
                    'gender' => $this->user->gender->name,
                    'account_status' => $this->user->account->name,
                ],
                'error' => '' 
            ];
        } else if ($this->user->role->name === 'shop'){
            $this->user->update([
                'birth_date' => $request->birth_date ?? $this->user->birth_date,
                'description' => $request->description ?? $this->user->description,
                'gender_id' => $request->gender ?? $this->user->gender->id,
                'account_status_id' => $request->account_status ?? $this->user->account_status->id
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

            $res = [
                'status' => true,
                'message' => 'Updated user successfully',
                'data' => [
                    'handle' => $this->user->handle,
                    'birth_date' => $this->user->birth_date,
                    'description' => $this->user->description,
                    'img_url' => $this->user->img_url,
                    'role' => $this->user->role->name,
                    'gender' => $this->user->gender->name,
                    'account_status' => $this->user->account_status->name,
                    'shop_name' => $this->user->shop->name,
                    'country' => $this->user->shop->address->country,
                    'city' => $this->user->shop->address->city,
                    'street' => $this->user->shop->address->street,
                    'location' => json_decode($this->user->shop->address->location),
                    'work_days' => $this->user->shop->work_days
                ],
                'error' => '' ,
            ];
        }

        return response()->json($res);
    }

    public function update_profile_image(Request $request){
        try{
            $request->validate([
                'img_url' => 'required|image|mimes:jpeg,png,jpg,webp',
            ]);

            if ($this->user && $request->hasFile('img_url')) {
                $image_name = time() . '.' . $request->img_url->extension();

                $folder_path = 'images/ppf/' . $this->user->uuid;
                
                if (!file_exists(public_path($folder_path))) {
                    mkdir(public_path($folder_path), 0755, true);
                }
                
                $request->img_url->move(public_path($folder_path), $image_name);
                
                $this->user->update(['img_url' => $folder_path . '/' . $image_name]);

                return response()->json([
                    'status'=> true,
                    'message'=> 'Updated image successfully',
                    'data'=> [
                        'img_url' => $this->user->img_url
                    ],
                    'error'=> '',
                ]);

            } else {

                return response()->json([
                    'status'=> false,
                    'message'=> 'Unauthorized',
                    'data'=> '',
                    'error'=> 'unauthorized',
                ]);
            }
        }catch(\Exception $exception){
            return response()->json([
                'status' => false,
                'message' => 'Error occurred while uploading profile image.',
                'data' => '',
                'error' => $exception->getMessage() 
            ]);
        }
    }

}

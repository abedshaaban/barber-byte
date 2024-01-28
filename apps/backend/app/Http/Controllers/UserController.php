<?php

namespace App\Http\Controllers;

use App\Models\AiImage;
use App\Models\Gender;
use App\Models\Reservation;
use App\Models\User;
use App\Models\Shop;
use App\Models\Address;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use OpenAI\Laravel\Facades\OpenAI;
use Illuminate\Support\Facades\Validator;

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
                    'location' => $this->user->shop->address->location,
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
                
                $this->user->update(['img_url' => $this->user->uuid . '/' . $image_name]);

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

    public function generate_image(Request $request){
        $prompt = "film still, portrait of a human, " . $request->prompt . ", salon photography";
        
        $request->validate([
            'prompt' => 'required|string',
            'size' => 'required|string',
            'n' => 'required|integer',
        ]);

        try{
            $result = OpenAI::images()->create([
                'model' => 'dall-e-2',
                'prompt' => $prompt,
                'size' => $request->size,
                'style' => "vivid",
                'n' => intval($request->n),
                'user' => $this->user->uuid,
            ]);

            if(count($result->data) > 0){
                $folder_path = 'images/ai-haircut/';
                if (!file_exists(public_path($folder_path))) {
                    mkdir(public_path($folder_path), 0755, true);
                }

                $res = [];
                
                foreach ($result->data as $imageData) {
                    $image_url = time() . rand(3, 9000000000) . '.' . 'png';
                    file_put_contents(public_path($folder_path . $image_url), file_get_contents($imageData->url));

                    $image_id = AiImage::create([
                        'prompt' => $prompt,
                        'creator_id' => $this->user->uuid,
                        'img_url' => $image_url,
                    ])->id;
            
                    $res[] = [
                        'url' => $image_url,
                        'id' => $image_id,
                    ];
                }
            }

            return response()->json([
                'status' => true,
                'message' => 'Image generated successfully',
                'data' => $res,
                'error' => '' 
            ]);
        } catch (\Exception $exception){
            return response()->json([
                'status' => false,
                'message' => 'Error occurred while generating image.',
                'data' => '',
                'error' => $exception->getMessage() 
            ]);
        }
    }

    public function get_reservation_of_day(Request $request){
        $rules = [
            'date' => 'required|date',
            'shop_id' => 'required|string',
        ];
    
        $validator = Validator::make([
            'date' => $request->date,
            'shop_id' => $request->shop_id
        ], $rules);
    
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Reservation not found.',
                'data' => '',
                'error' => 'date or shop_id are not provided' 
            ], 400);
        }

        try{
            $data = Reservation::select('time')
                    ->where('shop_id', '=', $request->shop_id)
                    ->where('date', '=', $request->date)
                    ->get();

            return response()->json([
                'status' => true,
                'message' => 'Got reservation successfully',
                'data' => $data,
                'error' => '' 
            ]);
        } catch (\Exception $exception){
            return response()->json([
                'status' => false,
                'message' => 'Error occurred while getting reservations',
                'data' => '',
                'error' => $exception->getMessage() 
            ]);
        }
    }

    public function create_reservation(Request $request){
        $rules = [
            'name' => 'required|string',
            'time' => 'required|string',
            'date' => 'required|string',
            'img_id' => 'required|integer',
            'shop_id' => 'required|string',
        ];
    
        $validator = Validator::make([
            'name' => $request->name,
            'time' => $request->time,
            'date' => $request->date,
            'img_id' => $request->img_id,
            'shop_id' => $request->shop_id
        ], $rules);
    
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Incomplete form.',
                'data' => '',
                'error' => 'more params are required' 
            ], 400);
        }

        try{
            $data = Reservation::create([
                'client_id' => $this->user->uuid,
                'name' => $request->name,
                'description' => $request->description,
                'time' => $request->time,
                'date' => $request->date,
                'img_id' => $request->img_id,
                'shop_id' => $request->shop_id,
            ]);

            return response()->json([
                'status' => true,
                'message' => 'Created reservation successfully',
                'data' => $data,
                'error' => '' 
            ]);
        } catch (\Exception $exception){
            return response()->json([
                'status' => false,
                'message' => 'Error occurred while creating reservation',
                'data' => '',
                'error' => $exception->getMessage() 
            ]);
        }
    }

    public function get_user_reservations(){
        $reservations = Reservation::with(['user', 'ai_image'])
                    ->where('client_id', '=', $this->user->uuid)->get();

        return response()->json([
            'status' => true,
            'message' => 'Got user data',
            'data' => $reservations,
            'error' => '',
        ]);
    }

    public function get_shop_reservations(){
        $reservations = Reservation::with(['user', 'ai_image'])
                    ->where('shop_id', '=', $this->user->uuid)->get();

        return response()->json([
            'status' => true,
            'message' => 'Got user data',
            'data' => $reservations,
            'error' => '',
        ]);
    }
    
    public function get_admin_reservations(){
        $reservations = Reservation::with(['user', 'ai_image'])->get();

        return response()->json([
            'status' => true,
            'message' => 'Got user data',
            'data' => $reservations,
            'error' => '',
        ]);
    }

    public function get_number_of_users(){
        $users_data = User::selectRaw('DATE(created_at) as date, COUNT(*) as user_count')
            ->groupBy('date')
            ->get();
        
        $data = [
            'date' => $users_data->pluck('date'),
            'count' => $users_data->pluck('user_count'),
        ];

        return response()->json([
            'status' => true,
            'message' => 'Got user data',
            'data' => $data,
            'error' => '',
        ]);
    }

    public function get_user_gender(){
        $gender_data = User::selectRaw('gender_id, COUNT(*) as gender_count')
            ->groupBy('gender_id')
            ->get();
        
        $data = [
            'gender' => $gender_data->pluck('gender_id'),
            'count' => $gender_data->pluck('gender_count'),
        ];

        return response()->json([
            'status' => true,
            'message' => 'Got user data',
            'data' => $data,
            'error' => '',
        ]);
    }

    public function get_ai_images_for_admin(Request $request){
        $posts = AiImage::with(['creator', 'reservation'])->get();

        return response()->json([
        'status' => true,
        'message' => 'Got ai images data',
        'data' => $posts,
        'error' => '',
        ]);
    }

    public function get_user_recent_updates_for_admin(Request $request){
        try {
            $users = User::orderBy('updated_at', 'desc')
                ->take(5)
                ->get();
    
            return response()->json([
                'status' => true,
                'message' => 'Got user data',
                'data' => $users,
                'error' => '',
            ]);
        } catch (\Exception $exception) {
            return response()->json([
                'status' => false,
                'message' => 'Error getting user data',
                'data' => '',
                'error' => $exception->getMessage(),
            ]);
        }
    }
}

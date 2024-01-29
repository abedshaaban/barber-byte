<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Share;
use App\Models\Post;

class ShareController extends Controller
{
    protected $user;

    public function __construct(){
        $this->user = Auth::user();
    }

    public function share_post(Request $request, $post_id){

        try{
            Share::create([
                'post_id' => $post_id,
                'user_id' =>  $this->user->uuid,
                'shared_to' => $request->platform
            ]);

            Post::where('uuid', $post_id)->increment('shares_count', 1);


            return response()->json([
                'status' => true,
                'message' => 'Shared post',
                'data' => [
                    'shared' => true
                ],
                'error' => '' 
            ]);
        } catch (\Exception $exception){
            return response()->json([
                'status' => false,
                'message' => 'Could not share post',
                'data' => '',
                'error' => $exception 
            ]);
        }
    }

    public function get_shared_platform(){
        $users_data = Share::selectRaw('shared_to, COUNT(*) as shared_count')
            ->groupBy('shared_to')
            ->get();
        
        $data = [
            'platform' => $users_data->pluck('shared_to'),
            'count' => $users_data->pluck('shared_count'),
        ];

        return response()->json([
            'status' => true,
            'message' => 'Got shares data',
            'data' => $data,
            'error' => '',
        ]);
    }
}

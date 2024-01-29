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
        $users_data = Share::selectRaw('shared_to, DATE(created_at) as share_date, COUNT(*) as shared_count')
        ->groupBy('shared_to', 'share_date')
        ->orderBy('share_date') 
        ->get();
    
        $data = $users_data->groupBy('shared_to')->map(function ($item) {
            return [
                'platform' => $item->first()->shared_to,
                'date' => $item->pluck('share_date'),
                'count' => $item->pluck('shared_count'),
            ];
        })->values();

        return response()->json([
            'status' => true,
            'message' => 'Got shares data',
            'data' => $data,
            'error' => '',
        ]);
    }
}

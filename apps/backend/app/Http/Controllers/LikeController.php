<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\Like;

class LikeController extends Controller
{
    protected $user;

    public function __construct(){
        $this->user = Auth::user();
    }

    public function toggle_like($post_id){

        if($post_id){
            $like = Like::select()
                ->where('post_id', '=', $post_id)
                ->where('user_id', '=', $this->user->uuid)
                ->get();

            if(count($like) === 0){
                Like::create([
                    'post_id' => $post_id,
                    'user_id' =>  $this->user->uuid
                ]);

                Post::where('uuid', $post_id)->increment('likes_count', 1);

                return response()->json([
                    'status' => true,
                    'message' => 'Liked post',
                    'data' => [
                        'is_liked' => true
                    ],
                    'error' => '' 
                ]);
            } else {
                Like::
                where('post_id', '=', $post_id)
                ->where('user_id', '=', $this->user->uuid)
                ->delete();
                
                Post::where('uuid', $post_id)->decrement('likes_count', 1); 
                
                return response()->json([
                    'status' => true,
                    'message' => 'Unliked post',
                    'data' => [
                        'is_liked' => false
                    ],
                    'error' => '' 
                ]);
            }
        }

        return response()->json([
            'status' => false,
            'message' => 'Could not like post',
            'data' => '',
            'error' => 'post id does not exist.' 
        ]);
    }
}

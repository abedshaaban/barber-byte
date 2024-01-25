<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Post;

class PostController extends Controller
{
    protected $user;

    public function __construct(){
        $this->user = Auth::user();
    }

    public function create_post(Request $request){
        try{
            $request->validate([
                'img_url' => 'required|image|mimes:jpeg,png,jpg,webp',
            ]);

            $image_name = time() . '.' . $request->img_url->extension();

            $folder_path = 'images/posts/' . $this->user->uuid;
            
            if (!file_exists(public_path($folder_path))) {
                mkdir(public_path($folder_path), 0755, true);
            }
            
            $request->img_url->move(public_path($folder_path), $image_name);
            

            $post = Post::
                create([
                    'img_url' => $this->user->uuid . '/' . $image_name,
                    'caption' => $request->caption,
                    'creator_id' => $this->user->uuid
                ]);
            
            return response()->json([
                'status' => true,
                'message' => 'Post created successfully',
                'data' => $post,
                'error' => ''
            ]);

        }catch(\Exception $exception){
            return response()->json([
                'status' => false,
                'message' => 'Error occurred while creating post.',
                'data' => '',
                'error' => $exception->getMessage() 
            ]);
        }
    }

    public function get_posts(Request $request){
        try{
            $page = intval($request->page) ?? 1;
            
            $posts = Post::
            select(
                'posts.uuid',
                'posts.caption',
                'posts.img_url',
                'posts.likes_count',
                'posts.creator_id',
                'posts.created_at',
                'users.handle',
                'users.first_name',
                'users.last_name',
                'users.img_url as profile_url',
                'shops.name',
            )
            ->join('users', function ($join) {
                $join->on('users.uuid', '=', 'posts.creator_id')
                ->where('users.account_status_id', '=', 2);
            })
            ->leftJoin('shops', 'shops.owner_id', '=', 'posts.creator_id')
            ->latest()->paginate(2, ['*'], 'page', $page);

            // if(auth()->check()){   
            //     $posts = Post::with(['userLiked', 'creator'])
            //         ->latest()
            //         ->paginate(2, ['*'], 'page', $page);
            // } else {
            //     $posts = Post::latest()
            //         ->paginate(2, ['*'], 'page', $page);
            // }

            return response()->json([
                'status' => true,
                'message' => 'Getting post.',
                'data' => $posts,
                'error' => ''
            ]);

        }catch(\Exception $exception){
            return response()->json([
                'status' => false,
                'message' => 'Could not get posts.',
                'data' => '',
                'error' => $exception->getMessage() 
            ]);
        }
    }

    public function get_user_posts(Request $request){
        $posts = Post::select()
                ->where('creator_id', '=', $this->user->uuid)->get();

        return response()->json([
        'status' => true,
        'message' => 'Got posts data',
        'data' => $posts,
        'error' => '',
        ]);
    }
    public function get_shop_posts(Request $request){
        $posts = Post::select()
                ->where('creator_id', '=', $this->user->uuid)->get();

        return response()->json([
        'status' => true,
        'message' => 'Got posts data',
        'data' => $posts,
        'error' => '',
        ]);
    }
}

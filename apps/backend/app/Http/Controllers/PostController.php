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
                    'img_url' => $folder_path . '/' . $image_name,
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
}

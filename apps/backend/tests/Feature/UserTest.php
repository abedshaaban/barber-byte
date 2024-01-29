<?php

namespace Tests\Feature;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Post;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class UserTest extends TestCase
{
    use WithoutMiddleware;
    use DatabaseTransactions;

    /**
     * A basic feature test example.
     */
    public function test_the_application_returns_a_successful_response(): void {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    public function test_create_user(){
        $user = [
            'role_id' => 1,
            'gender_id' => 3,
            'email' => 'abed@gmail.com',
            'password' => Hash::make('P@ssword123'),
            'birth_date' => '2000-01-01',
            'account_status_id' => 1,
            'handle' => 'awu6h-gub',
            'first_name' => 'Abed',
            'last_name' => 'Shaaban',
        ];

        $response = $this->post('/api/auth/register', $user);

        $response->assertStatus(200);

        $this->assertDatabaseHas('users', [
            'role_id' => 1,
            'gender_id' => 3,
            'email' => 'abed@gmail.com',
            'birth_date' => '2000-01-01',
            'account_status_id' => 1,
            'handle' => 'awu6h-gub',
            'first_name' => 'Abed',
            'last_name' => 'Shaaban',
        ]);
    }
    
    public function test_create_shop(){
        $user = [
            'is_barber_shop' => true,
            'gender_id' => 3,
            'email' => 'jef@gmail.com',
            'password' => Hash::make('P@ssword123'),
            'birth_date' => '2000-01-01',
            'account_status_id' => 1,
            'handle' => 'astusd-gub',
            'shop_name' => 'hair salon',
            'country' => 'Lebanon',
            'city' => 'Aramoon',
            'street' => 'khalde',
            'location' => [50.31, 45.92],
            'work_days' => [
                [
                    'order' => '1',
                    'start_date' => '9:00',
                    'end_date' => '12:00',
                    'name' => 'monday',
                    'is_open' => false,
                ]
            ],
            'first_name' => 'Abed',
            'last_name' => 'Shaaban',
        ];

        $response = $this->post('/api/auth/register', $user);

        $response->assertStatus(200);

        $this->assertDatabaseHas('users', [
            'handle' => $user['handle'],
            'role_id' => 2,
        ]);

        $this->assertDatabaseHas('shops', [
            'name' => $user['shop_name'],
        ]);
    }

    public function test_user_can_login(){
        $user = User::create([
            'role_id' => 1,
            'gender_id' => 3,
            'email' => 'abed@gmail.com',
            'password' => Hash::make('P@ssword123'),
            'birth_date' => '2000-01-01',
            'account_status_id' => 1,
            'handle' => 'awu6h-gub',
            'first_name' => 'Abed',
            'last_name' => 'Shaaban',
        ])->first();

        $loginData = [
            'email' => 'abed@gmail.com',
            'password' => 'P@ssword123',
        ];

        $response = $this->post('/api/auth/login', $loginData);

        $this->assertAuthenticated();
    }

    public function test_user_profile_is_updated_correctly(){
        $user = User::create([
            'role_id' => 1,
            'gender_id' => 3,
            'email' => 'john@example.com',
            'password' => Hash::make('P@ssword123'),
            'birth_date' => '2000-01-01',
            'account_status_id' => 1,
            'handle' => 'awu6h-gub',
            'first_name' => 'Abed',
            'last_name' => 'Shaaban',
        ])->first();

        $updateData = [
            'first_name' => 'Abed Al Ghani',
        ];

        $this->actingAs($user, 'api');

        $response = $this->put('/api/user/update-profile', $updateData);

        $this->assertDatabaseMissing('users', [
            'uuid' => $user->uuid,
            'first_name' => 'Abed Al Ghani',
            'email' => 'john@example.com',
        ]);
    }
    
    public function test_create_post(){
        $user = User::create([
            'role_id' => 1,
            'gender_id' => 3,
            'email' => 'jake@gmail.com',
            'password' => Hash::make('P@ssword123'),
            'birth_date' => '2000-01-01',
            'account_status_id' => 1,
            'handle' => 'jk-gub',
            'first_name' => 'Abed',
            'last_name' => 'Shaaban',
        ])->first();

        $this->actingAs($user, 'api');

        $imagePath = public_path('images/ppf/90368889-b30e-11ee-82e8-f80dac080673/1705589868.png');
        $imageFile = new UploadedFile($imagePath, '1705589868.png', 'image/png', null, true);
        
        $response = $this->post('/api/user/create-post', [
            'img_url' => $imageFile,
            'caption' => 'no cap',
            'creator_id' => $user->uuid,
        ]);

        $this->assertDatabaseHas('posts', [
            'creator_id' => $user->uuid,
        ]);

    }

    public function test_get_user_by_uuid(){
        $user = User::create([
            'role_id' => 1,
            'gender_id' => 3,
            'email' => 'abed@gmail.com',
            'password' => Hash::make('P@ssword123'),
            'birth_date' => '2000-01-01',
            'account_status_id' => 1,
            'handle' => 'awu6h-gub',
            'first_name' => 'Abed',
            'last_name' => 'Shaaban',
        ])->first();

        $response = $this->get('/api/account/' . $user->uuid);

        $this->assertDatabaseHas('users', [
            'handle' => $user->handle,
        ]);
    }
    
    public function test_get_post_by_post_id(){
        $user = User::create([
            'role_id' => 1,
            'gender_id' => 3,
            'email' => 'new@gmail.com',
            'password' => Hash::make('P@ssword123'),
            'birth_date' => '2000-01-01',
            'account_status_id' => 1,
            'handle' => 'we-gub',
            'first_name' => 'Abed',
            'last_name' => 'Shaaban',
        ])->first();

        
        $post = Post::create([
            'img_url' => 'random.png',
            'caption' => 'no cap',
            'creator_id' => $user->uuid
        ])->first();

        $this->actingAs($user, 'api');

        $response = $this->get('/api/post/' . $post->uuid);
        
        $this->assertDatabaseHas('posts', [
            'img_url' => 'random.png',
            'caption' => 'no cap',
            'creator_id' => $user->uuid
        ]);
    }

    public function test_like_post(){
        $user = User::create([
            'role_id' => 1,
            'gender_id' => 3,
            'email' => 'abed@gmail.com',
            'password' => Hash::make('P@ssword123'),
            'birth_date' => '2000-01-01',
            'account_status_id' => 1,
            'handle' => 'awu6h-gub',
            'first_name' => 'Abed',
            'last_name' => 'Shaaban',
        ])->first();

        $post = Post::
            create([
                'img_url' => 'path.png',
                'caption' => 'no cap',
                'creator_id' => $user->uuid,
            ])->first();

        $this->actingAs($user, 'api');

        $response = $this->post('/api/post/like/' . $post->uuid);

        $this->assertDatabaseHas('likes', [
            'post_id' => $post->uuid,
            'user_id' => $user->uuid,
        ]);
    }

    public function test_share_post(){
        $user = User::create([
            'role_id' => 1,
            'gender_id' => 3,
            'email' => 'abed@gmail.com',
            'password' => Hash::make('P@ssword123'),
            'birth_date' => '2000-01-01',
            'account_status_id' => 1,
            'handle' => 'awu6h-gub',
            'first_name' => 'Abed',
            'last_name' => 'Shaaban',
        ])->first();


        $post = Post::create([
                'img_url' => 'path.png',
                'caption' => 'no cap',
                'creator_id' => $user->uuid,
            ])->first();

        $this->actingAs($user, 'api');

        $response = $this->post('/api/post/share/' . $post->uuid, ['platform' => 'facebook']);

        $this->assertDatabaseHas('shares', [
            'post_id' => $post->uuid,
        ]);
    }

}

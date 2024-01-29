<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Post;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class UserTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_the_application_returns_a_successful_response(): void {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    public function test_user_can_register(){
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

        $response = $this->post('/auth/register', $user);

        $this->assertDatabaseHas('users', [
            'handle' => 'awu6h-gub',
            'first_name' => 'Abed',
            'last_name' => 'Shaaban',
            'birth_date' => '2000-01-01',
            'description' => null,
            'img_url' => null,
            'role_id' => 1,
            'gender_id' => 3,
            'account_status_id' => 1,
        ]);
    }

    public function test_user_can_login(){
        $user = User::create([
            'handle' => 'awu6h-gub',
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john@example.com',
            'password' => Hash::make('P@ssword123'),
        ]);

        $loginData = [
            'email' => 'john@example.com',
            'password' => 'password123',
        ];

        $response = $this->post('/api/login', $loginData);

        $this->assertAuthenticated();
    }

    public function test_user_profile_is_updated_correctly(){
        $user = User::create([
            'handle' => 'awu6h-gub',
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john@example.com',
            'password' => Hash::make('P@ssword123'),
        ]);

        $updateData = [
            'first_name' => 'Abed Al Ghani',
        ];

        $response = $this->put('/user/update-profile', $updateData);

        $this->assertDatabaseHas('users', [
            'uuid' => $user->uuid,
            'first_name' => 'Abed Al Ghani',
            'email' => 'john@example.com',
        ]);
    }
    
    public function test_get_user_by_uuid(){
        $user = User::create([
            'handle' => 'awu6h-gub',
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john@example.com',
            'password' => Hash::make('P@ssword123'),
        ]);

        $response = $this->get('/account/' . $user->uuid);

        $this->assertDatabaseHas('users', [
            'handle' => $response->handle,
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john@example.com',
        ]);
    }
    
    public function test_get_post_by_post_id(){
        $user = User::create([
            'handle' => 'awu6h-gub',
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john@example.com',
            'password' => Hash::make('P@ssword123'),
        ]);

        $post = Post::
                create([
                    'img_url' => 'random.png',
                    'caption' => 'no cap',
                    'creator_id' => $user->uuid
                ]);


        $response = $this->get('/post/' . $post->uuid);

        $this->assertDatabaseHas('posts', [
            'uuid' => $response->uuid,
            'img_url' => 'random.png',
            'caption' => 'no cap',
            'creator_id' => $user->uuid
        ]);
    }



}

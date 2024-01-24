<?php

namespace App\Models;

use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $primaryKey = 'uuid';
    protected $keyType = 'uuid';

    protected $fillable = [
        'uuid',
        'caption',
        'img_url',
        'likes_count',
        'creator_id',
    ];

    protected $hidden = [
        'updated_at',
    ];

    protected $casts = [
        'uuid' => 'string', 
    ];

    public function creator()
    {
        return $this->belongsTo(User::class, 'creator_id', 'uuid');
    }

    public function likes()
    {
        return $this->hasMany(Like::class, 'post_id', 'uuid');
    }

    public function userLiked()
    {
        $user = Auth::user();

        return $this->likes()->where('user_id', $user->uuid);
    }
}

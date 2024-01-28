<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Share extends Model
{
    use HasFactory;

    protected $fillable = [
        'shared_to',
        'user_id',
        'post_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'uuid');
    }

    public function post()
    {
        return $this->belongsTo(Post::class, 'uuid', 'post_id');
    }
}

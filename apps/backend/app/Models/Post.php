<?php

namespace App\Models;

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

    protected $casts = [
        'uuid' => 'string', 
    ];
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AIImage extends Model
{
    use HasFactory;

    protected $fillable = [
        'prompt',
        'img_url',
        'creator_id',
    ];

    public function creator(){
        return $this->hasMany(User::class, 'uuid', 'creator_id');
    }

    public function reservation(){
        return $this->hasMany(Reservation::class, 'img_id', 'id');
    }
}

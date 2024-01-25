<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_id',
        'name',
        'description',
        'time',
        'date',
        'img_id',
        'shop_id',
    ];

    public function ai_image(){
        return $this->belongsTo(AiImage::class, 'img_id', 'id');
    }

    public function shop(){
        return $this->belongsTo(Shop::class, 'owner_id', 'shop_id');
    }

    public function user(){
        return $this->belongsTo(User::class, 'client_id', 'uuid');
    }
}

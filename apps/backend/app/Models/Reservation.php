<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'time',
        'img_id',
        'client_id',
        'shop_id',
    ];

    public function ai_image(){
        return $this->belongsTo(AIImage::class, 'id', 'img_id');
    }

    public function shop(){
        return $this->belongsTo(Shop::class, 'owner_id', 'shop_id');
    }

    public function user(){
        return $this->belongsTo(User::class, 'uuid', 'client_id');
    }
}

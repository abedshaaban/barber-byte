<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    use HasFactory;

    public $timestamps = false;
    public $incrementing = false;
    protected $fillable = [
        'country',
        'city',
        'street',
        'location',
        'shop_id',
    ];


    protected $casts = [
        'location' => 'array'
    ];

    public function shop(){
        return $this->belongsTo(Shop::class, 'owner_id', 'shop_id');
    }
}

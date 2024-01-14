<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Addresses extends Model
{
    use HasFactory;

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
}

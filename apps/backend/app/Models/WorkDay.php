<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkDay extends Model
{
    use HasFactory;


    protected $fillable = [
        'shop_id',
        'order',
        'name',
        'start_date',
        'end_date',
        'is_open',
    ];
}

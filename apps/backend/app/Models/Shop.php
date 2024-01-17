<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shop extends Model
{
    use HasFactory;

    public $timestamps = false;
    public $incrementing = false;
    protected $primaryKey = 'owner_id';
    protected $keyType = 'uuid';

    protected $fillable = [
        'owner_id',
        'name',
    ];
}

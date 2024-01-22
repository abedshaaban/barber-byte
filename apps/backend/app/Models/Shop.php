<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

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

    public function owner()
    {
        return $this->belongsTo(User::class, 'uuid', 'owner_id');
    }

    public function address(){
        return $this->hasOne(Address::class, 'shop_id', 'owner_id');
    }

    public function work_days(){
        return $this->hasMany(WorkDay::class, 'shop_id', 'owner_id');
    }
}

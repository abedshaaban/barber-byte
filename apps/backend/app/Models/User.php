<?php

namespace App\Models;
use App\Models\Shop;
use App\Models\Gender;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;

    protected $primaryKey = 'uuid';
    protected $keyType = 'uuid';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'uuid',
        'handle',
        'first_name',
        'last_name',
        'email',
        'password',
        'description',
        'img_url',
        'birth_date',
        'role_id',
        'gender_id',
        'account_status_id'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'uuid' => 'string',
    ];

    public function getJWTIdentifier()
    {
        // return $this->getKey();
        return $this->uuid;
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [
            'uuid'=>$this->uuid,
            'handle'=>$this->handle,
            'email'=>$this->email,
            'role_id'=>$this->role_id,
        ];
    }

    public function role(){
        return $this->belongsTo(Role::class);
    }

    public function gender(){
        return $this->belongsTo(Gender::class);
    }
    
    public function account_status(){
        return $this->belongsTo(AccountStatus::class);
    }

    public function shop(){
        return $this->hasOne(Shop::class, 'owner_id', 'uuid');
    }

    public function ai_images(){
        return $this->hasMany(AIImage::class, 'creator_id', 'uuid');
    }

    public function reservation(){
        return $this->hasMany(Reservation::class, 'client_id', 'uuid');
    }
}

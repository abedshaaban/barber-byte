<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    protected $user;

    public function __construct(){
        $this->user = Auth::user();
    }
}

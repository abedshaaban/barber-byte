<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class IsShop
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();
        if($user && $user->role->name === 'shop'){
            return $next($request);
        }

        return response()->json([
            'status' => false,
            'message' => 'Unauthorized',
            'data' => '',
            'error' => 'user is not authorized to access this data',
        ]); 
    }
}

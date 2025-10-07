<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Laravel\Sanctum\PersonalAccessToken;

class authCheckmiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $auth = $request->header('authorization');
        if($auth != null){
            $bearertoken = json_decode($auth,true)['token'];
            [$id, $token] = explode('|', $bearertoken, 2);
            $accessToken = PersonalAccessToken::find($id);
            if ($accessToken && hash_equals($accessToken->token, hash('sha256', $token))) {
                return $next($request);
            }
        }
        return response()->json(['message'=>'Unauthenticated.']);
    }
}
// $input = $request->all();
        // list($input['modified by'])=['middleware'];
        // unset($input['username'],$input['password']);
        // $request->replace($input);

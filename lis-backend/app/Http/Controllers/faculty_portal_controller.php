<?php

namespace App\Http\Controllers;

use App\Models\dbusers\tbl_users;
use App\Models\dbusers\tbl_staff_information;
use App\Http\Requests\faculty_portal\login_request;
use App\Http\Requests\faculty_portal\logout_request;

use Laravel\Sanctum\PersonalAccessToken;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

// use App\Models\dbregistrations\tbl_child_information;
// use Illuminate\Support\Facades\DB;
// use Illuminate\Support\Facades\Storage;
// use Illuminate\Support\Arr;

class faculty_portal_controller extends Controller
{
    public function login(login_request $request){
        $user = tbl_users::join('tbl_staff_information', 'account_number' , '=', 'staff_id')
            ->where('username', $request->username)
            ->where('authorization_level' ,'=', 1)
            ->first();
        if(!$user || !Hash::check($request->password, $user->password)){
            return response()->json([
                            'status' => 'failed',
                            'message' => 'Incorrect username or password'
                        ]);
        }
        $user->tokens()->where('name', $user->username)->delete();
        $token = $user->createToken($user->username/*, ['*'], now()->addHour(8)*/);
        $response = [
            'status' => "success",
            'token' => $token->plainTextToken
        ];
        return response()->json($response);
    }
    public function adminlogin(login_request $request){
        $user = tbl_users::join('tbl_staff_information', 'account_number' , '=', 'staff_id')
            ->where('username', $request->username)
            ->where('authorization_level' ,'=', 3)
            ->first();
        if(!$user || !Hash::check($request->password, $user->password)){
            return response()->json([
                            'status' => 'failed',
                            'message' => 'Incorrect username or password'
                        ]);
        }
        $user->tokens()->where('name', $user->username)->delete();
        $token = $user->createToken($user->username/*, ['*'], now()->addHour(8)*/);
        $response = [
            'status' => "success",
            'token' => $token->plainTextToken
        ];
        return response()->json($response);
    }
    
    public function logout(logout_request $request){
        [$id, $token] = explode('|', $request->token, 2);
        $accessToken = PersonalAccessToken::find($id);
        if ($accessToken && hash_equals($accessToken->token, hash('sha256', $token))) {
            PersonalAccessToken::where('id', $accessToken->id)->delete();
            return response()->json([
                        'status' => 'success',
                        'message' => 'User logged out successfully'
                    ]);
        }
        return response()->json([
                          'status' => 'failed',
                          'errors' => 'unknown error',
                          'message' => 'Please contact tech support'
                      ]);
    }

    public function authorization_level_check(Request $request){
        $auth = $request->header('authorization');
        $bearertoken = json_decode($auth,true)['token'];
        [$id, $token] = explode('|', $bearertoken, 2);
        $accessToken = PersonalAccessToken::find($id);
        if ($accessToken && hash_equals($accessToken->token, hash('sha256', $token))) {
            $staff = tbl_staff_information::where('staff_id', '=', $accessToken->tokenable_id)
            ->select('authorization_level', 'location_post')
            ->first();
            return response()->json([
                'location_post' => $staff->location_post,
                'level' => $staff->authorization_level
            ]);
        }
        return response()->json([
            'message'=>'Unauthenticated.',
        ]);
    }

    public function changeCredentials(Request $request){
        $user = tbl_users::where('username', '=', $request->current_username)
            ->first();
        if(!$user || !Hash::check($request->current_password, $user->password)){
            return response()->json([
                            'status' => 'Error',
                            'message' => 'Incorrect current username or password'
                        ]);
        }
        $new_user = tbl_users::where('username', '=', $request->new_username)
            ->select('account_number')
            ->first();
        if($new_user) return response()->json(['status' => 'Error', 'message' => 'Username is taken']);
        
        $new_credentials = [];
        if($request->new_username) $new_credentials['username'] = $request->new_username;
        if($request->new_password) $new_credentials['password'] = $request->new_password;
        $user->update($new_credentials);
        
        return response()->json(['status'=>'success']);
    }

    public function hash(request $request){
        $user = tbl_users::where('id', 2)->first();
        $user->password = Hash::make($user->password);
        $user->save();
        return response()->json([
                            'status' => 'success',
                            'message' => 'Password hashed successfully'
                        ]);
    }
}

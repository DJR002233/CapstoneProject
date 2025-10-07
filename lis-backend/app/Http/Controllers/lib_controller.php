<?php

namespace App\Http\Controllers;

use App\Models\dbusers\tbl_staff_information;
use App\Models\dbregistrations\tbl_dev_center_locations;

use Illuminate\Http\Request;
use Laravel\Sanctum\PersonalAccessToken;
use Illuminate\Support\Arr;

class lib_controller extends Controller
{
    public function getStaffInfo($authHeader){
        $auth = json_decode($authHeader,true);
        [$id, $token] = explode('|', $auth['token'], 2);
        $accessToken = PersonalAccessToken::find($id);
        $staff = tbl_staff_information::where('staff_id','=', $accessToken->tokenable_id)
        ->select(
            'staff_id',
            'first_name',
            'middle_name',
            'last_name',
            'suffix',
            'location_post',
            'authorization_level',
            'finished_grading',
            )
        ->first();
        if($staff->authorization_level == 3 && Arr::exists($auth, 'location')) 
            $staff['location_post'] = $auth['location'];
        return $staff;
    }
    public function getLocationName($index, $getID = false){
        $select = 'location_name';
        if($getID == 'id') $select = 'location_number';
        $location = tbl_dev_center_locations::where('location_number', '=', $index)->select($select)->first();
        $res = $location->location_name;
        if($select == 'location_number') $res = $location->location_number;
        return $res;
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

use App\Http\Requests\faculty_portal\admin_staff_management_request;
use App\Models\dbregistrations\tbl_dev_center_locations;
use App\Models\dbusers\tbl_staff_information;
use App\Models\dbusers\tbl_users;

class admin_controller extends Controller
{ 
    public function saveStaffInfo(admin_staff_management_request $request){
        $res = ['status' => 'failed', 'message' => 'Please contact tech support'];
        $all = $request->all();
        $staff_info = tbl_staff_information::find($request->staff_id);
        $isDuplicate = tbl_users::where(DB::raw('BINARY `username`'), '=', $request->username)->first();
        if(!$staff_info){
            $res = ['status' => 'success', 'message' => 'saved successfully'];
            if(!$request->username)
                return response()->json(['status' => 'Error', 'message' => 'Username is required']);
            if($isDuplicate)
                return response()->json(['status' => 'Error', 'message' => 'The username is already taken']);
            if(!$request->password)
                return response()->json(['status' => 'Error', 'message' => 'Password is required']);
            $account_id = tbl_users::create($all);
            $all['staff_id'] = $account_id->getKey();
            tbl_staff_information::create($all);
        }else if($staff_info){
            if($staff_info->staff_id > 0){
                $staff_acc = tbl_users::find($request->staff_id);
                $res = ['status' => 'success', 'message' => 'changed successfully'];
                $new_staff_auth = [];
                if($request->username){
                    if($isDuplicate)
                        return response()->json(['status' => 'Error', 'message' => 'The username is already taken']);
                    $new_staff_auth['username'] = $request->username;
                }
                if($request->password)
                    $new_staff_auth['password'] = Hash::make($request->password);
                if(count($new_staff_auth) > 0){
                    $staff_acc->update($new_staff_auth);
                }
                $staff_info->update($request->all());
            }
        }
        return response()->json($res);
    }
    public function saveLocationInfo(admin_staff_management_request $request){
        $res = ['status' => 'failed', 'message' => 'Please contact tech support'];
        $all = $request->all();
        $location = tbl_dev_center_locations::find($request->location_number);
        if(!$location){
            $res = ['status' => 'success', 'message' => 'saved successfully'];
            tbl_dev_center_locations::create($all);
        }else if($location){
            if($location->location_number > 0){
                $res = ['status' => 'success', 'message' => 'saved successfully'];
                $location->update($request->all());
            }
        }
        return response()->json($res);
    }
    public function getStaffInformation(){
        $res = tbl_staff_information::select(
            'staff_id',
            'first_name',
            'middle_name',
            'last_name',
            'suffix',
            DB::raw('(select location_name from dbregistrations.tbl_dev_center_locations where location_number = location_post) as location_post_name'),
            'authorization_level',
            'finished_grading',
            'location_post',
        )
        ->get();
        return response()->json($res);
    }
    public function getAllLocations(Request $request){
        $locations = tbl_dev_center_locations::select('location_number','location_name', 'location_address', 'status', 'max_registration_forms')
        ->orderBy('status', 'desc')
        ->orderBy('location_name', 'asc')
        ->get();
        return response()->json($locations);
    }
}

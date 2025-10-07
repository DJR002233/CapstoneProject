<?php

namespace App\Http\Controllers;

use App\Models\dbregistrations\tbl_child_information;
use App\Models\dbregistrations\tbl_master_list;
use App\Http\Requests\faculty_portal\exclude_Request;
use App\Http\Requests\faculty_portal\enroll_Request;

use App\Http\Controllers\lib_controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class forms_controller extends Controller
{
    public function reg_forms(Request $request){
        $auth = $request->header('authorization');
        $lib = new lib_controller();

        $staff = $lib->getStaffInfo($auth);
        $location = $staff->location_post;

        $table = tbl_child_information::class;
        $res = $table::leftjoin('tbl_master_list', 'tbl_master_list.registration_number', '=', 'tbl_child_information.registration_number')
                ->where('tbl_child_information.development_center_location', '=', $location)
                ->where('tbl_child_information.excluded', '=', '0')
                ->where('tbl_child_information.archived', '=', '0')
                ->whereNull('tbl_master_list.registration_number')
                ->select('tbl_child_information.registration_number', 'registration_number_of_location', 'last_name', 'first_name', 'middle_name', 'suffix', 'date_of_birth', 'gender')
                ->get();
        return response()->json($res);
    }
    public function excluded_forms(Request $request){
        $auth = $request->header('authorization');
        $lib = new lib_controller();

        $staff = $lib->getStaffInfo($auth);
        $location = $staff->location_post;
        
        $table = tbl_child_information::class;
        $res = $table::leftjoin('tbl_master_list', 'tbl_master_list.registration_number', '=', 'tbl_child_information.registration_number')
                ->where('development_center_location', '=', $location)
                ->where('excluded', '=', '1')
                ->where('archived', '=', '0')
                // ->whereNull('registration_number')
                ->select('tbl_child_information.registration_number', 'registration_number_of_location', 'last_name', 'first_name', 'middle_name', 'suffix', 'date_of_birth', 'gender')
                ->get();
        return response()->json($res);
    }
    public function enrolled_forms(Request $request){
        $auth = $request->header('authorization');
        $lib = new lib_controller();

        $staff = $lib->getStaffInfo($auth);
        $location = $staff->location_post;
        
        $table = tbl_child_information::class;
        $res = $table::join('tbl_master_list', 'tbl_master_list.registration_number', '=', 'tbl_child_information.registration_number')
                ->where('development_center_location', '=', $location)
                ->where('excluded', '=', '0')
                ->where('archived', '=', '0')
                ->select('tbl_child_information.registration_number', 'registration_number_of_location', 'last_name', 'first_name', 'middle_name', 'suffix', 'date_of_birth', 'gender')
                ->get();
        return response()->json($res);
    }
    public function view_profile(Request $request){
        $auth = $request->header('authorization');
        $reg_num = json_decode($auth,true)['id'];
        $lib = new lib_controller();

        $staff = $lib->getStaffInfo($auth);
        $location = $staff->location_post;

        $table = tbl_child_information::class;
        $res = [
            'message'=>'not found'
        ];

        $data = $table::with('nutritional_status')
                    ->with('parents_information')
                    ->with('siblings_information')
                    ->with(['master_list' => function ($query){
                        $query->select('registration_number');
                    }])
                    ->with(['dev_center_location' => function ($query){
                        $query->select('location_number', 'location_name');
                    }])
                    ->where('development_center_location', '=', $location)
                    ->where('registration_number', '=', $reg_num)
                    ->get();

        if($data->isNotEmpty()){
            $res = $data;
        }

        return response()->json($res);
    }
    public function getProfilePicture(Request $request){
        $auth = $request->header('authorization');
        $reg_num = json_decode($auth,true)['id'];
        $lib = new lib_controller();

        $staff = $lib->getStaffInfo($auth);
        $location = $staff->location_post;

        $table = tbl_child_information::class;
        $res = [
            'message'=>'not found'
        ];

        $data = $table::where('development_center_location', '=', $location)
                ->where('registration_number', '=', $reg_num)
                ->select('picture', 'created_at')
                ->first();
        if($data){
        $y = date("Y", strtotime($data->created_at));
        $picture_url = Storage::url('images/'.''.$y.'/'.$data->picture);
        $res = asset($picture_url);}

        return response()->json($res);
    }
    public function exclude_form(exclude_Request $request){
        $auth = $request->header('authorization');
        $lib = new lib_controller();

        $staff = $lib->getStaffInfo($auth);
        $location = $staff->location_post;
        
        $res = [
            'message'=>'registration form not found'
        ];

        $table = tbl_child_information::class;
        $query = $table::where('registration_number', '=', $request->registration_number)
                ->where('archived', '=', '0')
                ->limit(1)
                ->update(['excluded'=>$request->exclude_value]);
        if(!$query){
            $res = ['message' => 'success'];
        }
        return response()->json($res);
    }
    public function enroll_form(enroll_Request $request){
        $auth = $request->header('authorization');
        $lib = new lib_controller();

        $staff = $lib->getStaffInfo($auth);
        $location = $staff->location_post;
        
        $res = [
            'message'=>'registration form not found'
        ];

        $info = tbl_child_information::class;
        $table = tbl_master_list::class;

        $query = $info::where('registration_number', '=', $request->registration_number)
                ->where('archived', '=', '0')
                ->limit(1)
                ->update(['excluded' => 0]);

        $count = $info::join('tbl_master_list', 'tbl_master_list.registration_number', '=', 'tbl_child_information.registration_number')
                ->where('development_center_location', '=', $location)
                ->where('excluded', '=', '0')
                ->select('tbl_master_list.registration_number')
                ->count();
        $query = $table::create([
            'registration_number' => $request->registration_number,
            'child_number' => $count+1,
        ]);
        
        if($query){
            $res = ['message' => 'success'];
        }
        return response()->json($res);
    }
}

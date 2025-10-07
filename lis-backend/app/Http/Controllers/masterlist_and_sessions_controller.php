<?php

namespace App\Http\Controllers;
use App\Models\dbregistrations\tbl_child_information;
use App\Models\dbregistrations\tbl_master_list;
use App\Http\Requests\faculty_portal\change_session_number_Request;

use App\Http\Controllers\lib_controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class masterlist_and_sessions_controller extends Controller
{
    public function getSessionsData(Request $request){
        $auth = $request->header('authorization');
        $session_num = json_decode($auth,true)['session'];
        $lib = new lib_controller();

        $staff = $lib->getStaffInfo($auth);
        $location = $staff->location_post;
        $location_name = $lib->getLocationName($location);

        $child_info = tbl_child_information::class;
        $master_list = tbl_master_list::class;
        $res = [
            'message'=>'not found'
        ];

        $session_list = $master_list::where('session', '=', $session_num)
        ->select('registration_number')
        ->get();

        if($session_list->isNotEmpty()){
            $list = $child_info::whereBelongsTo($session_list, 'master_list')
            ->with(['nutritional_status' => function ($query){
                $query->select(
                    'registration_number',
                    'upon_entry',
                    DB::raw('(date_of_last_vitamin_a_intake IS NOT NULL) as vit_a'),
                    DB::raw('(date_of_last_deworming IS NOT NULL) as deworming'),
                    DB::raw('(4ps_reference_number IS NOT NULL) as 4ps'),
                    DB::raw('(medical_diagnosis IS NOT NULL) as disability'),
                    DB::raw('(pwd_number IS NOT NULL) as pwd'));
            }])
            ->with(['parents_information' => function ($query){
                $query->select(
                    'registration_number',
                    'relationship_to_the_child',
                    'first_name',
                    'last_name',
                    'occupation',
                    'category',
                    'address',
                    'contact_number');
            }])
            ->where('development_center_location', '=', $location)
            ->where('excluded', '=', '0')
            ->where('archived', '=', '0')
            ->select('registration_number',
                    'gender',
                    'last_name',
                    'first_name',
                    'middle_name',
                    'date_of_birth',
                    // 'age',
                    'created_at',
                    'school_year')
            ->orderBy('last_name', 'asc')
            ->get();
            if($list){
                $res = $list;
            }
        }

        return response()->json(['data' => $res, 
                'location_name' => $location_name, 
                'location_number' => $location, 
                'staff_name' => $staff->first_name.' '.substr($staff->middle_name, 0,1).'. '.$staff->last_name]);
    }

    public function change_session_number(change_session_number_Request $request){
        $auth = $request->header('authorization');
        $lib = new lib_controller();

        $staff = $lib->getStaffInfo($auth);
        $location = $staff->location_post;
        $evaluated_sessions = json_decode($staff->finished_grading);

        if($evaluated_sessions)
            if(in_array($request->session_value, $evaluated_sessions))
                return response()->json(['status' => 'Error', 'message' => 'Cannot change to target session. Target session has alread been Evaluated']);
        
        $table = tbl_child_information::class;

        $count = $table::join('tbl_master_list', 'tbl_master_list.registration_number', '=', 'tbl_child_information.registration_number')
                ->where('development_center_location', '=', $location)
                ->where('excluded', '=', '0')
                ->where('archived', '=', '0')
                ->where('session', '=', $request->session_value)
                ->select('tbl_master_list.registration_number')
                ->count();

        if($count > 50) 
            return response()->json([
                        'status'=>'Error', 
                        'message'=>'Target Session is Full',
                    ]);

        $res = $table::join('tbl_master_list', 'tbl_master_list.registration_number', '=', 'tbl_child_information.registration_number')
                ->where('development_center_location', '=', $location)
                ->where('excluded', '=', '0')
                ->where('archived', '=', '0')
                ->where('tbl_master_list.registration_number', '=', $request->registration_number)
                ->limit(1);
        
        if($evaluated_sessions)
            if(in_array($res->first()->session, $evaluated_sessions))
                return response()->json(['status' => 'Error', 'message' => 'Cannot change to session. Current session has alread been Evaluated']);

        $res->update(['session'=>$request->session_value]);

        return response()->json([
                        'status'=>'success', 
                        'message'=>'session changed successfully!'
                    ]);
    }
}

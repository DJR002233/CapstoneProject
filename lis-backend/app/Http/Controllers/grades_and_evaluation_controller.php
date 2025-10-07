<?php

namespace App\Http\Controllers;

use App\Models\dbregistrations\tbl_child_information;
use App\Models\dbregistrations\tbl_grades;

use App\Models\dbusers\tbl_staff_information;

use Illuminate\Http\Request;

class grades_and_evaluation_controller extends Controller
{
    public function getSessionEvaluation(Request $request){
        $auth = $request->header('authorization');
        $session_num = json_decode($auth,true)['session_value'];
        $lib = new lib_controller();

        $staff = $lib->getStaffInfo($auth);
        $location = $staff->location_post;
        $location_name = $lib->getLocationName($location);

        $table = tbl_child_information::class;
        $res = [
            'status'=>'Error',
            'message'=>'not found'
        ];

        $list1 = $table::join('tbl_master_list', 'tbl_child_information.registration_number', '=', 'tbl_master_list.registration_number')
                ->join('tbl_grades', 'tbl_grades.registration_number', '=', 'tbl_master_list.registration_number')
                ->where('development_center_location', '=', $location)
                ->where('excluded', '=', '0')
                ->where('archived', '=', '0')
                ->where('session', '=', $session_num)
                ->where('evaluation_number', '=', 1)
                ->select('tbl_master_list.registration_number', 
                    'evaluation_number',
                    'gross_motor',
                    'fine_motor',
                    'self-help',
                    'receptive_language',
                    'expressive_language',
                    'cognitive',
                    'social-emotional',
                    'sum_of_scaled_score',
                    'sum_of_standard_score',
                    'interpretation',
                    'tbl_grades.created_at',
                    'date_of_birth')
                ->orderBy('last_name', 'asc')
                ->get();
        $list2 = $table::join('tbl_master_list', 'tbl_child_information.registration_number', '=', 'tbl_master_list.registration_number')
                ->join('tbl_grades', 'tbl_grades.registration_number', '=', 'tbl_master_list.registration_number')
                ->where('development_center_location', '=', $location)
                ->where('excluded', '=', '0')
                ->where('archived', '=', '0')
                ->where('session', '=', $session_num)
                ->where('evaluation_number', '=', 2)
                ->select('tbl_master_list.registration_number', 
                    'evaluation_number',
                    'gross_motor',
                    'fine_motor',
                    'self-help',
                    'receptive_language',
                    'expressive_language',
                    'cognitive',
                    'social-emotional',
                    'sum_of_scaled_score',
                    'sum_of_standard_score',
                    'interpretation',
                    'tbl_grades.created_at',
                    'date_of_birth')
                ->orderBy('last_name', 'asc')
                ->get();
        
        $list3 = $table::join('tbl_master_list', 'tbl_child_information.registration_number', '=', 'tbl_master_list.registration_number')
                ->join('tbl_grades', 'tbl_grades.registration_number', '=', 'tbl_master_list.registration_number')
                ->where('development_center_location', '=', $location)
                ->where('excluded', '=', '0')
                ->where('archived', '=', '0')
                ->where('session', '=', $session_num)
                ->where('evaluation_number', '=', 3)
                ->select('tbl_master_list.registration_number', 
                    'evaluation_number',
                    'gross_motor',
                    'fine_motor',
                    'self-help',
                    'receptive_language',
                    'expressive_language',
                    'cognitive',
                    'social-emotional',
                    'sum_of_scaled_score',
                    'sum_of_standard_score',
                    'interpretation',
                    'tbl_grades.created_at',
                    'date_of_birth')
                ->orderBy('last_name', 'asc')
                ->get();
        
        $res = ['Eval1' => $list1, 'Eval2' => $list2, 'Eval3' => $list3];
        
        return response()->json($res);
    }
    public function addSessionGrades(Request $request){
        $auth = $request->header('authorization');
        $session_num = json_decode($auth,true)['session_value'];
        $lib = new lib_controller();

        $staff = $lib->getStaffInfo($auth);
        $location = $staff->location_post;
        $location_name = $lib->getLocationName($location);
        $evaluated_sessions = [];
        $res = [
            'message'=>'not found'
        ];
        $evaluated_sessions = json_decode($staff->finished_grading);
        if($staff->authorization_level > 1 || $staff->authorization_level < 1 )
            return response()->json(['status' => 'Error', 'message' => 'Only teachers can upload grades!']);
        if($evaluated_sessions)
            if(in_array($session_num, $evaluated_sessions))
                return response()->json(['status' => 'Error', 'message' => 'You have already passed the evaluation form']);

        $table = tbl_child_information::class;
        $grades = tbl_grades::class;

        $data = $request->all();
        for($i = 0; $i < count($request->all()); $i++){
            $eval_num = $table::join('tbl_master_list', 'tbl_child_information.registration_number', '=', 'tbl_master_list.registration_number')
                ->join('tbl_grades', 'tbl_grades.registration_number', '=', 'tbl_master_list.registration_number')
                ->where('development_center_location', '=', $location)
                ->where('excluded', '=', '0')
                ->where('archived', '=', '0')
                ->where('session', '=', $session_num)
                ->where('tbl_grades.registration_number', '=', $data[$i]['registration_number'])
                ->select(
                    'evaluation_number',
                    )
                // ->orderBy('registration_number', 'asc')
                ->count();
            if($eval_num >= 3){
                continue;
            }
            $data[$i]['evaluation_number'] = $eval_num + 1;
            $grades::create($data[$i]);
        }
        $res = [
            'status' => 'success',
            'message' => 'saved successfully'
        ];
        $evaluated_sessions[] = $session_num;
        $evaluated_sessions = json_encode($evaluated_sessions);
        if($staff->authorization_level != 3)
            tbl_staff_information::where('staff_id', '=', $staff->staff_id)
                ->update(['finished_grading'=>$evaluated_sessions]);
        return response()->json($res);
    }
}

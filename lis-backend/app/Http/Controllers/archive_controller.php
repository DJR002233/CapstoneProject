<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\Models\dbregistrations\tbl_child_information;

class archive_controller extends Controller
{
    public function getSchoolYears(Request $request){
        $auth = $request->header('authorization');
        $lib = new lib_controller();

        $staff = $lib->getStaffInfo($auth);
        $location = $staff->location_post;
        
        $table = tbl_child_information::class;
        $res = $table::join('tbl_master_list', 'tbl_master_list.registration_number', '=', 'tbl_child_information.registration_number')
        ->where('development_center_location', '=', $location)
        ->where('excluded', '=', '0')
        ->where('archived', '=', '1')
        ->select('school_year')
        ->groupby('school_year')
        ->orderBy('school_year', 'asc')
        ->get();
        return response()->json($res);
    }
    public function getArchivesData(Request $request){
        // return response()->json(['why'=>'lol']);
        $auth = $request->header('authorization');
        $school_year = json_decode($auth,true)['school_year'];
        $lib = new lib_controller();

        $staff = $lib->getStaffInfo($auth);
        $location = $staff->location_post;
        
        $table = tbl_child_information::class;
        $res = ['status' => 'failed', 'message' => 'empty'];
        if($school_year == 0){
            $res = $table::join('tbl_master_list', 'tbl_master_list.registration_number', '=', 'tbl_child_information.registration_number')
                ->where('development_center_location', '=', $location)
                ->where('excluded', '=', '0')
                ->where('archived', '=', '1')
                ->select('tbl_child_information.registration_number', 'last_name', 'first_name', 'middle_name', 'suffix', 'date_of_birth', 'gender', 'session')
                ->get();
        }else{
            $res = $table::join('tbl_master_list', 'tbl_master_list.registration_number', '=', 'tbl_child_information.registration_number')
                ->where('development_center_location', '=', $location)
                ->where('school_year', '=', $school_year)
                ->where('excluded', '=', '0')
                ->where('archived', '=', '1')
                ->select('tbl_child_information.registration_number', 'last_name', 'first_name', 'middle_name', 'suffix', 'date_of_birth', 'gender', 'session')
                ->get();
        }
        return response()->json($res);
    }
    public function getEvaluationGrades(Request $request){
        $auth = $request->header('authorization');
        $reg_num = json_decode($auth,true)['registration_number'];
        $lib = new lib_controller();

        $staff = $lib->getStaffInfo($auth);
        $location = $staff->location_post;
        $location_name = $lib->getLocationName($location);

        $table = tbl_child_information::class;
        $res = [
            'message'=>'not found'
        ];

        function getData($eval_num, $table, $location, $reg_num){
            // global $table, $location, $reg_num;
            return $table::join('tbl_master_list', 'tbl_child_information.registration_number', '=', 'tbl_master_list.registration_number')
                ->join('tbl_grades', 'tbl_grades.registration_number', '=', 'tbl_master_list.registration_number')
                ->where('development_center_location', '=', $location)
                ->where('excluded', '=', '0')
                ->where('archived', '=', '1')
                ->where('tbl_grades.registration_number', '=', $reg_num)
                ->where('evaluation_number', '=', $eval_num)
                ->select('tbl_master_list.registration_number', 
                    'last_name',
                    'first_name',
                    'middle_name',
                    'suffix',
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
                ->get();
        }

        $list1 = getData(1, $table, $location, $reg_num);
        $list2 = getData(2, $table, $location, $reg_num);
        $list3 = getData(3, $table, $location, $reg_num);

        $res = collect([$list1, $list2, $list3])->flatten(1);
        
        return response()->json($res);
    }
}

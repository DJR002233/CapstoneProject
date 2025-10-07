<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\Models\dbregistrations\tbl_dev_center_locations;
use App\Models\dbregistrations\tbl_child_information;
use App\Models\dbregistrations\tbl_master_list;

class center_controller extends Controller
{
    public function get_active_locations(Request $request){
        $locations = tbl_dev_center_locations::where('status','=',1)
        ->select(
            'location_number', 
            'location_name', 
            DB::raw('(select count(development_center_location) from tbl_child_information where excluded = 0 and archived = 0 and development_center_location = location_number) as current_registrations'),
            'max_registration_forms')
        ->groupBy(
            'location_number', 
            'location_name', 
            'max_registration_forms'
        )
        ->orderBy('location_name', 'asc')
        ->get();
        return response()->json($locations);
    }
    public function get_evaluations(Request $request){
        $auth = $request->header('authorization');
        $location_num = json_decode($auth,true)['location_number'];
        $session_num = json_decode($auth,true)['session_number'];
        $lib = new lib_controller();

        $table = tbl_child_information::class;
        $res = [
            'message'=>'not found'
        ];

        $list1 = $table::join('tbl_master_list', 'tbl_child_information.registration_number', '=', 'tbl_master_list.registration_number')
                ->join('tbl_grades', 'tbl_grades.registration_number', '=', 'tbl_master_list.registration_number')
                ->where('development_center_location', '=', $location_num)
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
                ->where('development_center_location', '=', $location_num)
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
                ->where('development_center_location', '=', $location_num)
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
    public function getSessionsData(Request $request){
        $auth = $request->header('authorization');
        $location_num = json_decode($auth,true)['location_number'];
        $session_num = json_decode($auth,true)['session_number'];

        $child_info = tbl_child_information::class;
        $master_list = tbl_master_list::class;
        $res = [];

        $session_list = $master_list::where('session', '=', $session_num)
        ->select('registration_number')
        ->get();

        if($session_list->isNotEmpty()){
            $list = $child_info::whereBelongsTo($session_list, 'master_list')
            ->where('development_center_location', '=', $location_num)
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
                    //'school_year'
                    )
            ->orderBy('last_name', 'asc')
            ->get();
            if($list){
                $res = $list;
            }
        }

        return response()->json($res);
    }
}

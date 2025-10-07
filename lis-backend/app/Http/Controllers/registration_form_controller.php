<?php

namespace App\Http\Controllers;

use App\Models\dbusers\tbl_users;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
// use Illuminate\Support\Facades\Cookie;
use App\Models\dbregistrations\tbl_dev_center_locations;
use App\Models\dbregistrations\tbl_child_information;
use App\Models\dbregistrations\tbl_nutritional_status;
use App\Models\dbregistrations\tbl_parents_information;
use App\Models\dbregistrations\tbl_siblings_information;
use App\Models\dbregistrations\tbl_grades;

class registration_form_controller extends Controller
{
    public function get_available_locations(){
        $locations = tbl_dev_center_locations::where('status','=',1)
        ->select(
            'location_number', 
            'location_name', 
            'location_address', 
            DB::raw('(select count(development_center_location) from tbl_child_information where archived = 0 and development_center_location = location_number) as current_registrations'),
            'max_registration_forms')
        ->groupBy(
            'location_number', 
            'location_name', 
            'location_address', 
            'max_registration_forms'
        )
        ->orderBy('location_name', 'asc')
        ->get();
        return response()->json($locations);
    }
    public function add_registration_form(Request $request){
        // return response()->json([$request->all()]);
        $childForm = json_decode(json_encode(json_decode($request->childInformation)), true);
        $childInformation = $childForm['ci_info'];
        $nutritionalStatus = $childForm['ns'];
        $parentsInformation = json_decode(json_encode(json_decode($request->parentsInformation)),true);
        $siblingsInformation = json_decode(json_encode(json_decode($request->siblingsInformation)),true);
        $table = tbl_child_information::class;
        $reg_num_of_loc = $table::where('development_center_location', '=', $childInformation['development_center_location'])
                            ->select(
                                'development_center_location'
                                //DB::raw('COUNT(development_center_location) as current_registrations'),
                            )
                            ->count();
        $new_reg_num_of_loc = $reg_num_of_loc + 1;
        $childInformation['registration_number_of_location'] = $new_reg_num_of_loc;
        $y = date("Y");
        $childInformation['school_year'] = $y;
        // return response()->json($request->hasFile('picture'));
        if($request->hasFile('picture')){
            $image = $request->file('picture');
            $filename = $childInformation['development_center_location'].'-'.$new_reg_num_of_loc.'.'.$image->getClientOriginalExtension();
            Storage::putFileAs('public/images/'.''.$y, $image, $filename); // located in storage/app/images_XXXX/picture.png
            $childInformation['picture'] = $filename;

            $child_prev_exists = $table::leftjoin('tbl_master_list', 'tbl_master_list.registration_number', '=', 'tbl_child_information.registration_number')
                ->leftjoin('tbl_grades', 'tbl_master_list.registration_number', '=', 'tbl_grades.registration_number')
                ->where('last_name', '=', $childInformation['last_name'])
                ->where('first_name', '=', $childInformation['first_name'])
                ->where('middle_name', '=', $childInformation['middle_name'])
                ->where('suffix', '=', $childInformation['suffix'])
                ->where('gender', '=', $childInformation['gender'])
                ->where('date_of_birth', '=', $childInformation['date_of_birth'])
                // ->where('place_of_birth', '=', $childInformation['place_of_birth'])
                ->select(
                    'tbl_child_information.registration_number',
                    'archived',
                    DB::raw('COUNT(evaluation_number) as number_of_evaluations')
                    )
                ->groupBy(
                    'tbl_child_information.registration_number',
                    'archived',
                    )
                ->orderBy('tbl_child_information.registration_number', 'desc')
                ->get();
            $child_prev_exists = $child_prev_exists->count() ? $child_prev_exists[0] : null;
            $child_is_archived = $child_prev_exists ? $child_prev_exists->archived : 0;
            // return response()->json($child_prev_exists->count());
            if(!$child_prev_exists || $child_is_archived){
                // return response()->json('wow');
                $child_num_of_eval = $child_prev_exists ? $child_prev_exists->number_of_evaluations : 0;
                $child_reg_num = $table::create($childInformation);
                $reg_num = $child_reg_num->getKey();
                $nutritionalStatus['registration_number'] = $reg_num;
                if(!$nutritionalStatus['date_of_last_deworming'])
                $nutritionalStatus['date_of_last_deworming'] = null;
                if(!$nutritionalStatus['date_of_last_vitamin_a_intake'])
                $nutritionalStatus['date_of_last_vitamin_a_intake'] = null;
                tbl_nutritional_status::create($nutritionalStatus);
                for($i = 0; $i < count($parentsInformation); $i++){
                $parentsInformation[$i]['registration_number'] = $reg_num;
                tbl_parents_information::create($parentsInformation[$i]);
                }
                for($i = 0; $i < count($siblingsInformation); $i++){
                $siblingsInformation[$i]['registration_number'] = $reg_num;
                tbl_siblings_information::create($siblingsInformation[$i]);
                }
                if($child_num_of_eval){
                    $res = tbl_grades::where('registration_number', '=', $child_prev_exists->registration_number)
                    ->update(['registration_number'=>$reg_num]);
                }
            }
            return response()->json(['status' => 'success']);
        }
        return response()->json(['status' => 'Error', 'message' => 'Please contact tech support']);
    }
    public function verify_registration_form(Request $request){
        $auth = $request->header('authorization');
        $location_number = json_decode($auth, true)['id'];
        $location_name = json_decode($auth, true)['name'];
        $res = ['status' => 'full'];
        $query = tbl_dev_center_locations::where('status','=',1)
        ->where('location_number', '=', $location_number)
        ->where('location_name', '=', $location_name)
        ->select(
            'location_number',
            DB::raw('(select count(development_center_location) from tbl_child_information where archived = 0 and development_center_location = location_number) as current_registrations'),
            'max_registration_forms')
        ->groupBy('location_number', 
                    'max_registration_forms')
        ->orderBy('location_number', 'asc')
        ->get();
        if($query->isNotEmpty())
            if($query[0]->current_registrations < $query[0]->max_registration_forms){
                $res = ['status' => 'available'];
            }
        return response()->json($res);
    }
}
//->cookie('name', 'value', '60000')
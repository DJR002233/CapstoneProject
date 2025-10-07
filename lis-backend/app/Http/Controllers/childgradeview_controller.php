<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\dbregistrations\tbl_grades;

class childgradeview_controller extends Controller
{
    public function getChildData(Request $request){
        $res = ['status' => 'failed', 'message' => 'Please contact tech support'];
        $auth = $request->header('authorization');
        $code = json_decode($auth,true)['code'];
        $first_name = json_decode($auth,true)['first_name'];
        $middle_name = json_decode($auth,true)['middle_name'];
        $last_name = json_decode($auth,true)['last_name'];
        $suffix = json_decode($auth,true)['suffix'];
        $date_of_birth = json_decode($auth,true)['date_of_birth'];

        $data = tbl_grades::join('tbl_child_information', 'tbl_grades.registration_number', '=', 'tbl_child_information.registration_number')
            ->where('tbl_grades.registration_number', '=', $code)
            ->where('excluded', '=', 0)
            ->where('first_name', '=', $first_name)
            ->where('middle_name', '=', $middle_name)
            ->where('last_name', '=', $last_name)
            ->where('suffix', '=', $suffix)
            ->where('date_of_birth', '=', $date_of_birth)
            ->select(
                'tbl_child_information.registration_number', 
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
                'date_of_birth',
                'last_name',
                'first_name',
                'middle_name',
                'suffix',
            )
            ->get();

        $res = $data;
        return response()->json($res);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\dbregistrations\tbl_child_information;
use App\Models\dbregistrations\tbl_dev_center_locations;

use App\Http\Controllers\lib_controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use DateTime;

class dashboard_controller extends Controller
{
    public function histograms(Request $request){
        //prepare stuff
        $auth = $request->header('authorization');
        $lib = new lib_controller();
        $forms = tbl_child_information::class;

        //get staff info and location of development center
        $staff = $lib->getStaffInfo($auth);
        $location = $staff->location_post;

        $current_date = now()->format('Y-m-d');
        $modified_date = new DateTime($current_date);
        //get stats of registration for the current location
        $week = $forms::where('development_center_location', '=', $location)
            ->where('created_at', '>', $modified_date->modify('-7 days'))
            ->where('archived', '!=', 1)
            ->groupby('date')
            ->orderby('date', 'desc')
            ->select(DB::raw('CAST(created_at as DATE) as date'), DB::raw('COUNT(registration_number) as count'))
            ->distinct('count')
            ->limit(7)
            ->get();
        $pending = $forms::leftjoin('tbl_master_list', 'tbl_child_information.registration_number', '=', 'tbl_master_list.registration_number')
                    ->where('development_center_location', '=', $location)
                    ->where('excluded', '!=', 1)
                    ->where('archived', '!=', 1)
                    ->whereNull('tbl_master_list.registration_number')
                    ->select('tbl_master_list.registration_number')
                    ->count();
        $enrolled = $forms::join('tbl_master_list', 'tbl_child_information.registration_number', '=', 'tbl_master_list.registration_number')
                    ->where('development_center_location', '=', $location)
                    ->where('excluded', '!=', 1)
                    ->where('archived', '!=', 1)
                    ->select('tbl_master_list.registration_number')
                    ->count();
        
        $count = 0;
        if(!$week->isEmpty())
            if(new DateTime($week[0]->date) == new DateTime($current_date))
                $count = $week[0]->count;
        $name = $staff->first_name.' '.
            $staff->last_name.' '.
            $staff->suffix;
        if($staff->middle_name)
            $name = $staff->first_name.' '.
                substr($staff->middle_name, 0,1).'. '.
                $staff->last_name.' '.
                $staff->suffix;
        return response()->json([
            'name' => $name,
            'current_date' => $current_date,
            'week' => $week,
            'ratio' => [
                'registration_forms' => $pending,
                'enrolled' => $enrolled],
            'count' => $count,
                ]);
    }
    public function LocationandSchoolYear(Request $request){
        //prepare stuff
        $auth = $request->header('authorization');
        $lib = new lib_controller();

        //get staff info and location of development center
        $staff = $lib->getStaffInfo($auth);
        $location = $staff->location_post;
        $date = tbl_child_information::select('created_at')->limit(1)->first();

        return response()->json([
            'location' => $location,
            'location_name' => $lib->getLocationName($location),
            'date' => $date->created_at,
        ]);
    }
    public function AllLocationandSchoolYear(Request $request){
        //prepare stuff
        $auth = $request->header('authorization');
        $lib = new lib_controller();

        //get staff info and location of development center
        $staff = $lib->getStaffInfo($auth);
        $location = $staff->location_post;

        $locations = tbl_dev_center_locations::select(
            'location_number', 
            'location_name',
            )
        ->orderBy('location_name', 'asc')
        ->get();
        $date = tbl_child_information::select('created_at')->limit(1)->first();

        return response()->json([
            'location' => $location,
            'location_name' => $lib->getLocationName($location),
            'locations' => $locations,
            'date' => $date->created_at,
        ]);
    }
}
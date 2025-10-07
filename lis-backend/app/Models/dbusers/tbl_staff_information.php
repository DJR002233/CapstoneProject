<?php

namespace App\Models\dbusers;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class tbl_staff_information extends Model
{
    use HasFactory;
    protected $connection = 'dbusers';
    protected $table = 'tbl_staff_information';
    protected $primaryKey = 'staff_id';
    
    protected $fillable = [
        'staff_id',
        'first_name',
        'middle_name',
        'last_name',
        'suffix',
        'location_post',
        'authorization_level',
        'finished_grading',
        // 'login_time',
        // 'logout_time',
    ];

}

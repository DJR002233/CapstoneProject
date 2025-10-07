<?php

namespace App\Models\dbregistrations;

use App\Models\dbregistrations\tbl_child_information;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class tbl_dev_center_locations extends Model
{
    use HasFactory;
    protected $connection = 'dbregistrations';
    protected $table = 'tbl_dev_center_locations';
    protected $primaryKey = 'location_number';
    
    protected $fillable = [
        'location_name',
        'location_address',
        'status',
        'max_registration_forms',
    ];

    // public function child(): HasMany{
    //     return $this->hasMany(tbl_child_information::class, 'development_center_location', $primaryKey);
    // }
}

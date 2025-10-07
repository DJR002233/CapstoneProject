<?php

namespace App\Models\dbregistrations;

use App\Models\dbregistrations\tbl_dev_center_locations;
use App\Models\dbregistrations\tbl_master_list;
use App\Models\dbregistrations\tbl_nutritional_status;
use App\Models\dbregistrations\tbl_parents_information;
use App\Models\dbregistrations\tbl_siblings_information;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class tbl_child_information extends Model
{
    use HasFactory;
    protected $connection = 'dbregistrations';
    protected $table = 'tbl_child_information';
    protected $primaryKey = 'registration_number';
    
    protected $fillable = [
        'registration_number_of_location',
        'school_year',
        'development_center_location',
        'picture',
        'last_name',
        'first_name',
        'middle_name',
        'suffix',
        'nickname',
        'gender',
        'date_of_birth',
        'place_of_birth',
        'age',
        'address',
        'barangay',
        'contact_number',
        'religion',
        'birth_certificate',
        'health_records',
        'no_requirements',
    ];

    public function dev_center_location(): HasOne{
        return $this->hasOne(tbl_dev_center_locations::class, 'location_number', 'development_center_location');
    }

    // public function master_list(): HasOne{
    //     return $this->hasOne(tbl_master_list::class, 'registration_number', 'registration_number');
    // }

    public function master_list(): BelongsTo{
        return $this->belongsTo(tbl_master_list::class, 'registration_number', 'registration_number');
    }

    public function nutritional_status(): HasOne{
        return $this->hasOne(tbl_nutritional_status::class, 'registration_number', 'registration_number');
    }

    public function parents_information(): HasMany{
        return $this->hasMany(tbl_parents_information::class, 'registration_number', 'registration_number');
    }

    public function siblings_information(): HasMany{
        return $this->hasMany(tbl_siblings_information::class, 'registration_number', 'registration_number');
    }

    // protected function casts(): array
    // {
    //     return [
    //         'created_at' => 'DATE',
    //     ];
    // }
}

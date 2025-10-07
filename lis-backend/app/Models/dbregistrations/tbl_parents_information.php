<?php

namespace App\Models\dbregistrations;

use App\Models\dbregistrations\tbl_child_information;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class tbl_parents_information extends Model
{
    use HasFactory;
    protected $connection = 'dbregistrations';
    protected $table = 'tbl_parents_information';
    protected $primaryKey = 'registration_number';

    protected $fillable = [
        'registration_number',
        'relationship_to_the_child',
        'last_name',
        'first_name',
        'middle_name',
        'suffix',
        'address',
        'contact_number',
        'date_of_birth',
        'age',
        'sex',
        'educational_attainment',
        'civil_status',
        'occupation',
        'business_address',
        'precinct_number',
        'barangay',
        'tupad_beneficiary_year',
        'category',
        'pwd_number',
    ];

    public function child_information(): BelongsTo{
        return $this->belongsTo(tbl_child_information::class, 'registration_number');
    }
}

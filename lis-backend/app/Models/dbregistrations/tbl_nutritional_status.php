<?php

namespace App\Models\dbregistrations;

use App\Models\dbregistrations\tbl_child_information;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class tbl_nutritional_status extends Model
{
    use HasFactory;
    protected $connection = 'dbregistrations';
    protected $table = 'tbl_nutritional_status';
    protected $primaryKey = 'registration_number';

    protected $fillable = [
        'registration_number',
        'pwd_number',
        'medical_diagnosis',
        'with_medical_record',
        '4ps_reference_number',
        'date_of_last_deworming',
        'date_of_last_vitamin_a_intake',
        'upon_entry',
        'after_program'
    ];

    public function child_information(): BelongsTo{
        return $this->belongsTo(tbl_child_information::class, 'registration_number');
    }

}

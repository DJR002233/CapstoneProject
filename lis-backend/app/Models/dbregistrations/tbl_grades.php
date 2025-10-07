<?php

namespace App\Models\dbregistrations;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class tbl_grades extends Model
{
    use HasFactory;
    protected $connection = 'dbregistrations';
    protected $table = 'tbl_grades';
    protected $primaryKey = 'registration_number';
    
    protected $fillable = [
        'registration_number',
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
    ];
}

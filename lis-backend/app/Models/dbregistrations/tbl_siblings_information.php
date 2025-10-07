<?php

namespace App\Models\dbregistrations;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class tbl_siblings_information extends Model
{
    use HasFactory;
    protected $connection = 'dbregistrations';
    protected $table = 'tbl_siblings_information';
    protected $primaryKey = 'registration_number';

    protected $fillable = [
        'registration_number',
        'name',
        'date_of_birth',
        'age',
        'grade_level',
    ];

    public function child_information(): BelongsTo{
        return $this->belongsTo(tbl_child_information::class, 'registration_number');
    }
}

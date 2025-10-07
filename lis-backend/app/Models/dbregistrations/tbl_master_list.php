<?php

namespace App\Models\dbregistrations;

use App\Models\dbregistrations\tbl_child_information;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class tbl_master_list extends Model
{
    use HasFactory;
    protected $connection = 'dbregistrations';
    protected $table = 'tbl_master_list';
    protected $primaryKey = 'registration_number';
    
    protected $fillable = [
        'registration_number',
        'child_number',
    ];
    
    // public function child_information(): BelongsTo{
    //     return $this->belongsTo(tbl_child_information::class, 'child_number', 'registration_number');
    // }

    public function child_information(): HasOne{
        return $this->hasOne(tbl_child_information::class, 'registration_number', 'registration_number');
    }
}

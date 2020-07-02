<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'country'
    ];

    /**
     * Many to Many relationship with Users
     */
    public function users()
    {
        return $this->belongsToMany(User::class);
    }
}

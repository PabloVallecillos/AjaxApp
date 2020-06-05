<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AjaxApp extends Model
{
    
    protected $table    = 'ajax_app';

    protected $hidden   = ['created_at','updated_at']; 

    protected $fillable = ['name', 'email', 'phone']; 
     
}

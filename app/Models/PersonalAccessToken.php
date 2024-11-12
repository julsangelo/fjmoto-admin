<?php

namespace App\Models;

use Laravel\Sanctum\PersonalAccessToken as SanctumPersonalAccessToken;

class PersonalAccessToken extends SanctumPersonalAccessToken
{
    public $table = 'personalAccessTokens';
    protected $fillable = ['tokenable_id', 'tokenable_type', 'name', 'token', 'abilities', 'expires_at'];
}

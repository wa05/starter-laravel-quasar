<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UsersController extends Controller
{
    public function returnPanel()
    {
        return file_get_contents(public_path() . '/admin/index.html');
    }
}

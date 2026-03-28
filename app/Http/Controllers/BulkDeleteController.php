<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Traits\BulkDeletableTrait;

class BulkDeleteController extends Controller
{
    use BulkDeletableTrait;
}

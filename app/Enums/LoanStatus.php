<?php

namespace App\Enums;

enum LoanStatus:string
{
    case Pending = 'Pending';
    case Current = 'Current';
    case Approved = 'Approved';
    case Rejected = 'Rejected';
    case Completed = 'Completed';
}

<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Models\District;
use App\Models\LocalLevel;
use App\Models\master\MstProvince;
use Illuminate\Http\Request;

class AddressController extends Controller
{


    public function getDistricts($provinceId)
    {
        $code=MstProvince::whereId($provinceId)->value('code');
        $districts = District::where('province_id', $code)->get();
        return response()->json($districts);
    }
    public function getLocalLevels($provinceId, $districtId)
    {
        $code=District::whereId($districtId)->value('code');
        $localLevels = LocalLevel::where('district_id', $code)
            ->get();

        return response()->json($localLevels);
    }
}

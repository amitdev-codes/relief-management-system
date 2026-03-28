<?php

namespace App\Services;

class MasterServiceClass
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function getLocalLevels($provinceId, $districtId)
    {
        // Fetch local levels based on province and district IDs
        $localLevels = LocalLevel::where('province_id', $provinceId)
            ->where('district_id', $districtId)
            ->get();

        return response()->json($localLevels);
    }


}

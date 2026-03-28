<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreApplicantProfileRequest;
use App\Http\Requests\UpdateApplicantProfileRequest;
use App\Models\ApplicantProfile;
use App\Models\Caste;
use App\Models\Country;
use App\Models\District;
use App\Models\Gender;
use App\Models\LocalLevel;
use App\Models\MotherTongue;
use App\Models\Province;
use App\Models\Religion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ApplicantProfileController extends Controller
{

    public function edit($id)
    {
        $religions=Religion::all();
        $castes=Caste::all();
        $mothertongues=MotherTongue::all();
        $countries=Country::all();
        $districts=District::all();
        $provinces=Province::all();
        $gender=Gender::all();

        $applicantProfile=ApplicantProfile::find($id);
        return Inertia::render('user/pages/ApplicantProfile',[
            'applicantProfile'=>$applicantProfile,
            'religions'=>$religions,
            'mothertongues'=>$mothertongues,
            'citizenshipDistricts'=>$districts,
            'provinces'=>$provinces,
            'countries'=>$countries,
            'genders'=>$gender,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateApplicantProfileRequest $request, ApplicantProfile $applicantProfile)
    {
        $data = $request->validated();
        $fileFields = ['citizenship_front', 'citizenship_back', 'photo'];
        foreach ($fileFields as $field) {
            if ($request->hasFile($field)) {
                if ($applicantProfile->$field) {
                    Storage::delete($applicantProfile->$field);
                }
                // Store the new file
                $data[$field] = $request->file($field)->store($field . '_images', 'public');
            }
        }
        $applicantProfile->fill($data);
        $applicantProfile->save();
        return redirect()->back()->with('success', 'Profile Updated  successfully!');
    }

}

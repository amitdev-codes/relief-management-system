<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ApplicantProfile\StoreApplicantProfileRequest;
use App\Http\Requests\ApplicantProfile\UpdateApplicantProfileRequest;
use App\Models\ApplicantProfile;
use App\Models\Caste;
use App\Models\Country;
use App\Models\District;
use App\Models\Gender;
use App\Models\MotherTongue;
use App\Models\Province;
use App\Models\Religion;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ApplicantProfileController extends Controller
{
    public function index()
    {
        // Fetch applicant profiles with related data
        $applicant_profiles = ApplicantProfile::with(['user', 'gender', 'province', 'district', 'newLocalLevel', 'citizenshipDistrict'])
            ->orderBy('id', 'desc')
            ->get()
            ->map(function ($applicantProfile) {
                return [
                    'id' => $applicantProfile->id,
                    'status' => $applicantProfile->user->status,
                    'name' => $applicantProfile->full_name_np,  // Using the accessor
                     'gender' => $applicantProfile->gender->name_np,

                    'address' => $this->formatAddress($applicantProfile),
                    'citizenship' => $this->formatCitizenship($applicantProfile),
                    //'last_name_np' => $applicantProfile->last_name_np,
                    'mobile_number' => $applicantProfile->mobile_number,
                    'family_count' => $applicantProfile->family_count,
                ];
            });

        return Inertia::render('admin/pages/applicantProfile/index', [
            'applicant_profiles' => $applicant_profiles,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $religions = Religion::all();
        $castes = Caste::all();
        $mothertongues = MotherTongue::all();
        $countries = Country::all();
        $districts = District::all();
        $provinces = Province::all();
        $gender = Gender::all();
        $staticData = app('staticData');
        $current_address = $staticData['local_level'];



        return Inertia::render('admin/pages/applicantProfile/ApplicantProfileFormSection', [
            'religions' => $religions,
            'existingPhoto' => "https://as2.ftcdn.net/v2/jpg/07/86/72/89/1000_F_786728988_QyuP5WkUfZMlGMEMltILI72HWVtkEyYx.jpg",
            'mothertongues' => $mothertongues,
            'citizenshipDistricts' => $districts,
            'provinces' => $provinces,
            'countries' => $countries,
            'genders' => $gender,
            'address' => $current_address,

        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreApplicantProfileRequest $request)
    {
        DB::beginTransaction();
        try {
            $data = $request->validated();
            $multipleFileUploads = $request->file('multiple_file_uploads');

            // Prepare the user data
            $userData = [
                'name' => $data['first_name'],
                'name_np' => $data['first_name_np'],
                'email' => $data['email'],
                'user_type_id' => 1,
                'palika_id' => config('app.palika_id'),
                'status' => true,
                'mobile_number' => $data['mobile_number'],
                'password' => Hash::make('123456'),
            ];

            // Create the user
            $user = User::create($userData);
            $role = 'User';
            $user->assignRole($role);

            $data['user_id'] = $user->id;
            $data['palika_id'] = config('app.palika_id');

            // Create the applicant profile
            $applicant = ApplicantProfile::create($data);

            // Handle file uploads for 'photos' and 'citizenship_documents'
            if ($request->hasFile('photo')) {
                $applicant->addMedia($request->file('photo'))->toMediaCollection('photos');
            }

            if ($multipleFileUploads) {
                foreach ($multipleFileUploads as $file) {
                    $applicant->addMedia($file)
                        ->withResponsiveImages()
                        ->toMediaCollection('applicantProfile', 'media');
                }
            }

            DB::commit();

            return redirect()->route('applicantProfiles.index')->with('success', 'Profile saved successfully!');

        } catch (\Illuminate\Database\QueryException $e) {
            DB::rollBack();
            Log::error('Database error: '.$e->getMessage());

            return back()->withErrors(['database' => 'A database error occurred. Please try again.']);

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('General error: '.$e->getMessage());

            return back()->withErrors(['general' => 'An error occurred while saving the profile. Please try again.']);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(ApplicantProfile $applicantProfile)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ApplicantProfile $applicantProfile)
    {
        $religions = Religion::all();
        $castes = Caste::all();
        $mothertongues = MotherTongue::all();
        $countries = Country::all();
        $districts = District::all();
        $provinces = Province::all();
        $gender = Gender::all();
        $staticData = app('staticData');
        $current_address = $staticData['local_level'];

        $mediaItems = $applicantProfile->getMedia('applicantProfile')->map(function ($media) {
            return [
                'id' => $media->id,
                'name' => $media->file_name,
                'url' => $media->getUrl(),
                'mime_type' => $media->mime_type,
                'size' => $media->size,
                'human_readable_size' => $media->human_readable_size,
            ];
        });

        $photos = $applicantProfile->getMedia('photos')->map(function ($media) {
            return $media->getUrl();
        });
        // dd($photos);

        return Inertia::render('admin/pages/applicantProfile/ApplicantProfileFormSection', [
            'applicantProfile' => $applicantProfile,
            'existingPhoto' => $photos[0]??null,
            'existingFiles' => $mediaItems,
            'religions' => $religions,
            'mothertongues' => $mothertongues,
            'citizenshipDistricts' => $districts,
            'provinces' => $provinces,
            'countries' => $countries,
            'genders' => $gender,
            'address' => $current_address,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateApplicantProfileRequest $request, ApplicantProfile $applicantProfile)
    {
        DB::beginTransaction();

        try {
            // Validate the incoming request
            $data = $request->validated();
            $multipleFileUploads = $request->file('multiple_file_uploads');

            // Update the user data
            $user = $applicantProfile->user;
            $userData = [
                'name' => $data['first_name'],
                'name_np' => $data['first_name_np'],
                'email' => $data['email'],
                'mobile_number' => $data['mobile_number'],
            ];
            $user->update($userData);

            // Update the applicant profile
            $applicantProfile->update($data);
            // Update media files for 'photos' and 'citizenship_documents'
            if ($request->hasFile('photo')) {
                $applicantProfile->clearMediaCollection('photos');
                $applicantProfile->addMedia($request->file('photo'))->toMediaCollection('photos');
            }


            if ($multipleFileUploads) {
                $applicantProfile->clearMediaCollection('applicantProfile');
                foreach ($multipleFileUploads as $file) {
                    $applicantProfile->addMedia($file)
                        ->withResponsiveImages()
                        ->toMediaCollection('applicantProfile', 'media');
                }
            }
            if ($request->has('remove_file_ids')) {
                foreach ($request->input('remove_file_ids') as $fileIdOrIndex) {
                    // If the file is already uploaded and has an ID, remove it from the media collection
                    $mediaItem = $applicantProfile->media()->find($fileIdOrIndex);
                    if ($mediaItem) {
                        $mediaItem->delete();
                    }
                }
            }

            DB::commit();

            return redirect()->route('applicantProfiles.index')->with('success', 'Profile updated successfully!');

        } catch (\Illuminate\Database\QueryException $e) {
            DB::rollBack();
            Log::error('Database error: '.$e->getMessage());

            return back()->withErrors(['database' => 'A database error occurred. Please try again.']);

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('General error: '.$e->getMessage());

            return back()->withErrors(['general' => 'An error occurred while updating the profile. Please try again.']);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ApplicantProfile $applicantProfile)
    {
        // Start a database transaction to ensure data consistency
        DB::transaction(function () use ($applicantProfile) {
            // Get the associated user
            $user = $applicantProfile->user;
            if ($user) {
                $user->roles()->detach(); // Remove all roles
                $user->permissions()->detach(); // Remove all permissions
                $user->delete();
            }

            $applicantProfile->delete();
        });

        return redirect()->route('applicantProfiles.index')->with('success', 'Applicant profile and associated user deleted successfully.');
    }


    private function formatAddress($applicantProfile)
    {
        $address = [];
        if ($applicantProfile->province) {
            $address[] = $applicantProfile->province->name_np;
        }
        if ($applicantProfile->district) {
            $address[] = $applicantProfile->district->name_np;
        }
        if ($applicantProfile->newLocalLevel) {
            $address[] = $applicantProfile->newLocalLevel->name_np;
        }
        return implode(' ', $address);
    }

    private function formatCitizenship($applicantProfile)
    {
        $citizenship = [$applicantProfile->citizenship_no];
        if ($applicantProfile->citizenshipDistrict) {
            $citizenship[] = $applicantProfile->citizenshipDistrict->name_np;
        }
        if ($applicantProfile->citizenship_issued_date_bs) {
            $citizenship[] = $applicantProfile->citizenship_issued_date_bs;
        }
        return implode(' ', $citizenship);
    }
}

<?php

namespace App\Http\Requests\ApplicantProfile;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateApplicantProfileRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $applicantProfileId = $this->route('applicantProfile');

        return [
            'first_name' => 'required|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'last_name' => 'required|string|max:255',
            'first_name_np' => 'required|string|max:255',
            'middle_name_np' => 'nullable|string|max:255',
            'last_name_np' => 'required|string|max:255',
            'dob' => 'required',
            'mobile_number' => 'required',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'first_name_np' => 'required|string|max:255',
            'middle_name_np' => 'nullable|string|max:255',
            'last_name_np' => 'required|string|max:255',
            'mothertongue_id' => 'required|exists:mst_mothertongues,id',
            'religion_id' => 'required|exists:mst_religions,id',
            'country_id' => 'required|exists:mst_countries,id',
            'gender_id' => 'required|exists:mst_genders,id',
            'new_province' => 'required|exists:mst_provinces,id',
            'new_district' => 'required|exists:mst_districts,id',
            'new_local_level' => 'required|exists:mst_local_levels,id',
            'new_ward' => 'required|integer|min:1|max:255',
            'new_street_name' => 'nullable|string|max:255',
            'family_count' => 'nullable|integer|min:1',
            'citizenship_no' => 'required', 'string', 'max:255', Rule::unique('applicant_profiles')->ignore($applicantProfileId),
            'citizenship_issued_district' => 'required|exists:mst_districts,id',
            'citizenship_issued_date_bs' => 'required',
            'email' => 'nullable',
            'remarks' => 'nullable|string|max:1000',
            'middle_name' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:255',
            'old_province' => 'nullable|exists:mst_provinces,id',
            'old_district' => 'nullable|exists:mst_districts,id',
            'old_local_level' => 'nullable|exists:mst_local_levels,id',
            'old_ward' => 'nullable|integer|min:1|max:255',
            'old_street_name' => 'nullable|string|max:255',

        ];
    }
}

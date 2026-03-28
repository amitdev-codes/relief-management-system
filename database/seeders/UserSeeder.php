<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Gender;
use App\Models\Religion;
use Faker\Factory as Faker;
use App\Models\MotherTongue;
use Illuminate\Database\Seeder;
use App\Models\ApplicantProfile;
use App\Models\master\MstGender;
use App\Models\master\MstReligion;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Http;
use App\Models\master\MstMotherTongue;
use Illuminate\Support\Facades\Storage;
use Spatie\Permission\Models\Permission;
use Spatie\MediaLibrary\MediaCollections\Models\Media;




class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        $firstNames = ['Amit', 'Suman', 'Bikash', 'Prabin', 'Sita', 'Rita', 'Gita', 'Sangita','Sunila','simran'];
        $middleNames = ['Kumar', 'Prasad', 'Bahadur', 'Kumari', 'Nath', 'Maya', 'Lal'];
        $lastNames = ['Sharma', 'Thapa', 'Shrestha', 'Gurung', 'Magar', 'Rai', 'Chhetri', 'Tamang'];

        $firstNamesNp = ['अमित', 'सुमन', 'बिकाश', 'प्रवीण', 'सीता', 'रीता', 'गीता','संगीता','सुनिला','सुनिला'];
        $middleNamesNp = ['कुमार','प्रसाद', 'बहादुर','कुमारी','नाथ' ,  'माया', 'लाल', 'शोभा'];
        $lastNamesNp = ['शर्मा', 'थापा','श्रेष्ठ', 'गुरुङ', 'मगर', 'राई', 'क्षेत्री', 'तामाङ'];
        $nepaliSentences = [
            'उनी एक असल व्यक्तित्वको धनी छन्।',
            'यो व्यक्ति आफ्नो काममा निकै लगनशील छन्।',
            'सहयोग गर्न सधैं तयार रहने व्यक्ति।',
            'उनी सबैसँग मिल्न मन पराउने व्यक्ति हुन्।',
            'उनी निकै परिश्रमी र इमानदार छन्।',
        ];

        $personImages = [
            'https://randomuser.me/api/portraits/men/1.jpg',
            'https://randomuser.me/api/portraits/women/2.jpg',
            'https://randomuser.me/api/portraits/men/3.jpg',
            'https://randomuser.me/api/portraits/women/4.jpg',
            'https://randomuser.me/api/portraits/men/5.jpg',
            'https://randomuser.me/api/portraits/women/6.jpg',
            'https://randomuser.me/api/portraits/men/7.jpg',
            'https://randomuser.me/api/portraits/women/8.jpg',
            'https://randomuser.me/api/portraits/men/9.jpg',
            'https://randomuser.me/api/portraits/women/10.jpg',
            'https://randomuser.me/api/portraits/men/11.jpg',
            'https://randomuser.me/api/portraits/women/12.jpg',
            'https://randomuser.me/api/portraits/men/13.jpg',
            'https://randomuser.me/api/portraits/women/14.jpg',
            'https://randomuser.me/api/portraits/men/15.jpg',
            'https://randomuser.me/api/portraits/women/16.jpg',
            'https://randomuser.me/api/portraits/men/17.jpg',
            'https://randomuser.me/api/portraits/women/18.jpg',
            'https://randomuser.me/api/portraits/men/19.jpg',
            'https://randomuser.me/api/portraits/women/20.jpg',
        ];
        $personImages = [];
        foreach ($personImages as $index => $url) {
            $localPath = 'public/person_images/' . basename($url);
            $this->downloadAndStoreFile($url, 'public', $localPath);
            $personImages[] = $localPath;
        }

        $citizenshipDocuments = [
            'https://example.com/documents/citizenship_front_1.jpg',
            'https://example.com/documents/citizenship_back_1.jpg',
            'https://example.com/documents/citizenship_front_2.jpg',
            'https://example.com/documents/citizenship_back_2.jpg',
            'https://example.com/documents/citizenship_front_3.jpg',
            'https://example.com/documents/citizenship_back_3.jpg',
            'https://example.com/documents/citizenship_front_4.jpg',
            'https://example.com/documents/citizenship_back_4.jpg',
            'https://example.com/documents/citizenship_front_5.jpg',
            'https://example.com/documents/citizenship_back_5.jpg',
            'https://example.com/documents/citizenship_front_6.jpg',
            'https://example.com/documents/citizenship_back_6.jpg',
            'https://example.com/documents/citizenship_front_7.jpg',
            'https://example.com/documents/citizenship_back_7.jpg',
            'https://example.com/documents/citizenship_front_8.jpg',
            'https://example.com/documents/citizenship_back_8.jpg',
            'https://example.com/documents/citizenship_front_10.jpg',
            'https://example.com/documents/citizenship_back_10.jpg',
        ];
        $citizenshipDocuments=[];
        foreach ($citizenshipDocuments as $index => $url) {
            $localPath = 'public/citizenship_documents/' . basename($url);
            $this->downloadAndStoreFile($url, 'public', $localPath);
            $citizenshipDocuments[] = $localPath;
        }

        $superAdminRole = Role::findByName('SuperAdmin');
        $adminRole = Role::findByName('Admin');
        $userRole = Role::findByName('User');
        $localadminRole = Role::findByName('LocalLevelAdmin');

        //create superadmin user
        $superAdmin=User::create(['palika_id' => 1,'name' => 'superadmin','email' => 'superadmin@rms.com','password' => bcrypt('password'),'mobile_number'=>9800000001,'status' => true]);
        $superAdmin->assignRole($superAdminRole);
        //create admin user
        $admin=User::create(['palika_id' => 1,'name' => 'admin','email' => 'admin@rms.com','password' => bcrypt('password'),'mobile_number'=>9800000002,'status' => true]);
        $admin->assignRole($adminRole);
        //create local level user
        $localadmin=User::create(['palika_id' => config('app.client_id'),'name' => 'localadmin', 'email' => 'localadmin@rms.com','password' => bcrypt('12345678'),'mobile_number'=>9800000003,'status' => true,]);
        $localadmin->assignRole($localadminRole);

        // Create 10 users with role_id = 2
        for ($i = 0; $i < 10; $i++) {
            $index = $faker->numberBetween(0, count($firstNames) - 1);

            $firstName = $firstNames[$index];
            $middleName = $middleNames[$faker->numberBetween(0, count($middleNames) - 1)];
            $lastName = $lastNames[$faker->numberBetween(0, count($lastNames) - 1)];

            $firstNameNp = $firstNamesNp[$index];
            $middleNameNp = $middleNamesNp[array_search($middleName, $middleNames)];
            $lastNameNp = $lastNamesNp[array_search($lastName, $lastNames)];
            $email = $faker->unique()->safeEmail;

            // Create user
            $user = User::factory()->create([
                'palika_id' => 1,
                'name' => $firstName,
                'user_type_id' => 1,
                'name_np' => $firstNameNp,
                'email' => $email,
                'mobile_number' => $this->generateNepalMobileNumber(),
                'status' => true,
            ]);
            $user->assignRole($userRole->id);

            // Fetch random gender, religion, mothertongue, etc. IDs from the database
            $gender_id = Gender::inRandomOrder()->first()->id;
            $religion_id = Religion::inRandomOrder()->first()->id;
            $mothertongue_id = MotherTongue::inRandomOrder()->first()->id;

            // Create ApplicantProfile linked to the user
            $applicantProfile = ApplicantProfile::create([
                'palika_id' => 1,
                'user_id' => $user->id,
                'email' => $user->email,
                'mobile_number' => $user->mobile_number,
                'first_name' => $firstName,
                'middle_name' => $middleName,
                'last_name' => $lastName,
                'first_name_np' => $firstNameNp,
                'middle_name_np' => $middleNameNp,
                'last_name_np' => $lastNameNp,
                'country_id' => 11,  // Assuming country_id is fixed
                'religion_id' => $religion_id,
                'gender_id' => $gender_id,
                'mothertongue_id' => $mothertongue_id,
                'dob' => $this->generateRandomNepaliDate(),
                'photo' => $faker->randomElement($personImages),
                'phone' => $faker->phoneNumber,
                'new_province' => rand(1, 7),
                'new_district' => rand(1, 77),
                'new_local_level' => rand(1, 753),
                'new_ward' => rand(1, 9),
                'new_street_name' => $faker->streetName,
                'old_province' => rand(1, 7),
                'old_district' => rand(1, 77),
                'old_local_level' => rand(1, 753),
                'old_ward' => rand(1, 9),
                'old_street_name' => $faker->streetName,
                'citizenship_no' => $faker->randomNumber(8),
                'citizenship_issued_district' => rand(1, 77),
                'citizenship_issued_date_bs' => $this->generateRandomNepaliDate(),
                'citizenship_front' => $faker->randomElement($citizenshipDocuments),
                'citizenship_back' => $faker->randomElement($citizenshipDocuments),
                'family_count' => rand(1, 10),
                'remarks' => $faker->randomElement($nepaliSentences),
                'status' => true,
            ]);

            if ($applicantProfile->photo) {
                $applicantProfile->addMedia(public_path($applicantProfile->photo))
                ->withResponsiveImages()
                    ->toMediaCollection('photos');
            }

            // Add citizenship documents
            foreach ($citizenshipDocuments as $doc) {
                $applicantProfile->addMedia(public_path($doc))
                ->withResponsiveImages()
                    ->toMediaCollection('citizenship_documents');
            }



        }





    }

    /**
     * Generate a random Nepali date as a string.
     *
     * @return string
     */
    private function generateRandomNepaliDate()
    {
        $year = rand(2030, 2070);  // Random year in BS
        $month = rand(1, 12);      // Random month

        // Determine the number of days in the selected month
        if (in_array($month, [1, 3, 5, 7, 9, 11])) {
            $day = rand(1, 31);
        } elseif (in_array($month, [4, 6, 8, 10, 12])) {
            $day = rand(1, 30);
        } else { // February
            if ($this->isLeapYear($year)) {
                $day = rand(1, 29); // Leap year
            } else {
                $day = rand(1, 28); // Non-leap year
            }
        }

        return $year . '/' . str_pad($month, 2, '0', STR_PAD_LEFT) . '/' . str_pad($day, 2, '0', STR_PAD_LEFT);
    }
    private function isLeapYear($year)
    {
        // Basic logic to check for leap year in BS calendar.
        return ($year % 4 == 0);
    }
    private function generateNepalMobileNumber()
    {
        // Prefix for Nepal mobile numbers
        $faker = Faker::create();
        $prefix = $faker->randomElement(['98', '97', '96']);
        return $prefix . $faker->numerify('#######');
    }

    private function downloadAndStoreFile($url, $disk, $path)
    {
        $response = Http::get($url);
        if ($response->ok()) {
            Storage::disk($disk)->put($path, $response->body());
            return $path;
        }
        throw new \Exception("Failed to download file from {$url}");
    }
}

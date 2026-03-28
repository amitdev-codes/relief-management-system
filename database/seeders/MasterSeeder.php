<?php

namespace Database\Seeders;

use App\Models\Religion;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MasterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->command->info('Please wait while updating the religions data...');

        $religions = [
            ['code' => 'H', 'name' => 'Hinduism', 'name_np' => 'हिन्दू धर्म'],
            ['code' => 'B', 'name' => 'Buddhism', 'name_np' => 'बुद्ध धर्म'],
            ['code' => 'I', 'name' => 'Islam', 'name_np' => 'इस्लाम'],
            ['code' => 'C', 'name' => 'Christianity', 'name_np' => 'क्रिश्चियन धर्म'],
            ['code' => 'J', 'name' => 'Judaism', 'name_np' => 'यहूदी धर्म'],
            ['code' => 'S', 'name' => 'Sikhism', 'name_np' => 'सिख धर्म'],
            ['code' => 'Z', 'name' => 'Zoroastrianism', 'name_np' => 'जारोअस्त्र धर्म'],
            ['code' => 'D', 'name' => 'Daoism', 'name_np' => 'दाओ धर्म'],
            ['code' => 'J', 'name' => 'Jainism', 'name_np' => 'जैन धर्म'],
            ['code' => 'P', 'name' => 'Parsis', 'name_np' => 'पारसी धर्म'],
            ['code' => 'K', 'name' => 'Kundalini', 'name_np' => 'कुण्डलिनी'],
            ['code' => 'T', 'name' => 'Taoism', 'name_np' => 'ताओ धर्म'],
            ['code' => 'N', 'name' => 'New Age', 'name_np' => 'न्यू एज़'],
            ['code' => 'U', 'name' => 'Unitarian Universalism', 'name_np' => 'यूनिटेरियन यूनिवर्सलिज़म'],
            ['code' => 'O', 'name' => 'Odinism', 'name_np' => 'ओडिन धर्म'],
            ['code' => 'A', 'name' => 'Agnosticism', 'name_np' => 'अज्ञेयवाद'],
            ['code' => 'A', 'name' => 'Atheism', 'name_np' => 'अधार्मिकता'],
            ['code' => 'M', 'name' => 'Mithraism', 'name_np' => 'मिथ्र धर्म'],
            ['code' => 'H', 'name' => 'Hare Krishna', 'name_np' => 'हरे कृष्णा'],
            ['code' => 'S', 'name' => 'Shinto', 'name_np' => 'शिंटो धर्म'],
            ['code' => 'T', 'name' => 'Tengriism', 'name_np' => 'तेग्रिज़म'],
            ['code' => 'L', 'name' => 'Lamaism', 'name_np' => 'लामा धर्म'],
            ['code' => 'Y', 'name' => 'Yazidism', 'name_np' => 'यज़ीद धर्म'],
            ['code' => 'M', 'name' => 'Mormonism', 'name_np' => 'मॉरमोन धर्म'],
            ['code' => 'H', 'name' => 'Hellenism', 'name_np' => 'हेलेनिज़म'],
            ['code' => 'G', 'name' => 'Gnosticism', 'name_np' => 'ग्नोस्टिक धर्म'],
            ['code' => 'V', 'name' => 'Vodou', 'name_np' => 'वोडू'],
            ['code' => 'P', 'name' => 'Pantheism', 'name_np' => 'पंथेइज़म'],
            ['code' => 'S', 'name' => 'Santeria', 'name_np' => 'सांटेरिया'],
            ['code' => 'R', 'name' => 'Raelianism', 'name_np' => 'रालियन धर्म'],
            ['code' => 'C', 'name' => 'Confucianism', 'name_np' => 'कन्फ्यूशियानिज़म'],
            ['code' => 'B', 'name' => 'Baha\'i Faith', 'name_np' => 'बहाई धर्म'],
            ['code' => 'R', 'name' => 'Rastafari', 'name_np' => 'रस्ताफारी'],
            ['code' => 'D', 'name' => 'Discordianism', 'name_np' => 'डिस्कॉर्डियनिज़म'],
            ['code' => 'M', 'name' => 'Manichaeism', 'name_np' => 'मनीचीय धर्म'],
            ['code' => 'T', 'name' => 'Thelema', 'name_np' => 'थेलिमा'],
            ['code' => 'H', 'name' => 'Hermeticism', 'name_np' => 'हर्मेटिसिज़म'],
            ['code' => 'G', 'name' => 'Gaudiya Vaishnavism', 'name_np' => 'गौडिया वैष्णविज़म'],
            ['code' => 'L', 'name' => 'Lutheranism', 'name_np' => 'लूथरनिज़म'],
            ['code' => 'J', 'name' => 'Jehovah\'s Witnesses', 'name_np' => 'यहोवा के साक्षी'],
            ['code' => 'E', 'name' => 'Epicureanism', 'name_np' => 'एपिक्यूरियनिज़म'],
            ['code' => 'H', 'name' => 'Hedonism', 'name_np' => 'हेडोनिज़म'],
            ['code' => 'S', 'name' => 'Sufism', 'name_np' => 'सूफी धर्म'],
            ['code' => 'C', 'name' => 'Christian Science', 'name_np' => 'क्रिश्चियन साइंस'],
            ['code' => 'G', 'name' => 'Gnosticism', 'name_np' => 'ग्नोस्टिसिज़म'],
            ['code' => 'K', 'name' => 'Kabbalah', 'name_np' => 'कब्बालाह'],
            ['code' => 'H', 'name' => 'Haitian Vodou', 'name_np' => 'हैतीयन वोडू'],
            ['code' => 'T', 'name' => 'Taoism', 'name_np' => 'ताओ धर्म'],
            ['code' => 'P', 'name' => 'Polytheism', 'name_np' => 'पंथेइज़म'],
            ['code' => 'P', 'name' => 'Pantheism', 'name_np' => 'पंथेइज़म'],
            ['code' => 'Z', 'name' => 'Zen Buddhism', 'name_np' => 'ज़ेन बौद्ध धर्म'],
        ];

        foreach ($religions as $religion) {
            Religion::create($religion);
        }



        $this->command->info('Religions seeding completed');

        $user_types= [
            ['code' => '1', 'name' => 'Personal', 'name_np' => 'व्यक्तिगत'],
            ['code' => '2', 'name' => 'Organization', 'name_np' => 'संस्थागत'],
            ['code' => 'N', 'name' => 'Not Specified', 'name_np' => 'निर्दिष्ट गरिएको छैन'],
        ];

        foreach ($user_types as $user_type) {
            DB::table('mst_user_types')->insert($user_type);
        }


    }
}

<?php

namespace Database\Seeders;

use App\Models\MotherTongue;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LanguageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $languages = [
            ['code' => 'ne', 'name' => 'Nepali', 'name_np' => 'नेपाली'],
            ['code' => 'en', 'name' => 'English', 'name_np' => 'अंग्रेजी'],
            ['code' => 'ma', 'name' => 'Maithili', 'name_np' => 'मैथिली'],
            ['code' => 'bh', 'name' => 'Bhojpuri', 'name_np' => 'भोजपुरी'],
            ['code' => 'aw', 'name' => 'Awadhi', 'name_np' => 'अवधी'],
            ['code' => 'th', 'name' => 'Tharu', 'name_np' => 'थारू'],
            ['code' => 'si', 'name' => 'Sikime', 'name_np' => 'सिकिमी'],
            ['code' => 'rj', 'name' => 'Rajasthani', 'name_np' => 'राजस्थानी'],
            ['code' => 'ro', 'name' => 'Rohingya', 'name_np' => 'रोहिंग्या'],
            ['code' => 'ur', 'name' => 'Urdu', 'name_np' => 'उर्दू'],
            ['code' => 'hi', 'name' => 'Hindi', 'name_np' => 'हिन्दी'],
            ['code' => 'kch', 'name' => 'Koch', 'name_np' => 'कोच'],
            ['code' => 'bho', 'name' => 'Bhojpuri', 'name_np' => 'भोजपुरी'],
            ['code' => 'si', 'name' => 'Sikime', 'name_np' => 'सिकिमी'],
            ['code' => 'gom', 'name' => 'Goan Konkani', 'name_np' => 'गोनकणी'],
            ['code' => 'on', 'name' => 'Ongc', 'name_np' => 'ओंग'],
            ['code' => 'kha', 'name' => 'Khad', 'name_np' => 'खड'],
            ['code' => 'ji', 'name' => 'Jiri', 'name_np' => 'जिरी'],
            ['code' => 'sk', 'name' => 'Sherpa', 'name_np' => 'शेरपा'],
            ['code' => 'dt', 'name' => 'Doteli', 'name_np' => 'डोटेली'],
            ['code' => 'rj', 'name' => 'Rajasthani', 'name_np' => 'राजस्थानी'],
            ['code' => 'mt', 'name' => 'Magar', 'name_np' => 'मगर'],
            ['code' => 'ma', 'name' => 'Maithili', 'name_np' => 'मैथिली'],
            ['code' => 'bnt', 'name' => 'Bont', 'name_np' => 'बोन्ट'],
            ['code' => 'bh', 'name' => 'Bhojpuri', 'name_np' => 'भोजपुरी'],
            ['code' => 'ch', 'name' => 'Chhattisgarhi', 'name_np' => 'छत्तीसगढ़ी'],
            ['code' => 'gop', 'name' => 'Gop', 'name_np' => 'गोप'],
            ['code' => 'tho', 'name' => 'Thokpa', 'name_np' => 'थोकपा'],
            ['code' => 'sum', 'name' => 'Sumbwa', 'name_np' => 'सुम्बवा'],
            ['code' => 'br', 'name' => 'Brahmin', 'name_np' => 'ब्राह्मण'],
            ['code' => 'ke', 'name' => 'Kech', 'name_np' => 'केच'],
            ['code' => 'bar', 'name' => 'Barpali', 'name_np' => 'बारपलि'],
            ['code' => 'dh', 'name' => 'Dhimal', 'name_np' => 'धिमाल'],
            ['code' => 'kho', 'name' => 'Khotang', 'name_np' => 'खोटाङ'],
            ['code' => 'kli', 'name' => 'Kaling', 'name_np' => 'कालिंग'],
            ['code' => 'kim', 'name' => 'Kim', 'name_np' => 'किम'],
            ['code' => 'nmo', 'name' => 'Nemo', 'name_np' => 'नेमो'],
            ['code' => 'lg', 'name' => 'Limbu', 'name_np' => 'लिम्बू'],
            ['code' => 'md', 'name' => 'Magar', 'name_np' => 'मगर'],
            ['code' => 'wor', 'name' => 'Wor', 'name_np' => 'वोर'],
            ['code' => 'lo', 'name' => 'Loma', 'name_np' => 'लोमा'],
            ['code' => 'ts', 'name' => 'Tamang', 'name_np' => 'तामाङ'],
            ['code' => 'daga', 'name' => 'Dagare', 'name_np' => 'डागरे'],
            ['code' => 'ma', 'name' => 'Maithili', 'name_np' => 'मैथिली'],
            ['code' => 'ja', 'name' => 'Jang', 'name_np' => 'जांग'],
            ['code' => 'kye', 'name' => 'Kye', 'name_np' => 'किये'],
            ['code' => 'po', 'name' => 'Pohari', 'name_np' => 'पोहरी'],
            ['code' => 'da', 'name' => 'Damai', 'name_np' => 'डामै'],
            ['code' => 'twi', 'name' => 'Twi', 'name_np' => 'ट्वि'],
            ['code' => 'mb', 'name' => 'Marwari', 'name_np' => 'मारवाड़ी'],
            ['code' => 'bh', 'name' => 'Bhojpuri', 'name_np' => 'भोजपुरी'],
            ['code' => 'swa', 'name' => 'Swangla', 'name_np' => 'स्वांगला'],
            ['code' => 'ra', 'name' => 'Rajbanshi', 'name_np' => 'राजबंशी'],
            ['code' => 'pi', 'name' => 'Pali', 'name_np' => 'पाली'],
            ['code' => 'me', 'name' => 'Meche', 'name_np' => 'मेचे'],
            ['code' => 'bi', 'name' => 'Bishnupriya', 'name_np' => 'बिष्णुप्रिया'],
            ['code' => 'ak', 'name' => 'Aka', 'name_np' => 'अका'],
        ];

        foreach ($languages as $language) {
            MotherTongue::create($language);
        }
    }
}

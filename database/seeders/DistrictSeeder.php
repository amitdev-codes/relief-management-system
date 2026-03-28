<?php

namespace Database\Seeders;

use App\Models\District;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DistrictSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $districts=[
            ['2019', 'Jhapa', 'झापा', 2001],
            ['2021', 'Sunsari', 'सुनसरी', 2001],
            ['2012', 'Terhathum', 'तेह्रथुम', 2001],
            ['2013', 'Dhankuta', 'धनकुटा', 2001],
            ['2014', 'Bhojpur', 'भोजपुर', 2001],
            ['2015', 'Khotang', 'खोटाङ', 2001],
            ['2016', 'Solukhumbu', 'सोलुखुम्बु', 2001],
            ['2017', 'Okhaldhunga', 'ओखलढुङ्गा', 2001],
            ['2018', 'Udayapur', 'उदयपुर', 2001],
            ['2020', 'Morang', 'मोरङ', 2001],
            ['2008', 'Taplejung', 'ताप्लेजुङ्ग', 2001],
            ['2009', 'Panchthar', 'पाँचथर', 2001],
            ['2010', 'Ilam', 'इलाम', 2001],
            ['2011', 'Sankhuwasabha', 'संखुवासभा', 2001],
            ['2028', 'Bara', 'बारा', 2002],
            ['2027', 'Rautahat', 'रौतहट', 2002],
            ['2029', 'Parsa', 'पर्सा', 2002],
            ['2026', 'Sarlahi', 'सर्लाही', 2002],
            ['2025', 'Mahottari', 'महोत्तरी', 2002],
            ['2024', 'Dhanusha', 'धनुषा', 2002],
            ['2023', 'Siraha', 'सिराहा', 2002],
            ['2022', 'Saptari', 'सप्तरी', 2002],
            ['2033', 'Kavrepalanchok', 'काभ्रेपलाञ्चोक', 2003],
            ['2042', 'Kathmandu', 'काठमाडौं', 2003],
            ['2030', 'Dolakha', 'दोलखा', 2003],
            ['2031', 'Ramechhap', 'रामेछाप', 2003],
            ['2032', 'Sindhuli', 'सिन्धुली', 2003],
            ['2034', 'Sindhupalchok', 'सिन्धुपाल्चोक', 2003],
            ['2035', 'Rasuwa', 'रसुवा', 2003],
            ['2036', 'Nuwakot', 'नुवाकोट', 2003],
            ['2037', 'Dhading', 'धादिङ', 2003],
            ['2038', 'Chitwan', 'चितवन', 2003],
            ['2039', 'Makawanpur', 'मकवानपुर', 2003],
            ['2040', 'Bhaktapur', 'भक्तपुर', 2003],
            ['2041', 'Lalitpur', 'ललितपुर', 2003],
            ['2048', 'Mustang', 'मुस्ताङ', 2004],
            ['2049', 'Parbat', 'पर्वत', 2004],
            ['2050', 'Syangja', 'स्याङजा', 2004],
            ['2053', 'Nawalparasi (Eastern Part from Bardaghat Susta)', 'नवलपरासी (बर्दघाट सुस्ता पूर्व)', 2004],
            ['2051', 'Myagdi', 'म्याग्दी', 2004],
            ['2052', 'Baglung', 'बाग्लुङ', 2004],
            ['2047', 'Manang', 'मनाङ', 2004],
            ['2046', 'Kaski', 'कास्की', 2004],
            ['2045', 'Tanahun', 'तनहुँ', 2004],
            ['2043', 'Gorkha', 'गोरखा', 2004],
            ['2044', 'Lamjung', 'लमजुङ', 2004],
            ['2057', 'Palpa', 'पाल्पा', 2005],
            ['2058', 'Arghakhanchi', 'अर्घाखाँची', 2005],
            ['2059', 'Gulmi', 'गुल्मी', 2005],
            ['2054', 'Nawalparasi (Western Part from Bardaghat Susta)', 'नवलपरासी (बर्दघाट सुस्ता पश्चिम)', 2005],
            ['2055', 'Rupandehi', 'रूपन्देही', 2005],
            ['2056', 'Kapilvastu', 'कपिलबस्तु', 2005],
            ['2060', 'Rukum (Eastern Part)', 'रूकुम (पूर्वी भाग)', 2005],
            ['2061', 'Rolpa', 'रोल्पा', 2005],
            ['2062', 'Pyuthan', 'प्यूठान', 2005],
            ['2063', 'Dang', 'दाङ', 2005],
            ['2064', 'Banke', 'बाँके', 2005],
            ['2065', 'Bardiya', 'बर्दिया', 2005],
            ['2070', 'Mugu', 'मुगु', 2006],
            ['2066', 'Rukum (Western Part)', 'रूकुम (पश्चिम भाग)', 2006],
            ['2067', 'Salyan', 'सल्यान', 2006],
            ['2068', 'Dolpa', 'डोल्पा', 2006],
            ['2074', 'Dailekh', 'दैलेख', 2006],
            ['2073', 'Jajarkot', 'जाजरकोट', 2006],
            ['2072', 'Kalikot', 'कालिकोट', 2006],
            ['2071', 'Humla', 'हुम्ला', 2006],
            ['2069', 'Jumla', 'जुम्ला', 2006],
            ['2075', 'Surkhet', 'सुर्खेत', 2006],
            ['2077', 'Bajhang', 'बझाङ', 2007],
            ['2078', 'Doti', 'डोटी', 2007],
            ['2082', 'Dadeldhura', 'डडेल्धुरा', 2007],
            ['2083', 'Kanchanpur', 'कञ्चनपुर', 2007],
            ['2084', 'Kailali', 'कैलाली', 2007],
            ['2080', 'Darchula', 'दार्चुला', 2007],
            ['2076', 'Bajura', 'बाजुरा', 2007],
            ['2081', 'Baitadi', 'बैतडी', 2007],
            ['2079', 'Achham', 'अछाम', 2007],
        ];
        foreach ($districts as $item) {
            $transformedData[] = [
                'code' => $item[0],
                'name' => $item[1],
                'name_np' => $item[2],
                'province_id'=>$item[3],
            ];
        }

        foreach ($transformedData as $district) {
            District::create($district);
        }
    }
}

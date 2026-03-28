import React, { useState } from 'react';
import {
    Box,
    Button,
    Typography,
    TextField,
    Grid,
} from '@mui/material';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { usePage } from '@inertiajs/react';

const AgreementTemplate = () => {
    const { loanAllocation = {} } = usePage().props;
    const [agreementText, setAgreementText] = useState(`
        <div style="display: flex; align-items: center; justify-content: center;">
            <h2 style="text-align: center; font-weight: bold; margin: 0;">
                      <img src="/img/gov.png" alt="Bhaktapur Logo" style="width: 50px; height: 50px;" />
                <strong>
                    <span style="margin-top:5px;">भक्तपुर नगरपालिका र ${loanAllocation.name} बीच शैक्षिक ऋण सम्बन्धमा भएको</span>
                </strong>
                 <img src="/img/bktmun.png" alt="Bhaktapur Logo" style="width: 50px; height: 50px;" />
            </h2>

        </div>

         <h3 style="text-align: center; font-weight: bold;">
           <strong> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;सम्झौता-पत्र</strong>
        </h3>
        <p>भक्तपुर नगरपालिका (जसलाई यसपछि प्रथम पक्ष भनिनेछ) र माहिना ताम्राकार को नाति महादेव ताम्राकार को छोरा भ.पु.जि.भ.न.पा. वडा नं. ५ बस्ने हाल Himalayan Institute of science & Technology विद्यालय / क्याम्पस/ कलेजमा Masters तहमा अध्ययन गर्ने वर्ष २६ का प्रतिमा ताम्राकार (जसलाई यसपछि दोस्रो पक्ष भनिनेछ) बीच तपसिल बमोजिमका शर्तहरु आपसमा पालना गर्ने सहमत भई यो सम्झौता पत्र गरिएको छ।</p>
        <br/>
        <h3><strong>शर्तहरु :</strong></h3>
        <ol>
            <li>1.&nbsp;प्रथम पक्षले दोस्रो पक्षलाई रु ${loanAllocation.loan_allocated_amount}/- अक्षरेपी चार लाख छपन्न हजार सात सय पचास शैक्षिक ऋण दिन सहमत छौं ।</li>
            <li>2.&nbsp;उक्त ऋणमा वार्षिक ६ प्रतिशत ब्याज तिर्न दोस्रो पक्ष सहमत छौं ।</li>
            <li>3.&nbsp;उक्त ऋणमध्ये प्रथम किस्तामा रु. ४,५६,७५०/-दोस्रो किस्तामा रु. ....... तेस्रो किस्तामा रु. .......रकम प्रथम पक्षले दोस्रो पक्षलाई उपलब्ध गराउने छ ।</li>
            <li>4.&nbsp;उक्त शैक्षिक ऋण लिने दोस्रो पक्षले आफूले लिएको ऋण रकम देहाय बमोजिम भक्तपुर नगरपालिकालाई चुक्ता गर्नुपर्नेछ ।
                            <ol style="list-style-type: decimal; margin-left: 20px;">
                                <li>&nbsp;&nbsp;&nbsp;1.&nbsp;शैक्षिक कोर्षको अन्तिम परीक्षा दिएको मितिले एक वर्ष भित्र ऋण रकमको न्यूनत्तम २५ प्रतिशत।</li>
                                <li>&nbsp;&nbsp;&nbsp;2.&nbsp;शैक्षिक कोर्षको अन्तिम परीक्षा दिएको मितिले दुई वर्ष भित्र ऋण रकमको न्यूनत्तम ५० प्रतिशत।</li>
                                <li>&nbsp;&nbsp;&nbsp;3.&nbsp;शैक्षिक कोर्षको अन्तिम परीक्षा दिएको मितिले तीन वर्ष भित्र ऋण रकमको न्यूनत्तम ७५ प्रतिशत।</li>
                                <li>&nbsp;&nbsp;&nbsp;4.&nbsp;शैक्षिक कोर्षको अन्तिम परीक्षा दिएको मितिले चौथो वर्ष भित्र सबै ऋण रकमको शतप्रतिशत साँवा व्याज।</li>
            </ol>
            </li>
            <li>5.&nbsp;उपरोक्त समयावधि भित्र ऋणको साँवा ब्याज नतिरेमा तिर्न बुझाउनु पर्ने साँवा ब्याजको ५ प्रतिशत हर्जना गरी विद्यार्थी र निजको साक्षी बसेका एका परिवारका सदस्यलाई नगरपालिकाबाट प्रदान गरिने सेवाहरुबाट वञ्चित गरेमा र सरकारी बाँकी सरह असुल उपर गरिएमा दोस्रो पक्ष सहमत छौं ।</li>
        </ol>
        <br />

            <div style="text-align: center;">
      <p>……………….. &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;………………… &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;…………………</p>
           <p><strong>प्रथम पक्ष</strong> &nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<strong>रोहबर</strong> &nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<strong>दोस्रो पक्ष</strong></p>
            <p>
                कृष्ण गिरी &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; राम सुन्दर सुजखु
            </p>
            <p>
                प्रमुख प्रशासकीय अधिकृत &nbsp;&nbsp;&nbsp; लेखा प्रमुख &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; भ.न.पा. वडा नं. ५.
            </p>
            <br />
            <p>
                भ.न.पा. &nbsp;&nbsp;&nbsp; भ.न.पा.
            </p>
        </div>
        <br />

        <h3><strong> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;साक्षीहरु</strong></h3>
        <ol>
            <li>1.&nbsp;भ.पु.जि.भ.न.पा. वडा नं. ५ बस्ने एकाघरका आमा नाताका वर्ष ५१ को सुजी लक्ष्मी ताम्राकार -१</li>
            <li>2.&nbsp;ऐ.ऐ ५ बस्ने एकाघरका पिता नाताका वर्ष ५९ को सुजी महादेब ताम्राकार -१</li>
        </ol>
         <br/>
        <p><strong>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;इति सम्बत् २०७९ साल गते रोज शुभम् ।</strong></p>
    `);

    const handlePrint = () => {
        const printWindow = window.open('', '', 'width=800,height=600');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Print Agreement</title>
                    <style>
                        body { font-family: Arial, sans-serif; }
                        h2 { text-align: center; font-weight: bold; }
                        p, li { margin: 10px 0; }
                    </style>
                </head>
                <body>
                    ${agreementText}
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    };

    const handleSubmit = () => {
        console.log("Agreement Text:", agreementText);
        // Handle form submission logic
    };

    return (
        <Box sx={{ p: 4, maxWidth: 800, mx: 'auto', border: '1px solid #ccc', borderRadius: 2, fontFamily: "Kalimati" }}>
            <Typography variant="h5" gutterBottom sx={{ fontFamily: 'Kalimati, sans-serif' }}>
                शैक्षिक ऋण सम्झौतापत्र
            </Typography>
            <CKEditor
                editor={ClassicEditor}
                data={agreementText}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    setAgreementText(data);
                }}
                config={{
                    toolbar: ['undo', 'redo', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList'],
                }}
            />
            <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12}>
                    <Button onClick={handleSubmit} variant="contained" color="primary">
                        Submit Agreement
                    </Button>

                    <Button onClick={handlePrint} variant="outlined" color="secondary" sx={{ ml: 2 }}>
                        Print Agreement
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AgreementTemplate;

import Slider from "react-slick";
import { Box, Card, CardContent } from '@mui/material';

const carouselImages = [
    '/landingImages/bhaktapur2.jpg',
    '/landingImages/bhaktapuur3.jpg',
    '/landingImages/earthquake.jpg',
    '/landingImages/earthquake.jpg',
    // Add more images as needed
];

const ImageCarouselComponent = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000
    };

    return (
        <Card
            sx={{
                width: '100%',
                margin: '0 auto',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Card shadow
                borderRadius: '8px',
                overflow: 'hidden', // Ensure images do not overflow
                backgroundColor: 'transparent', // Ensure background is transparent
            }}
        >
            <CardContent sx={{ padding: 0 }}>
                <Box sx={{ width: '100%', height: 'auto' }}>
                    <Slider {...settings}>
                        {carouselImages.map((image, index) => (
                            <div key={index} style={{ width: '100%', height: 'auto' }}>
                                <img
                                    src={image}
                                    alt={`Carousel ${index}`}
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                        objectFit: 'cover', // Ensure the image covers the card area
                                        borderRadius: '8px',
                                    }}
                                />
                            </div>
                        ))}
                    </Slider>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ImageCarouselComponent;

import CleanHandsIcon from '@mui/icons-material/CleanHands';
import ReliefIcon from '@mui/icons-material/Help';
import FundIcon from '@mui/icons-material/AccountBalance';
import ForumIcon from '@mui/icons-material/Forum';

export const contentData = [
    {
        title: 'कुल राहत बितरण ',
        image: '/landingImages/earthquake.jpg', // Update with your image paths
        icon: <CleanHandsIcon fontSize="large" color="primary" sx={{ backgroundColor: "bisque" }} />,  // Use a relevant icon or remove if not needed
        route: '/disaster-management',
        backgroundColor: '#FFDDC1',
    },
    {
        title: 'कुल अनुदान प्राप्त ',
        image: 'https://via.placeholder.com/400x200?text=Relief+Management',
        icon: <ReliefIcon fontSize="large" color="success" />,
        route: '/relief-management',
        backgroundColor: '#D4E157',
    },
    {
        title: 'कुल ऋण सहयोग ',
        image: 'https://via.placeholder.com/400x200?text=Fund+Management',
        icon: <FundIcon fontSize="large" color="warning" />,
        route: '/fund-management',
        backgroundColor: '#64B5F6',
    },
    {
        title: 'विपद सहयोग',
        image: 'https://via.placeholder.com/400x200?text=Fund+Management',
        icon: <ReliefIcon fontSize="large" color="string" />,
        route: '/relief-management',
        backgroundColor: '#FFAB91',
    }
];

export const statusData = [
    {
        title: 'राहत दर्ता संख्या ',
        count: 3,
    },
    {
        title: 'घटना दर्ता संख्या',
        count: 5,
    },
    {
        title: 'सुझाव दर्ता संख्या',
        count: 95,
    },
    {
        title: 'गुनासो दर्ता संख्या',
        count: 1,
    },
];

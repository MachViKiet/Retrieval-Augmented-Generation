import { createBrowserRouter } from 'react-router-dom';
import AuthLayout from '~/layouts/AuthLayout'
import DashboardLayout from '~/layouts/DashboardLayout';
import HomePage from '~/pages/Dashboard/HomePage';
import SignIn from '~/pages/SignIn';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import ChatGenerator from '~/pages/Dashboard/ChatGenerator/ChatGenerator';
import GuessRoute from './GuessRoute/GuessRoute';
import KnowledgeSpace from '~/pages/Dashboard/KnowledgeBase/KnowledgeBase';
import ModelsManager from '~/pages/Dashboard/ModelsManager';
import AccountManager from '~/pages/Dashboard/AccountManager';
import Setting from '~/pages/Dashboard/Setting';
import Datasets from '~/pages/Dashboard/KnowledgeBase/DatasetPage/Datasets';
import DashboardWithSubNavLayout from '~/layouts/DashboardLayout/DashboardWithSubNavLayout';
import KnowledgeBaseConfiguration from '~/pages/Dashboard/KnowledgeBase/KnowledgeBaseConfiguration';
import KnowledgeBaseRetrievalTesting from '~/pages/Dashboard/KnowledgeBase/KnowledgeBaseRetrievalTesting';
import DatasetDetail from '~/pages/Dashboard/KnowledgeBase/DatasetPage/DatasetDetail';
import UnknowPage from '~/components/Page/UnknowPage';
import UserProfile from '~/pages/User/UserProfile';
import { UserProfile as AdminProfile} from '~/pages/Dashboard/UserProfile';
import UserRoute from './ProtectedRoute/UserRoute';
import HomeLayout from '~/layouts/HomeLayout';
import { HomePage as UserPage } from '~/pages/User/HomePage';
import Chat from '~/pages/User/Chat';
import FeedBack from '~/pages/User/FeedBack';
import FAQs from '~/pages/User/FAQs';
// Define the routes
const router = createBrowserRouter([
  {
    element: <AuthLayout />,  // All routes share this layout
    children: [
      {
        path: '/signin',
        element: <GuessRoute><SignIn /></GuessRoute>,
      }
    ],
  },
  {
    // Dashboard Layout for authenticated routes
    element: (<ProtectedRoute><DashboardLayout/></ProtectedRoute>),
    children: [
      {
        path: '/dashboard',
        element: <HomePage />,
      },
      {
        path: '/chat_generator',
        element: <ChatGenerator />,
      },
      {
        path: '/knowledge_bases',
        element: <KnowledgeSpace/>,
      },
      {
        element: <DashboardWithSubNavLayout/>,
        children: [
          {
            path: '/knowledge_bases/:id/',
            element: <Datasets/>,
          },
          {
            path: '/knowledge_bases/:id/dataset',
            element: <Datasets/>,
          },
          {
            path: '/knowledge_bases/:id/configuration',
            element: <KnowledgeBaseConfiguration/>,
          },
          {
            path: '/knowledge_bases/:id/retrieval_testing',
            element: <KnowledgeBaseRetrievalTesting/>,
          }
        ]
      },
      {
        path: '/knowledge_bases/:id/dataset/:document_id',
        element: <DatasetDetail/>,
      },
      {
        path: '/models_manager',
        element: <ModelsManager />,
      },
      {
        path: '/user_accounts',
        element: <AccountManager />,
      },
      {
        path: '/setting',
        element: <Setting />,
      },
      {
        path: '/user_profile',
        element: <AdminProfile />,
      },
    ],
  },
  {
    element: (<HomeLayout/>),
    children: [
      {
        path: '/',
        element: <UserPage />,
      },
      {
        path: '/faqs',
        element: <FAQs />,
      },
      {
        path: '/profile',
        element: <UserProfile />,
      }
    ]
  },
  {
    element: (<HomeLayout/>),
    children: [
      {
        path: '/chat',
        element: <Chat />,
      },
      {
        path: '/feedback',
        element: <FeedBack />,
      },
    ]
  },
  {
    path: "*", // Bất kỳ đường dẫn nào không khớp sẽ đi tới trang lỗi
    element: <UnknowPage />,
  },
]);

export default router;

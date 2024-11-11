import { createBrowserRouter } from 'react-router-dom';
import AuthLayout from '~/layouts/AuthLayout'
import DashboardLayout from '~/layouts/DashboardLayout';
import Dashboard from '~/pages/Dashboard/Dashboard';
import SignIn from '~/pages/SignIn';
import AdminRoute from './ProtectedRoute/AdminRoute';
import ChatGenerator from '~/pages/Dashboard/ChatGenerator';
import GuessRoute from './GuessRoute/GuessRoute';
import KnowledgeBase from '~/pages/Dashboard/KnowledgeBase';
import ModelsManager from '~/pages/Dashboard/ModelsManager';
import AccountManager from '~/pages/Dashboard/AccountManager';
import Setting from '~/pages/Dashboard/Setting';
import Datasets from '~/pages/Dashboard/KnowledgeBase/DatasetPage/Datasets';
import DashboardWithSubNavLayout from '~/layouts/DashboardLayout/DashboardWithSubNavLayout';
import KnowledgeBaseConfiguration from '~/pages/Dashboard/KnowledgeBase/KnowledgeBaseConfiguration';
import KnowledgeBaseRetrievalTesting from '~/pages/Dashboard/KnowledgeBase/KnowledgeBaseRetrievalTesting';
import DatasetDetail from '~/pages/Dashboard/KnowledgeBase/DatasetPage/DatasetDetail';
import UnknowPage from '~/components/Page/UnknowPage';
import { Profile as UserProfile} from '~/pages/User/Profile';
import { Profile as AdminProfile} from '~/pages/Dashboard/Profile';
import UserRoute from './ProtectedRoute/UserRoute';
import MainLayout from '~/layouts/MainLayout';
import HomePage from '~/pages/User/HomePage';
import Chat from '~/pages/User/Chat';
import FeedBack from '~/pages/User/FeedBack';
import FAQs from '~/pages/User/FAQs';
import PublicRoute from './PublicRoute/PublicRoute';
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
    element: (<AdminRoute><DashboardLayout/></AdminRoute>),
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/chat_generator',
        element: <ChatGenerator />,
      },
      {
        path: '/knowledge_bases',
        element: <KnowledgeBase/>,
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
        path: '/admin_profile',
        element: <AdminProfile />,
      },
    ],
  },
  {
    element: (<PublicRoute><MainLayout/></PublicRoute>),
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/faqs',
        element: <FAQs />,
      }
    ]
  },
  {
    element: (<UserRoute><MainLayout/></UserRoute>),
    children: [
      {
        path: '/chat',
        element: <Chat />,
      },
      {
        path: '/feedback',
        element: <FeedBack />,
      },
      {
        path: '/user_profile',
        element: <UserProfile />,
      }
    ]
  },
  {
    path: "*", // Bất kỳ đường dẫn nào không khớp sẽ đi tới trang lỗi
    element: <UnknowPage />,
  },
]);

export default router;

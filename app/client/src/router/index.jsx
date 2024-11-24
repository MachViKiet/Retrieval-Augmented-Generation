import { createBrowserRouter } from 'react-router-dom';
import AuthLayout from '~/layouts/AuthLayout'
import DashboardLayout from '~/layouts/DashboardLayout/DashboardLayout';
import Dashboard from '~/pages/Dashboard/Dashboard';
import SignIn from '~/pages/SignIn';
import AdminRoute from './ProtectedRoute/AdminRoute';
import {ChatGenerator as AdminChat} from '~/pages/Dashboard/ChatGenerator';
import GuessRoute from './GuessRoute/GuessRoute';
import KnowledgeBase from '~/pages/Dashboard/KnowledgeBase';
import ModelsManager from '~/pages/Dashboard/ModelsManager';
import AccountManager from '~/pages/Dashboard/AccountManager';
import Setting from '~/pages/Dashboard/Setting';
import Datasets from '~/pages/Dashboard/KnowledgeBase/KnowledeBaseDetail';
import DashboardWithSubNavLayout from '~/layouts/DashboardLayout/DashboardWithSubNavLayout';
import KnowledgeBaseConfiguration from '~/pages/Dashboard/KnowledgeBase/KnowledeBaseDetail/Configuration';
import KnowledgeBaseRetrievalTesting from '~/pages/Dashboard/KnowledgeBase/KnowledeBaseDetail/RetrievalTesting';
import DatasetDetail from '~/pages/Dashboard/KnowledgeBase/KnowledeBaseDetail/Dataset';
import UnknowPage from '~/components/Page/UnknowPage';
import { Profile as UserProfile} from '~/pages/User/Profile';
import { Profile as AdminProfile} from '~/pages/Dashboard/Profile';
import UserRoute from './ProtectedRoute/UserRoute';
import MainLayout from '~/layouts/MainLayout';
import HomePage from '~/pages/User/HomePage';
import {ChatGenerator as UserChat} from '~/pages/User/ChatGenerator';
import FeedBack from '~/pages/User/FeedBack';
import FAQs from '~/pages/User/FAQs';
import PublicRoute from './PublicRoute/PublicRoute';
import AppLayout from '~/layouts/AppLayout';
import AppRoute from './AppRoute';

// Define the routes
const router = createBrowserRouter([
  {
    element: <AppRoute> <AppLayout /> </AppRoute>,
    children: [
      {
        element: <GuessRoute><AuthLayout /></GuessRoute>,
        children: [
          {
            path: '/signin',
            element: <SignIn />,
          }
        ],
      },
      {
        element: (<AdminRoute> <DashboardLayout/> </AdminRoute>),
        children: [
          {
            path: '/dashboard',
            element: <Dashboard />,
          },
          {
            path: '/chat_generator',
            element: <AdminChat />,
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
                path: '/knowledge_bases/configuration/:id',
                element: <KnowledgeBaseConfiguration/>,
              },
              {
                path: '/knowledge_bases/retrieval_testing/:id',
                element: <KnowledgeBaseRetrievalTesting/>,
              }
            ]
          },
          {
            path: '/knowledge_bases/:collection/:id',
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
        element: (<UserRoute><MainLayout/></UserRoute>),
        children: [
          {
            path: '/chat',
            element: <UserChat />,
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
    ]
  },
  {
    path: "*", // Bất kỳ đường dẫn nào không khớp sẽ đi tới trang lỗi
    element: <UnknowPage />,
  },
]);

export default router;

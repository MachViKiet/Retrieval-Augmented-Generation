import { createBrowserRouter } from 'react-router-dom';
// import Layout from './components/Layout';
// import HomePage from './pages/HomePage';
// import ProfilePage from './pages/ProfilePage';
// import LoginPage from './pages/LoginPage';
// import ProtectedRoute from './components/ProtectedRoute';
import AuthLayout from '~/layouts/AuthLayout'
import DashboardLayout from '~/layouts/DashboardLayout';
import HomePage from '~/pages/Dashboard/HomePage';
import SignIn from '~/pages/SignIn';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import ChatGenerator from '~/pages/Dashboard/ChatGenerator/ChatGenerator';
import GuessRoute from './GuessRoute/GuessRoute';
import UploadFile from '~/pages/Dashboard/UploadFile';
import KnowledgeSpace from '~/pages/Dashboard/KnowledgeBase/KnowledgeBase';
import ModelsManager from '~/pages/Dashboard/ModelsManager';
import AccountManager from '~/pages/Dashboard/AccountManager';
import Setting from '~/pages/Dashboard/Setting';
import Datasets from '~/pages/Dashboard/KnowledgeBase/DatasetPage/Datasets';
import DashboardWithSubNavLayout from '~/layouts/DashboardLayout/DashboardWithSubNavLayout';
import KnowledgeBaseConfiguration from '~/pages/Dashboard/KnowledgeBase/KnowledgeBaseConfiguration';
import KnowledgeBaseRetrievalTesting from '~/pages/Dashboard/KnowledgeBase/KnowledgeBaseRetrievalTesting';
import DatasetDetail from '~/pages/Dashboard/KnowledgeBase/DatasetPage/DatasetDetail';
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
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/chat_generator',
        element: <ChatGenerator />,
      },
      {
        path: '/upload_files',
        element: <UploadFile/>,
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
    ],
  },
]);

export default router;

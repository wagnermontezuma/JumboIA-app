import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ChatPage from './components/ChatPage';
import { QuizzesPage } from './components/QuizzesPage';
import { QuizPage } from './components/QuizPage';
import { SimuladoPage } from './components/SimuladoPage';
import LiveVoicePage from './components/LiveVoicePage';
import LiveDataPage from './components/LiveDataPage';
import { CalendarPage } from './components/CalendarPage';
import { RedacaoPage } from './components/RedacaoPage';
import { MateriasPage } from './components/MateriasPage';

// Criando o roteador com as rotas da aplicação
const router = createBrowserRouter([
  {
    path: '/',
    element: <ChatPage />,
  },
  {
    path: '/quizzes',
    element: <QuizzesPage />,
  },
  {
    path: '/quizzes/:quizId',
    element: <QuizPage />,
  },
  {
    path: '/simulado',
    element: <SimuladoPage />,
  },
  {
    path: '/live-voice',
    element: <LiveVoicePage />,
  },
  {
    path: '/live',
    element: <LiveDataPage />,
  },
  {
    path: '/calendar',
    element: <CalendarPage />,
  },
  {
    path: '/redacao',
    element: <RedacaoPage />,
  },
  {
    path: '/materias',
    element: <MateriasPage />,
  },
]);

// Componente que fornece o roteador para a aplicação
export function Routes() {
  return <RouterProvider router={router} />;
} 
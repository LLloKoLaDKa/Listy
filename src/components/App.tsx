import WebApp from '@twa-dev/sdk';
import { AppRoot } from '@telegram-apps/telegram-ui';
import { type FC, useEffect } from 'react';
import {
  Route,
  BrowserRouter,
  Routes,
  useLocation,
  useNavigate, Navigate,
} from 'react-router-dom';

import { routes } from 'navigation/routes.tsx';
import {MainLayout} from "app/main-layout/MainLayout.tsx";

function BackButtonManipulator() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    function onClick() {
      navigate(-1);

    }
    WebApp.BackButton.onClick(onClick);

    return () => WebApp.BackButton.offClick(onClick);
  }, [navigate]);

  useEffect(() => {
    if (location.pathname === '/') {
      WebApp.BackButton.isVisible && WebApp.BackButton.hide();
    } else {
      !WebApp.BackButton.isVisible && WebApp.BackButton.show();
    }
  }, [location]);

  return null;
}

export const App: FC = () => {
  return <AppRoot
      appearance={WebApp.colorScheme}
      platform={['macos', 'ios'].includes(WebApp.platform) ? 'ios' : 'base'}
  >
    <BrowserRouter>
      <BackButtonManipulator/>

      <Routes>
        <Route element={<MainLayout/>} path='/'>
          {routes.map((route) => <Route key={route.path} {...route}  />)}
          <Route path='*' element={<Navigate to='/'/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </AppRoot>
}

import React from 'react';
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material';
import COLORS from './constants/Colors';
import { store } from './states';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BottomErrorDialog from './components/common/BottomErrorDialog';
import ROUTESNAMES from './constants/RoutesName';
import Login from './pages/login/index';
import SignUp from './pages/signup/index';
import Main from './pages/main/index';
import MessageLoader from './pages/message-loader/index';
import Analytics from './pages/analytics/index';
import PublicRoutes from './routes/PublicRoutes';
import ProtectedRoute from './routes/ProtectedRoute';






const theme = createTheme({

  palette: {
    primary: {
      main: COLORS.PRIMARY
    },
    secondary: {
      main: '#ffffff'
    }
  },

  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          borderRadius: 20,
          textTransform: 'capitalize'
        }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'capitalize',
          color: 'rgba(255, 255, 255, 0.7)',
        },
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          fontWeight: 700
        }
      }
    }
  },

  typography: {
    fontFamily: [
      'Noto Sans', 'sans-serif'
    ].join(','),
  },
});





function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <BottomErrorDialog />

          <Routes>
           
            <Route element={<PublicRoutes />}>
              <Route path={ROUTESNAMES.LOGIN} element={<Login />} />
              <Route path={ROUTESNAMES.SIGN_UP} element={<SignUp />} />
              <Route path={ROUTESNAMES.SAMPLE_CHAT_APP} element={<Login />} />
            </Route>
            <Route path={ROUTESNAMES.LOADING} element={<MessageLoader />} />

            <Route element={<ProtectedRoute />}>
              <Route path={ROUTESNAMES.MAIN} element={<Main />} />
              <Route path={'/'} element={<Main/>} exact/>
            </Route>

            <Route path={ROUTESNAMES.ANALYTICS} element={<Analytics />} />


          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  )
}

export default App;

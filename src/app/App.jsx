import "../styles/_app.scss";
/* eslint-disable react-hooks/exhaustive-deps */
import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import MatxTheme from "./MatxLayout/MatxTheme/MatxTheme";
import AppContext from "./appContext";
import history from "history.js";

import routes from "./RootRoutes";
import { Store } from "./redux/Store";
import Auth from "./auth/Auth";
import MatxLayout from "./MatxLayout/MatxLayoutSFC";
import AuthGuard from "./auth/AuthGuard";
import { SnackbarProvider } from "notistack";
import NotificationDisplay from "./NotificationDisplay";
import { MatxSuspense } from "matx";

const App = () => {
  return (
    <AppContext.Provider value={{ routes }}>
      <Provider store={Store}>
        <SnackbarProvider maxSnack={10}>
          <Suspense fallback={MatxSuspense}>
            <NotificationDisplay />
          </Suspense>
          <MatxTheme>
            <Auth>
              <Router history={history}>
                <AuthGuard>
                  <MatxLayout />
                </AuthGuard>
              </Router>
            </Auth>
          </MatxTheme>
        </SnackbarProvider>
      </Provider>
    </AppContext.Provider>
  );
};

export default App;

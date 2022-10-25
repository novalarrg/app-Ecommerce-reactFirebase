import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

// import komponen halaman
import Registrasi from "./pages/registrasi"
import Login from "./pages/login"
import NotFound from "./pages/404"
import LupaPassword from "./pages/lupa-password"
import Private from "./pages/private"

import PrivateRoute from "./components/PrivateRoute"
import FirebaseProvider from "./components/FirebaseProvider"

// import dari tailwind css
import { CssBaseline } from "@mui/material"

import ThemeProvider from "@mui/material/styles/ThemeProvider"

import theme from "./components/config/theme"

function App() {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <FirebaseProvider>
          <Router>
            <Switch>
              <PrivateRoute path='/' exact component={Private} />
              <PrivateRoute path='/produk' component={Private} />
              <PrivateRoute path='/pengaturan' component={Private} />
              <PrivateRoute path='/transaksi' component={Private} />
              <Route path='/login' component={Login} />
              <Route path='/registrasi' component={Registrasi} />
              <Route path='/lupa-password' component={LupaPassword} />
              <Route component={NotFound} />
            </Switch>
          </Router>
        </FirebaseProvider>
      </ThemeProvider>
    </>
  )
}

export default App

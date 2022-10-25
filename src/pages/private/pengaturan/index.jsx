import React from "react";


import { Switch, Redirect, Route } from 'react-router-dom'


// import halaman pengguna
import Pengguna from './pengguna'
import Toko from "./toko";


function Pengaturan() {
  return (
    <Switch>
      <Route path='/pengaturan/pengguna' component={Pengguna} />
      <Route path='/pengaturan/toko' component={Toko} />
      <Redirect to='/pengaturan/pengguna' />
    </Switch>
  )
}

export default Pengaturan;
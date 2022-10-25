import React from "react"

import { Switch, Route } from "react-router-dom"

// import halaman pengaturan
import Home from "./home"
import Pengaturan from "./pengaturan"
import Produk from "./produk"
import Transkasi from "./transaksi"

function Private() {
  return (
    <Switch>
      <Route path='/pengaturan' component={Pengaturan} />
      <Route path='/produk' component={Produk} />
      <Route path='/transaksi' component={Transkasi} />
      <Route path='/' component={Home} />
    </Switch>
  )
}

export default Private

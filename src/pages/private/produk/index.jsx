import React from "react";


import { Switch, Route } from 'react-router-dom'


// import halaman produk
import EditProduk from "./edit";
import GridProduk from "./grid";


function Produk() {
  return (
    <Switch>
      <Route path='/produk/edit/:produkId' component={EditProduk} />
      <Route path='/produk/grid' component={GridProduk} />
    </Switch>
  )
}

export default Produk;
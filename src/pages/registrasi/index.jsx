import React, { useState } from "react"

// import dari komponent material ui
import { Button, Container, Grid, Paper, TextField, Typography } from "@mui/material"

// import dari lib validate
import isEmail from "validator/lib/isEmail"

// import dari firebase hook
import { useFirebase } from "../../components/FirebaseProvider"

// import dari react-router-dom
// import { Link, Redirect } from "react-router-dom"

function Registrasi() {
  const [form, setFrom] = useState({
    email: "",
    password: "",
    ulangi_password: "",
  })

  const [error, setError] = useState({
    email: "",
    password: "",
    ulangi_password: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const { auth, user, loading } = useFirebase()

  const handleChange = (e) => {
    setFrom({
      ...form,
      [e.target.name]: e.target.value,
    })

    setError({
      ...error,
      [e.target.name]: "",
    })
  }

  const validate = () => {
    const newError = { ...error }

    if (!form.email) {
      newError.email = "Email wajib diisi!!"
    } else if (!isEmail(form.email)) {
      newError.email = "Email tidak valid!!"
    }

    if (!form.password) {
      newError.password = "Password wajib diisi!!"
    }

    if (!form.ulangi_password) {
      newError.ulangi_password = "Ulangi Password wajib diisi!!"
    } else if (form.ulangi_password !== form.password) {
      newError.ulangi_password = "Password tidak sama!!"
    }

    return newError
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const findErrors = validate()
    if (Object.values(findErrors).some((err) => err !== "")) {
      setError(findErrors)
    } else {
      try {
        setIsSubmitting(true)

        await auth.createUserWithEmailAndPassword(form.email, form.password)
      } catch (e) {
        const newError = {}

        switch (e.code) {
          case "auth/email-already-in-use":
            newError.email = "Email sudah terdaftar"
            break

          case "auth/invalid-email":
            newError.email = "Email tidak valid!"
            break

          case "auth/weak-password":
            newError.password = "Passwor terlalu lemah"
            break

          case "auth/operation-not-allowed":
            newError.email = "Metode email dan password tidak didukung"
            break
          default:
            newError.eamil = "Terjadi kesalah silahkan coba lagi"
            break
        }

        setError(newError)
        setIsSubmitting(false)
      }
    }
  }

  if (loading) {
    return <h1>Loading...</h1>
  }

  // if (user) {
  //   return <Redirect to='/' push component={Link} />
  // }

  return (
    <Container maxWidth='xs'>
      <Paper style={{ padding: "20px", marginTop: "60px" }}>
        <Typography style={{ color: "black", justifyContent: "center", display: "flex" }} variant='h5' component='h1'>
          Buat Akun Baru
        </Typography>
        <form onSubmit={handleSubmit} noValidate>
          <TextField
            id='email'
            type='email'
            name='email'
            margin='normal'
            variant='standard'
            label='Alamat Email'
            value={form.email}
            onChange={handleChange}
            helperText={error.email}
            error={error.email ? true : false}
            disabled={isSubmitting}
            fullWidth
            required
          />

          <TextField
            id='password'
            type='password'
            name='password'
            margin='normal'
            variant='standard'
            label='Password'
            value={form.password}
            onChange={handleChange}
            helperText={error.password}
            error={error.password ? true : false}
            disabled={isSubmitting}
            fullWidth
            required
          />

          <TextField
            id='ulangi_password'
            type='password'
            name='ulangi_password'
            margin='normal'
            variant='standard'
            label='Ulangi Password'
            value={form.ulangi_password}
            helperText={error.ulangi_password}
            onChange={handleChange}
            error={error.ulangi_password ? true : false}
            disabled={isSubmitting}
            fullWidth
            required
          />

          <Grid container style={{ paddingTop: "50px" }}>
            <Grid item xs>
              <Button disabled={isSubmitting} type='submit' color='primary' variant='contained' size='large'>
                Daftar
              </Button>
            </Grid>
            <Grid item style={{ color: "gray" }}>
              <Button variant='outlined' size='large'>
                <a href='/login'>Login</a>
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Registrasi

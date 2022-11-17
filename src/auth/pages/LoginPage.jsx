import { useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link as RouteLink } from "react-router-dom"

import { Google } from "@mui/icons-material"
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"

import { useForm } from "../../hooks"
import { checkingAuthentication, startGoogleSignIn, startLoginWithEmailPassword } from "../../store/auth/thunks"
import { AuthLayout } from "../layout/AuthLayout"

const formData = {
  email: '', 
  password: ''
}

export const LoginPage = () => {

  const { status, errorMessage   } = useSelector( state => state.auth );

  const dispatch = useDispatch();

  const { email, password, onInputChange, formState } = useForm(formData);

  const isAuthenticating = useMemo(() => status === 'checking', [status])

  const onSubmit = ( event ) => {
    event.preventDefault();
    // this isn't the dispatch action
    dispatch( startLoginWithEmailPassword( formState ));
  };

  const onGoogleSignIn = () => {
    dispatch( checkingAuthentication() );
    dispatch( startGoogleSignIn() );
  }
  

  return (

    <AuthLayout title="Login">
      <form onSubmit={ onSubmit }
            className='animate__animated animate__fadeIn animate__faster'
            >
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Email"
              type="email"
              placeholder="correo@correo.com"
              fullWidth
              name="email"
              value={ email }
              onChange={ onInputChange }
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Password"
              type="password"
              placeholder="Password"
              fullWidth
              name="password"
              value={ password }
              onChange={ onInputChange }
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>

            <Grid 
              item 
              xs={12}
              display={ !!errorMessage ? '': 'none'} >
              <Alert severity="error">{ errorMessage }</Alert>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button
                disabled={ isAuthenticating } 
                type="submit" 
                variant="contained" 
                fullWidth>
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                disabled={ isAuthenticating } 
                variant="contained" 
                fullWidth
                onClick={ onGoogleSignIn }
                >
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction='row' justifyContent='end'>
            <Link component={RouteLink} color='inherit' to='/auth/register'>
              Create an account
            </Link>
          </Grid>

        </Grid>

      </form>
    </AuthLayout>
  )
}

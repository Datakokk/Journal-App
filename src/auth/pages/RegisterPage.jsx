import { Link as RouteLink } from "react-router-dom"
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout"
import { useForm } from "../../hooks"
import { useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { startCreatingUserWithEmailPassword } from "../../store/auth/thunks"
import { clearDeleteMessage } from "../../store/auth"

const formData = {
  email: '',
  password: '',
  displayName: ''
}

const formValidations = {
  email: [ (value) => value.includes('@'), 'The mail must have a @'],
  password: [ (value) => value.length >= 6, 'The password must have more than 6 letters'],
  displayName: [ (value) => value.length>=1, 'Name is required']
}


export const RegisterPage = () => {

  const dispatch = useDispatch();

  const [formSubmitted, setFormSubmitted] = useState(false);

  const { status, errorMessage } = useSelector( state => state.auth );

  const isCheckingAuthentication = useMemo(() => status === 'checking', [status])

  const { 
    formState, displayName, email, password, onInputChange,
    isFormValid, displayNameValid, emailValid, passwordValid  
  } = useForm(formData, formValidations);

  const onSubmit = ( event ) => {
    event.preventDefault();
    setFormSubmitted(true)

    if( !isFormValid ) return;
      dispatch( startCreatingUserWithEmailPassword(formState) )
  }

  const onDeleteMessage = () => {
    dispatch( clearDeleteMessage());
  }
   
  return (

    <AuthLayout title="Sign up">
      {/* <h1>FormValid { isFormValid ? 'Valid' : 'No Valid'}</h1> */}
      <form onSubmit={ onSubmit }
            className='animate__animated animate__fadeIn animate__faster'
      >
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Your name"
              type="text"
              placeholder="your name"
              fullWidth
              name="displayName"
              value={ displayName }
              onChange= { onInputChange }
              error= {!!displayNameValid && formSubmitted}
              helperText={ displayNameValid }
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Email"
              type="email"
              placeholder="correo@correo.com"
              fullWidth
              name="email"
              value={ email }
              onChange= { onInputChange }
              error= { !!emailValid && formSubmitted }
              helperText={ emailValid }
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
              onChange= { onInputChange }
              error= { !!passwordValid && formSubmitted }
              helperText={ passwordValid }
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            
            <Grid 
              item 
              xs={12}
              display={ !!errorMessage ? '': 'none'} >
              <Alert severity="error">{ errorMessage }</Alert>
            </Grid>

            <Grid item xs={12} >
              <Button 
                disabled={ isCheckingAuthentication }
                type="submit"
                variant="contained" 
                fullWidth>
                Sign up
              </Button>
            </Grid>
          </Grid>

          <Grid container direction='row' justifyContent='end'>
            <Typography sx={{ mr: 1 }}>Do you have an account?</Typography>
            <Link 
              onClick={ onDeleteMessage }
              component={RouteLink} 
              color='inherit' 
              to='/auth/login'>
             Login
            </Link>
          </Grid>

        </Grid>

      </form>
    </AuthLayout>
  )
}

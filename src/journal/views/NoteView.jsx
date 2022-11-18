import { useEffect, useMemo, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"

import { SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.css'

import { useForm } from "../../hooks/useForm"
import { ImageGallery } from "../components"
import { setActiveNote, startSaveNote } from "../../store"

export const NoteView = () => {

    const dispatch = useDispatch();

    const { active: note, messageSaved, isSaving } = useSelector( state => state.journal );
    
    const { title, body, date, onInputChange, formState } = useForm( note );

    useEffect(() => {
      dispatch( setActiveNote( formState ) );
    }, [ formState ]);
    
    useEffect(() => {
      if( messageSaved.length > 0 )
            Swal.fire('Updated note', messageSaved, 'success');

    }, [messageSaved])
    
    const fileInputRef = useRef();

    const dateString = useMemo(() => {
        return  new Date( date ).toUTCString().slice( 0, -3 );
        // return newDate.toUTCString().slice(0,-3)
    }, [date])
    
    const onSaveNote = () => {
        dispatch( startSaveNote() );
    }

    const onFileInputChange = ({ target }) => {
        if( target.files === 0 ) return;

        console.log('Upload file....')
        // dispatch( starUploadingFiles( target.files ))
    }
    

  return (
    <Grid 
        container 
        direction='row' 
        justifyContent='space-between' 
        alignItems='center' sx={{ mb: 1 }} 
        className='animate__animated animate__fadeIn animate__faster'
    >
        <Grid item>
            <Typography fontSize={ 39 } fontWeight='light'>{ dateString }</Typography>
        </Grid>
        <Grid item>
            <input
                type='file'
                multiple
                ref={ fileInputRef }
                onChange={ onFileInputChange }
                style={{ display: 'none' }}
            />

            <IconButton
                color="primary"
                disabled={ isSaving }
                onClick={ ()=> fileInputRef.current.click() }
            >
                <UploadOutlined />
            </IconButton>
            <Button
                disabled={ isSaving } 
                onClick={ onSaveNote }
                color="primary" 
                sx={{ padding: 2 }}>
                <SaveOutlined sx={{ fontSize: 30, mr: 1 }}/>
                Save
            </Button>
        </Grid>

        <Grid container>
            <TextField 
                type='text'
                variant="filled"
                fullWidth
                placeholder="Add a title"
                label="Title"
                sx={{ border: 'none', mb: 1 }}
                name='title'
                value={ title }
                onChange={ onInputChange }
            />

            <TextField 
                type='text'
                variant="filled"
                fullWidth
                multiline
                placeholder="What happened todaydd a title"
                minRows={ 5 }
                name='body'
                value={ body }
                onChange={ onInputChange }
            />
        </Grid>

        <ImageGallery />

    </Grid>
    
  )
}

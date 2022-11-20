import { useMemo } from "react"
import { useDispatch } from "react-redux"
import { TurnedInNot } from "@mui/icons-material"
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { setActiveNote } from "../../store/journal/journalSlice"

export const SideBarIten = ({ title='', body, id , date, imagenUrls }) => {

    const dispatch = useDispatch();

    const newTitle = useMemo(() => title.length > 17
                                    ? title.substring(0,17)+'...'
                                    : title
                            , [title])

    const onClickNote = () => {
        dispatch( setActiveNote({ title, body, id , date, imagenUrls }) );
    }

  return (
    <ListItem disablePadding>
        <ListItemButton onClick={ onClickNote }>
            <ListItemIcon>
                <TurnedInNot />
            </ListItemIcon>
            <Grid container>
                <ListItemText primary={ newTitle }/>
                <ListItemText secondary={ body }/>
            </Grid>
        </ListItemButton>
    </ListItem>
  )
}

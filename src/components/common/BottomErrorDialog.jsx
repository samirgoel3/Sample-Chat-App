import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { actions } from '../../states/actions';
import { Typography, Grid } from '@mui/material';
import ICONS from '../../constants/Icons';

export default function BottomErrorDialog() {

  const stateData = useSelector(state => state)
  const dispatch = useDispatch()

  return (
    <React.Fragment >
      <Drawer
        anchor='bottom'
        open={stateData.errorDialogData.show}
        onClose={() => { dispatch(actions.ErrorDialogActions.clearError()) }}
      >
        <Grid container padding={3}>
          <Grid container>
            <Grid item flex={1}>
              <Typography variant='h4' sx={{ display: 'flex', flex: 1 }}> {stateData.errorDialogData.header}</Typography>
            </Grid>
            <Grid item>
              <ICONS.CLOSE size={30} color={'red'} onClick={()=>{ dispatch(actions.ErrorDialogActions.clearError())  }}/>
            </Grid>
          </Grid>

          <Typography variant='subtitle1' sx={{ marginTop: 2 }}> {stateData.errorDialogData.description}</Typography>
        
        </Grid>
      </Drawer>
    </React.Fragment>

  );
}
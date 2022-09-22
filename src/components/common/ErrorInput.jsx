import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from '@mui/material'
import React from 'react'
import ICONS from '../../constants/Icons'


export default function ErrorInput({label, type, error, ...props}) {

    const [showPassword, setShowPassword] = React.useState(false)



    return (
        <FormControl className='form-controller' variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
            <OutlinedInput
                id="outlined-adornment-password"
                type={type =='password'? showPassword ? 'text' : 'password' : 'text'}
                {...props}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => { setShowPassword(!showPassword) }}
                            edge="end">
                            { type == 'password' ?   showPassword ? <ICONS.OPEN_EYE_ICON /> : <ICONS.CLOSE_EYE_ICON /> : null }
                        </IconButton>
                    </InputAdornment>
                }
                label="Password"
            />
            <Typography color={'error'} sx={{fontSize:12, marginBottom:3}} >{error}</Typography>
        </FormControl>
    )
}
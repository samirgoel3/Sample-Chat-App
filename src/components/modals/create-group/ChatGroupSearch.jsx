import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import { Avatar, TextField, Typography, Grid, CircularProgress } from '@mui/material';
import * as React from 'react';
import Services from '../../../network/services';
import { actions } from '../../../states/actions';






export default function ChatGroupSearch({onChange=()=>{}}) {

    const [value, setvalue] = React.useState("")
    const [loader, setLoader] = React.useState(false)
    const [searchedUsers, setSearchedusers] = React.useState([])

    const fetchSearchUserApi = async (key) => {
        setvalue(key)
        try {
            setLoader(true)
            const data = await Services.AuthenticationService.getSearchUsers(key)
            setLoader(false)
            if (!data) {
                dispatch(actions.ErrorDialogActions.showNoDataFromApi())
            } else {
                if (data.data.result === 1) {
                    setSearchedusers(data.data.response)
                }
                else {
                    onSearchError(data.data.message)
                }
            }
        } catch (e) {
            setLoader(false)
            dispatch(actions.ErrorDialogActions.showException(e.message))
        }
    }

    return (
        <Stack spacing={3} sx={{ width: '100%' }}>
            <Autocomplete
                multiple
                id="tags-outlined"
                options={searchedUsers}
                getOptionLabel={(option) => option.username}
                // defaultValue={[top100Films[1]]}
                filterSelectedOptions
                loading={loader}
                disableCloseOnSelect={false}
                onChange={onChange}
                loadingText={'fetching users... '}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search User"
                        placeholder="Search User"
                        onChange={(e)=>{fetchSearchUserApi(e.target.value)}}
                        value={value}
                    />
                )}
            />
        </Stack>
    );
}


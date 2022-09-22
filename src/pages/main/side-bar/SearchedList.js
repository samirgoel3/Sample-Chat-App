import { Avatar, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import COLORS from '../../../constants/Colors';
import { dispatch as busDispatch } from 'use-bus'




const getItem = (element, position, onElementSelected) => {
    return (
        <Grid key={position} item sx={{ display: 'flex', padding: '0px 7px', justifyContent: 'flex-start', alignItems: 'center', height: 60, width: '100%', backgroundColor: COLORS.PRIMARY_LIGHT }}
            direction={'row'} onClick={()=>{ 
                
                busDispatch({type:'SELECT-ITEM-FROM-SEARCH-USER'})
                onElementSelected(element)}}
                >
            <Avatar sx={{ width: 30, height: 30 }}
                src={element.image}
            />
            <Grid container direction={'column'} sx={{ marginLeft: 1 }}>
                <Typography sx={{ color: 'white', fontWeight: 700, fontSize: 13 }}>{element.username}</Typography>
                <Typography sx={{ color: 'white', fontWeight: 400, fontSize: 11 }}>{element.email}</Typography>
            </Grid>
        </Grid>
    )
}




export default function SearchedList({ searchedData, error, onElementSelected }) {
    const [windowSize, setWindowSize] = useState(getWindowSize())

    useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowSize());
        }

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);


    return (
        <Grid container sx={{ height: '100%' }} direction={'column'}>
            {error ==  null ?
                <div style={{ height: windowSize.innerWidth < 900 ? (windowSize.innerHeight - 105) : (windowSize.innerHeight - 156), overflowY: 'scroll' }}>
                    {
                        searchedData.map((e, i) => getItem(e, i, onElementSelected))
                    }
                </div> :
                <Typography textAlign={'center'} color={'white'}>{error}</Typography>
            }
        </Grid>
    )
}

function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
}
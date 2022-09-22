import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import COLORS from '../../../constants/Colors';
import useBus from 'use-bus'
import { useDispatch, useSelector } from 'react-redux';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function TabsBar({  onTabSelected = ()=>{}}) {
    const stateData = useSelector(state => state)

    // useBus('SLIDE-TAB-TO-FIRST',()=>{ 
    //     setValue(0)
    // })

    const handleChange = (event, newValue) => {
        onTabSelected(newValue)
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: COLORS.PRIMARY_DARK }}>
                <Tabs
                    value={stateData.selectorData.selected_tab}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    textColor="secondary"
                    centered={true}
                    TabIndicatorProps={{ style: { background: "#fff" } }}
                    indicatorColor="secondary">
                    <Tab label="Recent" {...a11yProps(0)} />
                    <Tab label="Groups" {...a11yProps(1)} />
                    <Tab label="All Users" {...a11yProps(2)} />
                </Tabs>
            </Box>

        </Box>
    );
}

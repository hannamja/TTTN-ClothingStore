import React from 'react'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './WarehouseTabs.scss'
import Warehouse from '../../components/Warehouse/Warehouse';
import BrandList from '../../components/BrandList/BrandList';
import TypeList from '../../components/TypeList/TypeList';
import MaterialList from '../../components/MaterialList/MaterialList';

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
const WarehouseTabs = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div className='wareHouseTabs'>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Warehouse" {...a11yProps(0)} />
                        <Tab label="Brands" {...a11yProps(1)} />
                        <Tab label="Materials" {...a11yProps(2)} />
                        <Tab label="Types" {...a11yProps(3)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <Warehouse />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <BrandList />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <MaterialList />
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <TypeList />
                </TabPanel>
            </Box>
        </div>
    )
}

export default WarehouseTabs
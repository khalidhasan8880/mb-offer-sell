import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import OfferCard from './OfferCard';
 function TabPanel({children, value, index }) {
 

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTab({internet, minute, combo, className}) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} className={`${className}` } onChange={handleChange} aria-label="basic tabs example">
          <Tab className={`bg-red-400`} label="Internet" {...a11yProps(0)} />
          <Tab className={`bg-red-400`} label="Minute" {...a11yProps(1)} />
          <Tab className={`bg-red-400`} label="Combo" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {internet?.map(offer => <OfferCard key={offer?._id} offer={offer}></OfferCard>)}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {minute?.map(offer => <OfferCard key={offer?._id} offer={offer}></OfferCard>)}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {combo?.map(offer => <OfferCard key={offer?._id} offer={offer}></OfferCard>)}
      </TabPanel>
    </Box>
  );
}

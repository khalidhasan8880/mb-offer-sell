import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import BalanceHistory from './BalanceHistory/BalanceHistory';
import WithdrawHistory from './WithdrawHistory/WithdrawHistory';

export default function Transaction() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  function TabPanel({ children, value, index }) {
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
  
 

  // Render tabs for larger screens
  return (
    <section>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
         
            <Tab label="Added Balances" />
            <Tab label="Deposit Balances" />
          </Tabs>
        </Box>
       
        <TabPanel value={value} index={0}>
         <BalanceHistory></BalanceHistory>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <WithdrawHistory></WithdrawHistory>
        </TabPanel>
      </Box>
    </section>
  );
}














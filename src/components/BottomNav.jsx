import { useState } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Home from '@mui/icons-material/Home';
import { styled } from '@mui/system';
import { History } from '@mui/icons-material';

const StyledBottomNavigation = styled(BottomNavigation)({
  width: '100%',
  position: 'fixed',
  bottom: 0,
  backgroundColor: '#555', // Updated background color to match the suggested color scheme
  zIndex: (theme) => theme.zIndex.appBar + 1,
});

const StyledBottomNavigationAction = styled(BottomNavigationAction)(() => ({
  color: '#ccc',
  transition: '0.3s',
  '&.Mui-selected': {
    color: '#FFD700',
    backgroundColor: '#444', 
  },
  '&:hover': {
    backgroundColor: '#444',
  },
}));

export default function BottomNav() {
  const [value, setValue] = useState('home');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <StyledBottomNavigation value={value} onChange={handleChange}>
      <StyledBottomNavigationAction
        label="Home"
        value="home"
        icon={<Home />}
      />
      <StyledBottomNavigationAction
        label="History"
        value="history"
        icon={<History />}
      />
      
      
    </StyledBottomNavigation>
  );
}

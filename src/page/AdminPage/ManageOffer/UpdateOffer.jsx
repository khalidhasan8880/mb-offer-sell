import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Autocomplete, Box, Button, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import api from '../../../hooks/interceptors';
import useAuth from '../../../hooks/useAuth';

const UpdateOffer = ({ offer }) => {
  const [division, setDivision] = useState('');
  const [offerType, setOfferType] = useState('');
  const [selectedOperator, setSelectedOperator] = useState('');
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    offerName: '',
    price: '',
    note: '',
  });

  useEffect(() => {
    if (offer) {
      setDivision(offer.division || ''); 
      setOfferType(offer.offerType || ''); 
      setSelectedOperator(offer.operator || ''); 
      setFormData({
        offerName: offer.offerName || '', 
        price: offer.price || '', 
        note: offer.note || '', 
      });
    }
  }, [offer]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const divisions = [
    { name: "All Division" },
    { name: "Dhaka" },
    { name: "Chattogram" },
    { name: "Rajshahi" },
    { name: "Khulna" },
    { name: "Barishal" },
    { name: "Sylhet" },
    { name: "Rangpur" },
    { name: "Mymensingh" },
  ];
console.log(offer);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/update-offer/${offer?._id}?email=${user?.email}`, {
        division,
        offerName: formData.offerName || '',
        offerType: offerType || '', 
        operator: selectedOperator || '',
        price: formData.price || '', 
        note: formData.note || '', 
      }).then(res=>{
        console.log(res);
      })

    } catch (error) {
      console.error('Error updating offer:', error);
    }
  };
  console.log(divisions.find(d=> d.name === division));
  return (
    <form className="p-4 space-y-4" onSubmit={handleSubmit}>
      <TextField
        required
        label="Offer Name"
        variant="outlined"
        fullWidth
        name="offerName"
       
        value={formData.offerName}
        onChange={handleInputChange}
      />
      
      <FormControl fullWidth variant="outlined">
        <InputLabel id="operator-label">Select Operator</InputLabel>
        <Select
          labelId="operator-label"
          id="operator"
          label="Select Operator"
          value={selectedOperator}
          onChange={(e) => setSelectedOperator(e.target.value)}
        >
           <MenuItem value="">Select an operator</MenuItem>
          <MenuItem value="gp">GP</MenuItem>
          <MenuItem value="bl">BL</MenuItem>
          <MenuItem value="airtel">Airtel</MenuItem>
          <MenuItem value="robi">Robi</MenuItem>
          <MenuItem value="teletalk">Teletalk</MenuItem>
        </Select>
      </FormControl>
      <RadioGroup
        row
        name="operator"
        value={offerType}
        onChange={(e) => setOfferType(e.target.value)}>
        <FormControlLabel value="internet" control={<Radio />} label="Internet" />
        <FormControlLabel value="minute" control={<Radio />} label="Minute" />
        <FormControlLabel value="combo" control={<Radio />} label="Combo" />    
      </RadioGroup>
      <Autocomplete
  id="country-select-demo"
  sx={{ width: 300 }}
  options={divisions}
  autoHighlight
  getOptionLabel={(option) => option.name}
  value={divisions.find((item) => item.name === division) || null}
  
  onChange={(event, newValue) => {
    setDivision(newValue ? newValue.name : ''); // Handle undefined case here
  }}
  renderOption={(props, option) => (
    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
      {option?.name}
    </Box>
  )}
  renderInput={(params) => (
    <TextField
      {...params}
      label="Choose a country"
      inputProps={{
        ...params.inputProps,
        autoComplete: 'new-password',
      }}
    />
  )}
/>


<TextField
  required
  label="Price"
  variant="outlined"
  fullWidth
  name="price"
  defaultValue={offer?.price}
  value={formData.price}
  onChange={handleInputChange}
/>

<TextField
  label="Note"
  variant="outlined"
  fullWidth
  name="note"
  multiline
  rows={4}
  defaultValue={offer?.note}
  value={formData.note}
  onChange={handleInputChange}
/>

      <Button variant="contained" type="submit" color="primary">
        Update Offer
      </Button>
    </form>
  );
};

export default UpdateOffer;

import { useEffect, useState } from 'react';
import api from '../../../hooks/interceptors';
import Loading from '../../../components/Loading';
import ResponsiveTable from '../../../components/ResponsiveTable';

const ManageUser = () => {
    const [ users ,setUsers] = useState([])
    const [getUserLoading, setGetUserLoading] = useState(true)
    useEffect(()=>{
        api.get('users')
        .then(res=> {
            
            setUsers(res?.data)
            setGetUserLoading(false)
        })

    }, [])
    console.log(users);
    if (getUserLoading ) {
        return <Loading></Loading>
    }
    return (
        <section>
          <ResponsiveTable></ResponsiveTable>
        </section>
    );
};

export default ManageUser;















// import  { useState } from 'react';
// import TextField from '@mui/material/TextField';
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import InputLabel from '@mui/material/InputLabel';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
// import { Autocomplete, Box , Button } from '@mui/material';

// const AddOffer = () => {
//   const [division, setDivision] = useState(null);
//   const [selectedOperator, setSelectedOperator] = useState('');

//   const divisions = [
//     { name: 'All Division' },
//     { name: 'Dhaka' },
//     { name: 'Chattogram' },
//     { name: 'Rajshahi' },
//     { name: 'Khulna' },
//     { name: 'Barishal' },
//     { name: 'Sylhet' },
//     { name: 'Rangpur' },
//     { name: 'Mymensingh' }
//   ];

//   const [formData, setFormData] = useState({
//     offerName: '',
//     price: '',
//     note: ''
//   });

//   const handleInputChange = (e) => {
//     if (!division && selectedOperator === '') {
//       return alert('fill all')
//     }
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });

//     console.log(formData);
//     console.log(division);
//   };

//   return (
//     <form className="p-4 space-y-4">
//       <TextField
//         required
//         label="Offer Name"
//         variant="outlined"
//         fullWidth
//         name="offerName"
//         value={formData.offerName}
//         onChange={handleInputChange}
//       />
      


//       <Autocomplete
//         id="country-select-demo"
//         sx={{ width: 300 }}
//         options={divisions}
//         autoHighlight
//         getOptionLabel={(option) => option.name}
//         onChange={(event, newValue) => {
//           setDivision(newValue);
//         }}
//         renderOption={(props, option) => (
//           <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
//             {option?.name}
//           </Box>
//         )}
//         renderInput={(params) => (
//           <TextField
//             {...params}
//             label="Choose a country"
//             inputProps={{
//               ...params.inputProps,
//               autoComplete: 'new-password', // disable autocomplete and autofill
//             }}
//           />
//         )}
//       />

//       <TextField
//         label="Price"
//         variant="outlined"
//         fullWidth
//         name="price"
//         value={formData.price}
//         onChange={handleInputChange}
//       />
//       <TextField
//         label="Note"
//         variant="outlined"
//         fullWidth
//         name="note"
//         multiline
//         rows={4}
//         value={formData.note}
//         onChange={handleInputChange}
//       />

// <Button variant="contained" type="submit" color="primary">
//         Submit
//       </Button>
//     </form>
//   );
// };

// export default AddOffer;

import { useState } from "react";
import TextField from "@mui/material/TextField";
import { Autocomplete, Box, Button } from "@mui/material";
import Alert from '@mui/material/Alert';
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import api from "../../../hooks/interceptors";
import useAuth from "../../../hooks/useAuth";

const AddOffer = () => {
  const {user} = useAuth()
  const [division, setDivision] = useState(null);
  const [offerType, setOfferType] = useState("");
  const [alertMessage, setAlertMessage] = useState(null);
  const [selectedOperator, setSelectedOperator] = useState("");
  const [formErrors, setFormErrors] = useState({
    offerName: false,
    price: false,
    operator: false,
  });

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

  const [formData, setFormData] = useState({
    offerName: "",
    price: "",
    note: "",
  });

  const initialFormData = {
    offerName: "",
    price: "",
    note: "",
  };
  const resetForm = () => {
    setFormData(initialFormData);
    setSelectedOperator("");
    setDivision(null);
    setFormErrors({
      offerName: false,
      price: false,
      note: false,
      operator: false,
    });
    setAlertMessage(null);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Reset error for the current field on input change
    setFormErrors({ ...formErrors, [name]: false });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form fields
    const errors = {};
    if (!formData.offerName) {
      errors.offerName = true;
    }
    if (!formData.price) {
      errors.price = true;
    }
    if (!selectedOperator) {
      errors.operator = true;
    }
    if (!offerType) {
      errors.operator = true;
    }
    if (!division) {
      errors.operator = true;
    }

    if (Object.keys(errors).length === 0) {
      // Form is valid, proceed with form submission or further actions
      const postData = {
        offerName: formData.offerName,
        operator: selectedOperator,
        division: division ? division.name : null,
        offerType,
        price: formData.price,
        note: formData.note,
      };

      api
        .post(`/add-offer?email=${user?.email}`, postData)
        .then(() => {
          setAlertMessage(<Alert className="" severity="success">Successfully Added</Alert>);
          setTimeout(() => {
            setAlertMessage(null);
          }, 4000);
          resetForm()
        })
        .catch((error) => {
          console.error("Error:", error);
          setAlertMessage(<Alert severity="error">Error.</Alert>);
          setTimeout(() => {
            setAlertMessage(null);
          }, 4000);
        });
    } else {
      // Form is not valid, display error messages or handle errors as needed
      setFormErrors(errors);
      alert('Fill all input')
    }
  };

  return (
    <section>
     {alertMessage}
      <form className="p-4 space-y-4" onSubmit={handleSubmit}>
     

      <TextField
        required
        label="Offer Name"
        variant="outlined"
        fullWidth
        name="offerName"
        value={formData.offerName}
        onChange={handleInputChange}
        error={formErrors.offerName}
        helperText={formErrors.offerName && "Offer name is required"}
      />

 

      <RadioGroup
        row
        name="operator"
        value={selectedOperator}
        onChange={(e) => setSelectedOperator(e.target.value)}>
        <FormControlLabel value="grameenphone" control={<Radio />} label="Grameenphone" />
        <FormControlLabel value="banglalink" control={<Radio />} label="Banglalink" />
        <FormControlLabel value="airtel" control={<Radio />} label="Airtel" />
        <FormControlLabel value="robi" control={<Radio />} label="Robi" />
        <FormControlLabel
          value="teletalk"
          control={<Radio />}
          label="Teletalk"
        />
      </RadioGroup>
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
        sx={{ width: 300 }}
        options={divisions}
        autoHighlight
        getOptionLabel={(option) => option.name}
        onChange={(event, newValue) => {
          setDivision(newValue);
        }}
        renderOption={(props, option) => (
          <Box
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...props}>
            {option?.name}
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Choose a division"
            inputProps={{
              ...params.inputProps,
              autoComplete: "new-password", // disable autocomplete and autofill
            }}
            error={formErrors.division}
          />
        )}
      />

      <TextField
        required
        label="Price"
        variant="outlined"
        fullWidth
        name="price"
        value={formData.price}
        onChange={handleInputChange}
        error={formErrors.price}
        helperText={formErrors.price && "Price is required"}
      />
      <TextField
        label="Note"
        variant="outlined"
        fullWidth
        name="note"
        multiline
        rows={4}
        value={formData.note}
        onChange={handleInputChange}
        error={formErrors.note}
        helperText={formErrors.note && "Note is required"}
      />

      <Button variant="contained" type="submit" color="primary">
        Submit
      </Button>

    </form>
    </section>
  );
};

export default AddOffer;

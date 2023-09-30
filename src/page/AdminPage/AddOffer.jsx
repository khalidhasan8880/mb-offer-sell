import { useState } from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { Autocomplete, Box, Button } from "@mui/material";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import MenuItem from "@mui/material/MenuItem";
import api from "../../hooks/interceptors";

const AddOffer = () => {
  const [division, setDivision] = useState(null);
  const [selectedOperator, setSelectedOperator] = useState("");
  const [formErrors, setFormErrors] = useState({
    offerName: false,
    price: false,
    note: false,
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
    if (!formData.note) {
      errors.note = true;
    }
    if (!selectedOperator) {
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
        division: division ? division.name : null, // Assuming division is an object with a `name` property
        price: formData.price,
        note: formData.note,
      };

      api
        .post("/add-offer", postData)
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      // Form is not valid, display error messages or handle errors as needed
      setFormErrors(errors);
      alert('Fill all input')
    }
  };

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
        error={formErrors.offerName}
        helperText={formErrors.offerName && "Offer name is required"}
      />

      <FormControl fullWidth variant="outlined">
        <InputLabel id="operator-label">Select Operator</InputLabel>
        <Select
          labelId="operator-label"
          id="operator"
          label="Select Operator"
          value={selectedOperator}
          onChange={(e) => setSelectedOperator(e.target.value)}>
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
        value={selectedOperator}
        onChange={(e) => setSelectedOperator(e.target.value)}>
        <FormControlLabel value="gp" control={<Radio />} label="GP" />
        <FormControlLabel value="bl" control={<Radio />} label="BL" />
        <FormControlLabel value="airtel" control={<Radio />} label="Airtel" />
        <FormControlLabel value="robi" control={<Radio />} label="Robi" />
        <FormControlLabel
          value="teletalk"
          control={<Radio />}
          label="Teletalk"
        />
      </RadioGroup>

      <Autocomplete
        id="country-select-demo"
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
            label="Choose a country"
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
  );
};

export default AddOffer;

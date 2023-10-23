import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import useAuth from "../../hooks/useAuth";
import { green, blueGrey } from "@mui/material/colors";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user.displayName || "");
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || "");
  const [pin, setPin] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);


  const handleAvatarChange = (e) => {
  };


  const handleUpdateProfile = () => {
    user
      .updateProfile({
        displayName: name,
        phoneNumber: phoneNumber,
        // other profile fields
      })
      .then(() => {
        setIsEditMode(false); // Exit edit mode after updating profile
        // Profile updated successfully
      })
      .catch((error) => {
        // Handle error
      });
  };

  return (
    <div className="flex flex-col items-center p-8 space-y-4 border rounded-lg shadow-lg">
       <Avatar
            sx={{ bgcolor: green[500], width: 129, height: 129 }}
            className="mr-3">
            {user?.displayName ? (
              user.displayName.charAt(0)
            ) : (
              <PersonIcon sx={{ color: blueGrey[50] ,width: 129, height: 129}}></PersonIcon>
            )}
          </Avatar>

      

      <TextField
        label="Name"
        variant={isEditMode ? "outlined" : "standard"}
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        disabled={!isEditMode}
        className="mb-4"
      />

      <TextField
        label="Phone Number"
        variant={isEditMode ? "outlined" : "standard"}
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        fullWidth
        disabled={!isEditMode}
        className="mb-4"
      />

      <TextField
        label="PIN"
        variant={isEditMode ? "outlined" : "standard"}
        type="password"
        value={pin}
        onChange={(e) => setPin(e.target.value)}
        fullWidth
        disabled={!isEditMode}
        className="mb-4"
      />

      {isEditMode ? (
        <Button
          variant="contained"
          color="primary"
          startIcon={<SaveIcon />}
          onClick={handleUpdateProfile}
        >
          Save
        </Button>
      ) : (
        <Button
          variant="outlined"
          color="primary"
          startIcon={<EditIcon />}
          onClick={() => setIsEditMode(true)}
        >
          Edit Profile
        </Button>
      )}
    </div>
  );
};

export default Profile;

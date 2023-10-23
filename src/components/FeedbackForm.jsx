import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const FeedbackForm = ({handleFeedbackFormSubmit}) => {
  const [feedback, setFeedback] = useState('');

  

  return (
    <div className="container mx-auto mt-10 p-6 bg-gray-100 rounded-md shadow-lg max-w-md">
      <h2 className="text-2xl font-semibold mb-4">Feedback</h2>
      <form onSubmit={handleFeedbackFormSubmit}>
        <TextField
        required
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          label="Feedback"
          name='feedback'
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="mb-4"
        />
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default FeedbackForm;

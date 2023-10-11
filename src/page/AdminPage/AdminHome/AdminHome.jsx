
import { Card, CardContent, Typography, Grid } from '@mui/material';
import 'tailwindcss/tailwind.css';

const AdminHome = () => {
  return (
    <div className="container mx-auto p-4">
      <Grid container spacing={3}>
        {/* Statistics Card 1 */}
        <Grid item xs={12} sm={6} md={3}>
          <Card className="bg-blue-500 text-white">
            <CardContent>
              <Typography variant="h6">Total Users</Typography>
              <Typography variant="h4">1,234</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Statistics Card 2 */}
        <Grid item xs={12} sm={6} md={3}>
          <Card className="bg-green-500 text-white">
            <CardContent>
              <Typography variant="h6">Active Users</Typography>
              <Typography variant="h4">789</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Statistics Card 3 */}
        <Grid item xs={12} sm={6} md={3}>
          <Card className="bg-orange-500 text-white">
            <CardContent>
              <Typography variant="h6">Revenue</Typography>
              <Typography variant="h4">$50,000</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Statistics Card 4 */}
        <Grid item xs={12} sm={6} md={3}>
          <Card className="bg-red-500 text-white">
            <CardContent>
              <Typography variant="h6">New Orders</Typography>
              <Typography variant="h4">200</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default AdminHome;

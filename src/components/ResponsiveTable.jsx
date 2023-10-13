import { useState } from 'react';
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Modal,
  Backdrop,
  Fade,
} from '@mui/material';

const data = [
  { id: 1, name: 'Item 1', description: 'Description 1', price: 10 },
  { id: 2, name: 'Item 2', description: 'Description 2', price: 20 },
  // ... add more data as needed
];

const ResponsiveTable = () => {
  const [viewDetails, setViewDetails] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleViewDetails = (row) => {
    setViewDetails(row);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div className="container mx-auto py-8">
      <TableContainer component={Paper} className="shadow-lg">
        <Table className="min-w-full table-fixed">
          <TableHead className="bg-blue-500 text-white">
            <TableRow>
              <TableCell className="w-1/4">Name</TableCell>
              <TableCell className="w-1/4">Description</TableCell>
              <TableCell className="w-1/4 text-right">Price</TableCell>
              <TableCell className="w-1/4"></TableCell>
            </TableRow>
          </TableHead>
          <tbody>
            {data.map((row) => (
              <TableRow key={row.id} className="bg-gray-100 hover:bg-gray-200">
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell className="text-right">${row.price}</TableCell>
                <TableCell>
                  <Button onClick={() => handleViewDetails(row)} className="bg-blue-500 text-white px-4 py-2 rounded">
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </TableContainer>
     
     
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
              <h2 className="text-3xl font-bold mb-4">User Information</h2>
              <p className="text-lg mb-2"><strong>Name:</strong> {viewDetails?.name}</p>
              <p className="text-lg mb-2"><strong>Description:</strong> {viewDetails?.description}</p>
              <p className="text-lg mb-4"><strong>Price:</strong> ${viewDetails?.price}</p>
              <Button
                onClick={handleCloseModal}
                className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300"
              >
                Close
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default ResponsiveTable;

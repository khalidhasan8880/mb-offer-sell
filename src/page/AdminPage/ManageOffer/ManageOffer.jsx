import { useEffect, useState } from 'react';
import api from '../../../hooks/interceptors';
import Loading from '../../../components/Loading';
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from "@mui/icons-material/Edit";
import AlertModal from '../../../components/AlertModal';
import Modal from '../../../components/Modal';
import UpdateOffer from './UpdateOffer';
import useAuth from '../../../hooks/useAuth';


const ManageOffer = () => {
    const [ data ,setData] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
    const [getOfferLoading, setGetOfferLoading] = useState(true)
    const [viewDetails, setViewDetails] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
  const {user} = useAuth()
    
    const handleSearch = async () => {
      try {
        if (searchTerm) {
          const res = await api.post(`offer/search?email=${user?.email}`, { searchTerm });
          setData(res.data);
        } else {
          const res = await api.get(`offer/bl?email=${user?.email}`);
          setData(res?.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
  
useEffect(() => {
  api.get(`offer/bl?email=${user?.email}`)
    .then(res => {
      setGetOfferLoading(false);
      setData(res.data)
    });
}, [user]);

    const handleDelete = (row) => {
      setViewDetails(row);
      setIsAlertOpen(true);
    };
  
    const handleEdit = (row) => {
      setViewDetails(row)
      setIsModalOpen(true);
    };
  
    const handleAlertConfirm = () => {
      console.log("hello");
      // Perform deletion using Axios (replace the following line with your actual delete request)
      // api.delete(`/api/items/${viewDetails?._id}`)
      //   .then(response => {
      //     console.log('Item deleted successfully.');
      //   })
      //   .catch(error => {
      //     console.error('Error deleting item:', error);
      //   });
  
      // Close the alert and modal after successful deletion
      setIsAlertOpen(false);
    };
  
    const handleCancel = () => {
      setViewDetails(null);
      setIsAlertOpen(false);
      setIsModalOpen(false)
    };
 


   
  const RenderTableRows = () => {
    if (data.length === 0) {
      return <TableRow>No data found</TableRow>;
    }

    return data?.map((row) => (
      <TableRow key={row?._id} className="bg-gray-100 hover:bg-green-200">
        <TableCell className="font-extralight text-xs">
          {row?.offerName}
        </TableCell>
        <TableCell className="font-extralight text-xs">
          {row?.operator}
        </TableCell>
        <TableCell className="font-extralight text-xs text-right">
          ${row?.price}
        </TableCell>
    
        <TableCell className="font-extralight text-xs ">
          <div className="flex gap-5">
            <button onClick={() => handleEdit(row)}>
              <EditIcon />
            </button>
            <button onClick={() => handleDelete(row?.id, row)}>
              <DeleteIcon />
            </button>
          </div>
        </TableCell>
      </TableRow>
    ));
  };

  if (getOfferLoading) {
    return <Loading />;
  }
  
    
    return (
        <section>
          <div className="container mx-auto py-8">
          <div className="flex items-center mb-5 bg-gray-100 rounded-full p-2 px-4">
      <SearchIcon className="text-gray-500" />
      <TextField
        id="search"
        placeholder="Search..."
        variant="standard"
        fullWidth
        InputProps={{
          disableUnderline: true,
          className: 'ml-2',
        }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onBlur={handleSearch}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
      />
    </div>
      <TableContainer component={Paper} className="shadow-lg">
        <Table className="min-w-full table-fixed">
          <TableHead className="bg-orange-100 text-white">
            <TableRow>
              <TableCell className="w-1/4 font-bold">Name</TableCell>
              <TableCell className="w-1/4 font-bold">Operator</TableCell>
              <TableCell className="w-1/4 font-bold text-right">
                Price
              </TableCell>
            
              <TableCell className="w-1/4 font-bold text-right">
               Action
              </TableCell>
            </TableRow>
          </TableHead>
          <tbody>
          <RenderTableRows></RenderTableRows>
          </tbody>
        </Table>
      </TableContainer>

      <AlertModal
        open={isAlertOpen}
        severity="warning"
        title="Are you sure you want to delete this item?"
        description=" Deleting this item is irreversible. Once deleted, you cannot retrieve it.">
        <Button onClick={handleAlertConfirm} color="secondary" size="small">
          Yes
        </Button>
        <Button onClick={handleCancel} color="primary" size="small">
          No
        </Button>
      </AlertModal>

{/* update offer with modal */}
      <Modal handleCancel={handleCancel} isModalOpen={isModalOpen}>
        <UpdateOffer  offer={viewDetails}></UpdateOffer>
        
 </Modal>
    </div>
        </section>
    );
};

export default ManageOffer;










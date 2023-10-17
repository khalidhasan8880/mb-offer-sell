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
import EditIcon from "@mui/icons-material/Edit";


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

    const [viewDetails, setViewDetails] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
  
  
    const handleDelete = (id, row) => {
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
      // axios.delete(`/api/items/${viewDetails.id}`)
      //   .then(response => {
      //     console.log('Item deleted successfully.');
      //   })
      //   .catch(error => {
      //     console.error('Error deleting item:', error);
      //   });
  
      // Close the alert and modal after successful deletion
      setIsAlertOpen(false);
      setIsModalOpen(false);
    };
  
    const handleAlertCancel = () => {
      // Close the alert
      setIsAlertOpen(false);
    };
  
    if (getUserLoading ) {
        return <Loading></Loading>
    }
    return (
        <section>
          {/* <div className="container mx-auto py-8">
      <TableContainer component={Paper} className="shadow-lg">
        <Table className="min-w-full table-fixed">
          <TableHead className="bg-orange-100 text-white">
            <TableRow>
              <TableCell className="w-1/4 font-bold">Name</TableCell>
              <TableCell className="w-1/4 font-bold">Description</TableCell>
              <TableCell className="w-1/4 font-bold text-right">
                Price
              </TableCell>
            </TableRow>
          </TableHead>
          <tbody>
            {users?.map((row) => (
              <TableRow key={row.id} className="bg-gray-100 hover:bg-green-200">
                <TableCell className="font-extralight text-xs">
                  {row.name}
                </TableCell>
                <TableCell className="font-extralight text-xs">
                  {row.description}
                </TableCell>
                <TableCell className="font-extralight text-xs text-right">
                  ${row.price}
                </TableCell>
                <TableCell className="font-extralight text-xs ">
                  <div className="flex gap-5">
                    <button onClick={handleEdit}>
                      <EditIcon></EditIcon>
                    </button>
                    <button onClick={handleDelete}>
                      <DeleteIcon></DeleteIcon>
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
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
        <Button onClick={handleAlertCancel} color="primary" size="small">
          No
        </Button>
      </AlertModal>

      <Modal isModalOpen={isModalOpen}>
        <UpdateOffer offer={offer}></UpdateOffer>
      </Modal>
    </div> */}
        </section>
    );
};

export default ManageUser;
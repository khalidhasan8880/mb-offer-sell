import { useEffect, useState } from "react";
import api from "../../hooks/interceptors";
import useAuth from "../../hooks/useAuth";
import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AlertModal from "../../components/AlertModal";

const UserOrders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isOpenAlertModal, setIsOpenAlertModal] = useState(false);
  const { user } = useAuth();
  const [data, setData] = useState([]);
  useEffect(() => {
    api.get(`user/orders?email=${user?.email}`).then((res) => {
      setData(res.data);
    });
  }, [user]);
  console.log(data);

  const handleSearch = async () => {
    try {
      if (searchTerm) {
        const res = await api.post(`offer/search?email=${user?.email}`, {
          searchTerm,
        });
        setData(res.data);
      } else {
        const res = await api.get(`offer/bl?email=${user?.email}`);
        setData(res?.data);
      }
    } catch (error) {
      console.error(error);
    }
  };



const handleOpenAlertModal = (message)=>{
    setFeedback(message)
    setIsOpenAlertModal(true)
}
const handleCancelAlertModal = ()=>{
    setIsOpenAlertModal(false)
    setFeedback('')
}
  const RenderTableRows = () => {
    if (data.length === 0) {
      return <TableRow>No data found</TableRow>;
    }

    return data?.map((row) => (
      <TableRow key={row?._id} className="bg-gray-100">
        <TableCell className="font-extralight text-xs">
          {row?.offerName}
        </TableCell>
        <TableCell className="font-extralight text-xs">
          {row?.operator}
        </TableCell>
        <TableCell className="font-extralight text-xs text-right">
          ${row?.price}
        </TableCell>

        <TableCell className="font-extralight text-xs text-right">
          <span
            className={
              row?.status === "approved"
                ? "bg-green-500 rounded-full px-2 py-1"
                : "bg-red-600 text-white rounded-full px-2 py-1"
            }>
            {row?.status}
          </span>
        </TableCell>
        <TableCell className="font-extralight text-xs text-right">
     {row?.feedback && <button onClick={()=>handleOpenAlertModal(row?.feedback)} >OpenFeedback</button>}
        </TableCell>

      </TableRow>
    ));
  };

  return (
    <section className="container mx-auto py-8">
    <div className="flex items-center mb-5 bg-gray-100 rounded-full p-2 px-4">
      <SearchIcon className="text-gray-500" />
      <TextField
        id="search"
        placeholder="Search..."
        variant="standard"
        fullWidth
        InputProps={{
          disableUnderline: true,
          className: "ml-2",
        }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onBlur={handleSearch}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
      />
    </div>
    <TableContainer component={Paper} className="shadow-lg">
      <Table className="min-w-full ">
        <TableHead className="bg-orange-100 text-white">
          <TableRow>
            <TableCell className="w-1/4 font-bold">Name</TableCell>
            <TableCell className="w-1/4 font-bold">Operator</TableCell>
            <TableCell className="w-1/4 font-bold text-right">
              Price
            </TableCell>

            <TableCell className="w-1/4 font-bold text-right">
              Status
            </TableCell>

            <TableCell className="w-1/4 font-bold text-right">
              Feedback
            </TableCell>
          </TableRow>
        </TableHead>
        <tbody>
          <RenderTableRows></RenderTableRows>
        </tbody>
      </Table>
    </TableContainer>

        <AlertModal title={feedback} open={isOpenAlertModal}
handleAlertCancel={handleCancelAlertModal}></AlertModal>
    
  </section>
  );
};

export default UserOrders;

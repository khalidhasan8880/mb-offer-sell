import { useEffect, useState } from "react";
import api from "../../../hooks/interceptors";
import Loading from "../../../components/Loading";
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import AlertModal from "../../../components/AlertModal";
import Modal from "../../../components/Modal";
import useAuth from "../../../hooks/useAuth";
import FeedbackForm from "../../../components/FeedbackForm";
import CopyToClipboard from "../../../components/CopyClipboard";

const BalanceRequest = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [getUserLoading, setGetUserLoading] = useState(true);
  const [viewDetails, setViewDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const { user } = useAuth();

  const handleSearch = async () => {
    try {
      if (searchTerm) {
        const res = await api.post(`balance-requests/search?email=${user?.email}`, {
          searchTerm,
        });
        setData(res.data);
      } else {
        const res = await api.get(`balance-requests?email=${user?.email}`);
        setData(res?.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    api.get(`balance-requests?email=${user?.email}`).then((res) => {
      setGetUserLoading(false);
      setData(res.data);
      console.log(res.data);
    });
  }, [user]);

  const handleAlertConfirmation = (row) => {
    setAlertMessage("Are you sure you want to approve this item?");
    setViewDetails(row);
    setIsAlertOpen(true);
  };
  const handleFakeTransitionConfirmation = (row) => {
    setAlertMessage("Are you sure you this was a fake transition?");
    setViewDetails(row);
    setIsAlertOpen(true);
  };

  const handleRejectOrder = (row) => {
    setViewDetails(row);
    setIsModalOpen(true);
  };

  const handleFakeTransition = () => {
    console.log("fake");
    api
      .put(`/payment/fake/${viewDetails?._id}?email=${user?.email}`)
      .then((response) => {
        console.log(" successfully.", response?.data);
      })
      .catch((error) => {
        console.error("Error item:", error);
      });

    setIsAlertOpen(false);
  };
  const handleApproved = () => {
    console.log("/approved/add-balance/:id");
    api
      .put(`/approved/add-balance/${viewDetails?._id}?email=${user?.email}`)
      .then((response) => {
        console.log(" successfully.", response?.data);
      })
      .catch((error) => {
        console.error("Error item:", error);
      });

    setIsAlertOpen(false);
  };

  const handleCancel = () => {
    setViewDetails(null);
    setIsAlertOpen(false);
    setIsModalOpen(false);
  };

  const handleFeedbackFormSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const feedback = form.feedback?.value;

    api
      .put(`/payment/reject/${viewDetails?._id}?email=${user?.email}`, {
        feedback,
      })
      .then((response) => {
        console.log(" successfully.", response?.data);
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.error("Error item:", error);
        setIsModalOpen(false);
      });
  };
  if (getUserLoading) {
    return <Loading></Loading>;
  }

  const RenderTableRows = () => {
    if (data.length === 0) {
      return <TableRow>No data found</TableRow>;
    }

    return data?.map((row) => (
      <TableRow key={row?._id} className="bg-gray-100 ">
        
        <TableCell className="font-extralight text-xs text-right">
          {row?.userEmail}
        </TableCell>
        <TableCell className="font-extralight text-xs text-right">
          <div className="flex items-center gap-x-2">
          {row?.transactionId}
            <CopyToClipboard textToCopy={row?.transactionId}></CopyToClipboard>
          </div>
        
        </TableCell>
        <TableCell className="font-extralight text-xs text-right">
          {row?.paymentMethod}
        </TableCell>
        <TableCell
          >
          {row?.amount}
        </TableCell>
       
        <TableCell className="font-extralight text-xs text-right">
          <span
            className={
              row?.status === "approved"
                ? "bg-green-500 rounded-full px-2 py-1 text-white"
                : "bg-red-600 text-white rounded-full px-2 py-1"
            }>
            {row?.status}
          </span>
        </TableCell>
        <TableCell className="font-extralight text-xs ">
          <div className="flex gap-2">
          <button
                onClick={() => handleFakeTransition(row)}
                className={
                  row?.status === "rejected" || row?.status === "approved"
                    ? "px-2 py-1 bg-red-200 text-white"
                    : "px-2 py-1 bg-red-500 text-white"
                }
                disabled={
                  row?.status === "rejected" || row?.status === "approved"
                }>
                Fake
              </button>       
              <button
              onClick={() => handleAlertConfirmation(row)}
              className={
                row?.status === "rejected" || row?.status === "approved"
                  ? "px-2 py-1 bg-green-200 text-white"
                  : "px-2 py-1 bg-green-500 text-white"
              }
              disabled={
                row?.status === "rejected" || row?.status === "approved"
              }
              >
              Approve
            </button>  
          </div>
        </TableCell>
      </TableRow>
    ));
  };

  // const deleteall = () => {
  //   api.delete("/delete-all").then((res) => {
  //     console.log(res.data);
  //   });
  // };
  if (getUserLoading) {
    return <Loading />;
  }

  return (
    <section>
      <div className=" mx-auto py-8">
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
                <TableCell className=" font-bold">User Email</TableCell>
                <TableCell className=" font-bold">Transaction Id </TableCell>
                <TableCell className=" font-bold text-right">
                  Mobile bank
                </TableCell>
                <TableCell className=" font-bold">Amount </TableCell>
                
                <TableCell className=" font-bold text-right">Status</TableCell>
                <TableCell className=" font-bold text-right">Action</TableCell>
              </TableRow>
            </TableHead>
            <tbody>
              <RenderTableRows></RenderTableRows>
            </tbody>
          </Table>
        </TableContainer>

        <AlertModal open={isAlertOpen} severity="warning" title={alertMessage}>
          <Button onClick={handleApproved} color="secondary" size="small">
            Yes
          </Button>
          <Button onClick={handleCancel} color="primary" size="small">
            No
          </Button>
        </AlertModal>

    
      </div>

    </section>
  );
};

export default BalanceRequest;

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

const Orders = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [getUserLoading, setGetUserLoading] = useState(true);
  const [viewDetails, setViewDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const { user } = useAuth();

  const handleSearch = async () => {
    try {
      if (searchTerm) {
        const res = await api.post(`payment/search?email=${user?.email}`, {
          searchTerm,
        });
        setData(res.data);
      } else {
        const res = await api.get(`payments?email=${user?.email}`);
        setData(res?.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    api.get(`payments?email=${user?.email}`).then((res) => {
      setGetUserLoading(false);
      setData(res.data);
    });
  }, [user]);

  const handleAlertConfirmation = (row) => {
    setAlertMessage("Are you sure you want to approve this item?")
    setViewDetails(row);
    setIsAlertOpen(true);
  };
  const handleFakeTransitionConfirmation = (row) => {
    setAlertMessage("Are you sure you this was a fake transition?")
    setViewDetails(row);
    setIsAlertOpen(true);
  };

  const handleRejectOrder = (row) => {
    setViewDetails(row);
    setIsModalOpen(true);
  };

  const handleFakeTransition = () => {
    console.log("approved");
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
    console.log("approved");
    api
      .put(`/payment/approved/${viewDetails?._id}?email=${user?.email}`)
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
        <TableCell className="font-extralight text-xs">
          {row?.offerName}
        </TableCell>
        <TableCell className="font-extralight text-xs">
          {row?.operator}
        </TableCell>
        <TableCell className="font-extralight text-xs text-right">
          {row?.paymentMethod}
        </TableCell>
        <TableCell className={row?.paymentSystem ==='send money' ? 'font-extralight text-xs text-right bg-red-200':"font-extralight text-xs text-right bg-green-200"}>
          {row?.paymentSystem}
        </TableCell>
        <TableCell className="font-extralight text-xs text-right">
   <div className="flex gap-x-1 items-center">
   {row?.phoneNumber}
          <CopyToClipboard textToCopy={row?.phoneNumber}></CopyToClipboard>
   </div>
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
        <TableCell className="font-extralight text-xs ">
          <div className="flex gap-2">
            <button
              onClick={() => handleRejectOrder(row)}
              className={
                row?.status === "rejected" || row?.status === "approved"
                  ? "px-2 py-1 bg-red-300 text-white"
                  : "px-2 py-1 bg-red-500 text-white"
              }
              disabled={
                row?.status === "rejected" || row?.status === "approved"
              }>
              Reject
            </button>

            {row?.paymentSystem === "send money" ? (
              < >
                <button onClick={()=>handleFakeTransitionConfirmation(row)} className="px-2 py-1 bg-yellow-700 text-white">Fake</button>
                <button  onClick={()=>handleFakeTransitionConfirmation(row)} className="px-2 py-1 bg-sky-700 text-white">Taken Withdraw</button>
              </>
            ) : (
              ""
            )}

            <button
              onClick={() => handleAlertConfirmation(row)}
              className={
                row?.status === "rejected" || row?.status === "approved"
                  ? "px-2 py-1 bg-green-300 text-white"
                  : "px-2 py-1 bg-green-500 text-white"
              }
              disabled={
                row?.status === "rejected" || row?.status === "approved"
              }>
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
                <TableCell className=" font-bold">Name</TableCell>
                <TableCell className=" font-bold">Operator</TableCell>
                <TableCell className=" font-bold text-right">
                  Mobile bank
                </TableCell>
                <TableCell className=" font-bold text-right">
                  Payment System
                </TableCell>
                <TableCell className=" font-bold text-right">
                  Number
                </TableCell>
              
                <TableCell className=" font-bold text-right">Price</TableCell>
                <TableCell className=" font-bold text-right">Status</TableCell>
                <TableCell className=" font-bold text-right">Action</TableCell>
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
          title={alertMessage}
         >
          <Button onClick={handleApproved} color="secondary" size="small">
            Yes
          </Button>
          <Button onClick={handleCancel} color="primary" size="small">
            No
          </Button>
        </AlertModal>

        {/* update offer with modal */}
        <Modal handleCancel={handleCancel} isModalOpen={isModalOpen}>
          <FeedbackForm
            handleFeedbackFormSubmit={handleFeedbackFormSubmit}></FeedbackForm>
        </Modal>
      </div>

      {/* <button className="bg-red-400  mt-80" onClick={deleteall}>
        delete all
      </button> */}
    </section>
  );
};

export default Orders;

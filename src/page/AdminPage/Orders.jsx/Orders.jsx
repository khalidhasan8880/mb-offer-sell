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
} from "@mui/material";
import Modal from "../../../components/Modal";
import useAuth from "../../../hooks/useAuth";
import FeedbackForm from "../../../components/FeedbackForm";
import CopyToClipboard from "../../../components/CopyClipboard";
import ConfirmationDialog from "../../../components/ConfirmationDialog";

const Orders = () => {
  const [data, setData] = useState([]);
  const [getUserLoading, setGetUserLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isApproveDialogOpen, setApproveDialogOpen] = useState(false);
  const { user } = useAuth();



  useEffect(() => {
    api.get(`/payments/order?email=${user?.email}`).then((res) => {
      setGetUserLoading(false);
      setData(res.data);
    });
  }, [user]);


  const handleFakeClick = (id) => {
    setSelectedId(id);
    setDeleteDialogOpen(true);
  };

  const handleApproveClick = (id) => {
    setSelectedId(id);
    setApproveDialogOpen(true);
  };

  const handleFakeConfirm = () => {
    api
      .post(`/payment/fake/${selectedId}?email=${user?.email}`)
      .then((res) => {
        console.log(res);
      });
    setDeleteDialogOpen(false);
    setApproveDialogOpen(false);
    setSelectedId(null);
  };

  const handleApprovedConfirm = () => {
    api
    .post(`/approved-withdraw/${selectedId}?email=${user?.email}`)
    .then((res) => {
      console.log(res);
    });
    setSelectedId(null);
    setDeleteDialogOpen(false);
    setApproveDialogOpen(false);
  };

  const handleCancel = () => {
    setSelectedId(null);
    setDeleteDialogOpen(false);
    setApproveDialogOpen(false);
  };

  const handleFeedbackFormSubmit = ()=>{
    console.log('helllooooooooo')
  }
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
        <TableCell
          className={
            row?.paymentSystem === "send money"
              ? "font-extralight text-xs text-right bg-red-200"
              : "font-extralight text-xs text-right bg-green-200"
          }>
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
                ? "bg-green-500 rounded-full px-2 py-1 text-white"
                : "bg-red-600 text-white rounded-full px-2 py-1"
            }>
            {row?.status}
          </span>
        </TableCell>
        <TableCell className="font-extralight text-xs ">
          <div className="flex gap-2">
          <button
                  onClick={() => handleFakeClick(row?._id)}
                  disabled={
                    row?.status === "rejected" || row?.status === "approved"
                  }
                  className="px-2 py-1 bg-yellow-700 text-white">
                  Fake
                </button>

            <button
              onClick={() => handleApproveClick(row)}
              className={
                row?.status === "rejected" || row?.status === "approved"
                  ? "px-2 py-1 bg-green-200 text-white"
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


  if (getUserLoading) {
    return <Loading />;
  }

  return (
    <section>
      <div className=" mx-auto py-8">        
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
                <TableCell className=" font-bold text-right">Number</TableCell>

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

        <ConfirmationDialog
          open={isDeleteDialogOpen}
          onClose={handleCancel}
          onConfirm={handleFakeConfirm}
          action="mark this request as fake"
        />

        <ConfirmationDialog
          open={isApproveDialogOpen}
          onClose={handleCancel}
          onConfirm={handleApprovedConfirm}
          action="Approve"
        />

        {/* update offer with modal */}
        <Modal handleCancel={handleCancel} isModalOpen={isModalOpen}>
          <FeedbackForm
            handleFeedbackFormSubmit={handleFeedbackFormSubmit}></FeedbackForm>
        </Modal>
      </div>
    </section>
  );
};

export default Orders;

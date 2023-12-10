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
import useAuth from "../../../hooks/useAuth";
import CopyToClipboard from "../../../components/CopyClipboard";
import ConfirmationDialog from "../../../components/ConfirmationDialog";

const WithdrawRequest = () => {
  const [data, setData] = useState([]);
  const [getUserLoading, setGetUserLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isApproveDialogOpen, setApproveDialogOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    api.get(`/deposit-history?email=${user?.email}`).then((res) => {
      setGetUserLoading(false);
      setData(res.data);
      console.log(res.data);
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
    .post(`/approved-deposit-request/${selectedId}?email=${user?.email}`)
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

  // console.log()
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
        <TableCell>{row?.amount}</TableCell>

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
              onClick={() => handleApproveClick(row?._id)}
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
      </div>
    </section>
  );
};

export default WithdrawRequest;

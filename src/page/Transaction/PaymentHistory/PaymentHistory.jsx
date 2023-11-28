import useAuth from "../../../hooks/useAuth";
import useFetchData from "../../../hooks/useFetchData";
import Loading from "../../../components/Loading";
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import CopyToClipboard from "../../../components/CopyClipboard";
const PaymentHistory = () => {
    const{user}=useAuth()
    const { data, isLoading} = useFetchData(`/transaction?email=${user?.email}`);
console.log(data);



if (isLoading) {
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
       
      </TableRow>
    ));
  };


 
    return (
        <TableContainer component={Paper} className="shadow-lg overflow-scroll" >
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
            </TableRow>
          </TableHead>
          <tbody>
            <RenderTableRows></RenderTableRows>
          </tbody>
        </Table>
      </TableContainer>
    );
};

export default PaymentHistory;
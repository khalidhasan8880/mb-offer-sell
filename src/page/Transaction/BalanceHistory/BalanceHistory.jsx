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
const BalanceHistory = () => {
    const{user}=useAuth()
    const { data, isLoading} = useFetchData(`/balance/${user?.email}?email=${user?.email}`);
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
          {row?.transactionId}
        </TableCell>
     
        <TableCell className="font-extralight text-xs text-right">
          {row?.paymentMethod}
        </TableCell>
        <TableCell className="font-extralight text-xs text-right">
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
        <TableCell className="font-extralight text-xs text-right">
          <span
            className={
              row?.balanceStatus === "add"
                ? "bg-green-500 rounded-full px-2 py-1 text-white"
                : "bg-red-600 text-white rounded-full px-2 py-1"
            }>
            {row?.balanceStatus}
          </span>
        </TableCell>
       
      </TableRow>
    ));
  };

{/* <span data-lexical-text="true">f</span>
const words = [1,2,3,4,5]
words.forEach(x=>{
 
    var newSpan = document.createElement('span');
newSpan.setAttribute('data-lexical-text', 'true');
var parentElement = document.querySelector('[aria-describedby=":rd0:"] p');
parentElement.click()
 document.querySelector('[aria-describedby=":rd0:"]').onclick = () => {
  parentElement.innerHTML = '';
  document.querySelector('[aria-describedby=":rd0:"] p > br').remove()
}
parentElement.classList.add("xdpxx8g")
parentElement.setAttribute('dir','ltr')
newSpan.textContent = number;
parentElement.appendChild(newSpan);
document.querySelector('[aria-label="Press enter to send"]')?.click()




}) */}
 
    return (
        <TableContainer component={Paper} className="shadow-lg overflow-scroll" >
        <Table className="min-w-full ">
          <TableHead className="bg-orange-100 text-white">
            <TableRow>
              <TableCell className=" font-bold">Transaction Id</TableCell>
              <TableCell className=" font-bold text-right">
                Mobile bank
              </TableCell>
             

              <TableCell className=" font-bold text-right">Amount</TableCell>
              <TableCell className=" font-bold text-right">Status</TableCell>
              <TableCell className=" font-bold text-right">Balance Status</TableCell>
            </TableRow>
          </TableHead>
          <tbody>
            <RenderTableRows></RenderTableRows>
          </tbody>
        </Table>
      </TableContainer>
    );
};

export default BalanceHistory;
import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import PaymentHistory from './PaymentHistory/PaymentHistory';
import BalanceHistory from './BalanceHistory/BalanceHistory';
import DepositHistory from './DepositHistory/DepositHistory';

export default function Transaction() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
// useEffect(()=>{
// setValue(2)
// },[])

  function TabPanel({ children, value, index }) {
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
 

  // Render tabs for larger screens
  return (
    <section>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
         
            <Tab label="Added Balances" />
            <Tab label="Deposit Balances" />
          </Tabs>
        </Box>
       
        <TabPanel value={value} index={0}>
         <BalanceHistory></BalanceHistory>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <DepositHistory></DepositHistory>
        </TabPanel>
      </Box>
    </section>
  );
}






































// import { useEffect, useState } from "react";
// import api from "../../hooks/interceptors";
// import {
//   Paper,
//   Table,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   Box,
//   Tab,
// } from "@mui/material";

// import SearchIcon from "@mui/icons-material/Search";
// import useAuth from "../../hooks/useAuth";
// import Loading from "../../components/Loading";
// const Transaction = () => {
//   const [data, setData] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(true);
//   const { user } = useAuth();
//   // ----------
//   const [value, setValue] = useState('1')
//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   useEffect(() => {
//     api.get(`/transaction?email=${user?.email}`).then((res) => {
//       setData(res.data);
//       setLoading(false);
//     });
//   }, [user]);

//   const handleSearch = async () => {
//     try {
//       if (searchTerm) {
//         const res = await api.post(`payment/search?email=${user?.email}`, {
//           searchTerm,
//         });
//         setData(res.data);
//       } else {
//         const res = await api.get(`payments?email=${user?.email}`);
//         setData(res?.data);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   if (loading) {
//     <Loading></Loading>;
//   }

//   const RenderTableRows = () => {
//     if (data.length === 0) {
//       return <TableRow>No data found</TableRow>;
//     }

//     return data?.map((row) => (
//       <TableRow key={row?._id} className="bg-gray-100 ">
//         <TableCell className="font-extralight text-xs">
//           {row?.offerName}
//         </TableCell>
//         <TableCell className="font-extralight text-xs">
//           {row?.operator}
//         </TableCell>
//         <TableCell className="font-extralight text-xs text-right">
//           {row?.paymentMethod}
//         </TableCell>
//         <TableCell
//           className={
//             row?.paymentSystem === "send money"
//               ? "font-extralight text-xs text-right bg-red-200"
//               : "font-extralight text-xs text-right bg-green-200"
//           }>
//           {row?.paymentSystem}
//         </TableCell>
//         <TableCell className="font-extralight text-xs text-right">
//           {row?.phoneNumber}
//         </TableCell>
//         <TableCell className="font-extralight text-xs text-right">
//           ${row?.price}
//         </TableCell>
//         <TableCell className="font-extralight text-xs text-right">
//           <span
//             className={
//               row?.status === "approved"
//                 ? "bg-green-500 rounded-full px-2 py-1 text-white"
//                 : "bg-red-600 text-white rounded-full px-2 py-1"
//             }>
//             {row?.status}
//           </span>
//         </TableCell>
//       </TableRow>
//     ));
//   };
//   return (
  
//   );
// };

// export default Transaction;
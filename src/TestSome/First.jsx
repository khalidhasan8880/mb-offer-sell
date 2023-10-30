import { TextField } from "@mui/material";
import { useEffect, useState } from "react";

const First = () => {
    const [storeClasses, setStoreClasses] = useState({
        bg:"bg-red-200"
    })


    useEffect(()=>{
        const element = document.getElementById('kkk')
        let clsList = []
        
        for (const key in storeClasses) {
            const element = storeClasses[key];
                console.log(element);
                clsList.push(element)
        }
        element.classList.add(...clsList)
    },[storeClasses])
   


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setStoreClasses({ ...storeClasses, [name]: value });        
      };
      console.log(storeClasses);

    return (
        <div >
          <TextField
        required
        label="BG"
        variant="outlined"
        fullWidth
        name="bg"
        value={storeClasses.bg}
        onChange={handleInputChange}
      />
            {/* <button onClick={()=>updateClasses("bg-sky-600")}>bg-500</button> */}


            <h1 className="mt-5" id="kkk">hello hello hello</h1>
        </div>
    );
};

export default First;
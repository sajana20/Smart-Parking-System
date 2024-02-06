// import { useState } from "react";
import axios from "axios";

const parkingAreaService = {}

// parkingAreaService.getTotalAvailability = (endpoint, query) => {

//     const [data, setData] = useState([])
//     const [error, setError] = useState(null)
    
//     const options = {
//         method: 'GET',
//         url: 'https://sss.com/${endpoint}',
//         params: {...query},
//     };

//     const fetchData = async () => {
//         try {
//             const response = await axios.request(options)
//             setData(response.data.data);

//         }catch (error) {
//             setError(error);
//             alert('There is an error')

//         }
//     }

//     useEffect(() => {
//         fetchData();

//     })

//     return {data}
// }


parkingAreaService.getparkingAvailability = async () => {

    // const [data, setData] = useState([])
    // const [error, setError] = useState(null)
    response = []
    
    const options = { 
        method: 'GET',
        url: 'https://2518-112-134-158-68.ngrok-free.app/availability',
    };
     try {

            response = await axios.request(options)

            // setData(response.data);

        }catch (error) {

            // setError(error); 
            alert('There is an error')  

        }
   
    return response.data
}


export default parkingAreaService;
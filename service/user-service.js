// import { useState, useEffect } from "react";
// import axios from "axios";

// const userService = {}



// userService.login = (email, password) => {

//     const formData = {
//         email: email,
//         password: password
//       };

//     const [data, setData] = useState([])
//     const [error, setError] = useState(null)

    
//     const options = {
//         method: 'POST',
//         url: 'https://sss.com/login',
//         params: formData,
//         headers: {'x':x}
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



// export default userService;
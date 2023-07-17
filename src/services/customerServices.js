import axios from "axios";
const getAllCustomers = async () => {
    fetch('http://localhost:8081/api/khachhang', { mode: 'no-cors' }).then(data=> console.log(data.json()))
}

const customerServices = { getAllCustomers }
export default customerServices
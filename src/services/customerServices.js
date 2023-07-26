import axios from "axios";
const getAllCustomers = async () => {
    fetch('http://localhost:8081/api/khachhang').then(data=> data.json()).then(data => console.log(data))
}

const customerServices = { getAllCustomers }
export default customerServices
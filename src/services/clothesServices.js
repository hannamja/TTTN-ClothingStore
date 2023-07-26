import axios from "axios";
const getAllClothes = async () => {
    const data = await fetch('http://localhost:8081/api/mathang')
    const result = await data.json()
    return result
}

const clothesServices = { getAllClothes }
export default clothesServices
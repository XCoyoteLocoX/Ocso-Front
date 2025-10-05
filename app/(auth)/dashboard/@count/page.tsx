import axios from "axios";

const CountPage = async () => {
    const countLocations = await axios.get("http://localhost:3001/locations")
    return "Hay tantas locaciones: " + countLocations?.data?.length;
}
export default CountPage;
import axios from "axios";
const config = require("../config/default.json");
const apiURL = config.apiURL;

axios.defaults.withCredentials = true;

export const coverUpload = async (fd) => {
    try {
        const result = await axios
            .post(`${apiURL}/api/upload/image`, fd)
            .catch((err) => console.log(err));
        console.log(result);
        return result.data.fileName;
    } catch (error) {
        console.log(error);
    }
};

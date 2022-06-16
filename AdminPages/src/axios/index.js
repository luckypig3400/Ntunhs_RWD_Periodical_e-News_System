import { ConstructionOutlined } from "@mui/icons-material";
import axios from "axios";
const config = require("../config/default.json");

const apiURL = config.apiURL;

export const getCategory = async () => {
    try {
        const response = await axios.get(`${apiURL}/api/Category`);
        return response.data.results;
    } catch (error) {
        console.error(error);
    }
};

export const getPostList = async () => {
    try {
        const response = await axios
            .all([
                axios.get(`${apiURL}/api/post?limit=9119453`),
                axios.get(`${apiURL}/api/category`),
            ])
            .then(
                //關聯post.categoryID
                axios.spread((data1, data2) => {
                    const postResult = data1.data.results;
                    const categoryResult = data2.data.results;
                    postResult.forEach((item) => {
                        item.categoryID = categoryResult.find(
                            (category) => item.categoryID === category.id
                        ).name;
                    });
                    postResult.forEach((item) => {
                        item.posttime = `${item.noYear}-${item.noMonth}`;
                    });
                    return postResult;
                })
            );
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const getUser = async () => {
    try {
        const response = await axios.get(`${apiURL}/api/user`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const createPost = async () => {
    try {
        const response = axios
            .all([
                axios.get(`${apiURL}/api/post`),
                axios.get(`${apiURL}/api/category`),
            ])
            .then(
                axios.spread((data1, data2) => {
                    const postResult = data1.data.results[0].periodNumber;
                    const categoryResult = data2.data.results;
                    //關聯post.categoryID
                    return {
                        categoryResult,
                        postResult,
                    };
                })
            )
            .catch((err) => {
                console.log(err);
            });
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const editPost = async (PostID) => {
    try {
        const response = axios
            .all([
                axios.get(`${apiURL}/api/post/${PostID}`),
                axios.get(`${apiURL}/api/category`),
            ])
            .then(
                axios.spread((data1, data2) => {
                    const categoryResult = data2.data.results;
                    return { data1, categoryResult };
                })
            )
            .catch((err) => {
                console.log(err);
            });
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const getBulletin = async () => {
    try {
        const response = await axios.get(`${apiURL}/api/announcement`);
        return response.data.results;
    } catch (error) {
        console.error(error);
    }
};

export const getCarousel = async () => {
    try {
        const response = await axios.get(`${apiURL}/api/carousel`);
        response.data.results.map((carousel) => {
            const words = carousel.postIDArray.split(",");
            carousel.sum = words.length;
            carousel.postIDArray = words;
        });
        return response.data.results;
    } catch (error) {
        console.error(error);
    }
};

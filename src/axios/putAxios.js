import axios from "axios";
const config = require("../config/default.json");
const apiURL = config.apiURL;

axios.defaults.withCredentials = true;

export const deleteUser = async (userContent) => {
    try {
        await axios
            .delete(`${apiURL}/api/user/${userContent.ID}`)
            .then((result) => {
                return result.data;
            })
            .catch((err) => {
                console.log(err);
            });
    } catch (error) {
        console.log(error);
    }
};

export const editUser = async (userContent) => {
    try {
        axios
            .patch(`${apiURL}/api/user/${userContent.ID}`, {
                name: userContent.name,
                username: userContent.username,
                password: userContent.password,
            })
            .then((result) => {
                setUser(result.data);
            })
            .catch((err) => {
                console.log(err);
            });
    } catch (error) {
        console.log(error);
    }
};

export const createUser = async (userName, name, password1) => {
    try {
        axios
            .post(`${apiURL}/auth/register`, {
                username: userName,
                name: name,
                password: password1,
            })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error.request);
            });
    } catch (error) {
        console.log(error);
    }
};

export const createPost = async (props) => {
    const content = props.content.replace("class", "className");
    try {
        const response = await axios
            .post(`${config.apiURL}/api/post/`, {
                periodNumber: props.periodNumber,
                noYear: props.noYear,
                noMonth: props.noMonth,
                categoryID: props.categoryID,
                writer: props.writer,
                content: content,
                subject: props.subject,
                cover: props.cover,
            })
            .then((response) => {
                return {
                    Open: true,
                    Severity: "success",
                    RenderMessage: "發表成功",
                };
            })
            .catch((error) => {
                return {
                    Open: true,
                    Severity: "error",
                    RenderMessage: error.request.onerror.name,
                };
            });
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const editPost = async (props) => {
    const content = props.content.replace("class", "className");
    try {
        const response = await axios
            .patch(`${apiURL}/api/post/${props.PostID}`, {
                periodNumber: props.periodNumber,
                noYear: props.noYear,
                noMonth: props.noMonth,
                categoryID: props.categoryID,
                writer: props.writer,
                content: content,
                subject: props.subject,
                cover: props.cover,
            })
            .then((response) => {
                return {
                    Open: true,
                    Severity: "success",
                    RenderMessage: "發表成功",
                };
            })
            .catch((error) => {
                return {
                    Open: true,
                    Severity: "error",
                    RenderMessage: error.request.onerror.name,
                };
            });
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const deletePost = async (props) => {
    try {
        const response = await axios
            .delete(`${apiURL}/api/Post/${props.PostID}`, {
                postID: props.PostID,
            })
            .then((response) => {
                return {
                    Open: true,
                    Severity: "success",
                    RenderMessage: "刪除成功",
                };
            })
            .catch((error) => console.log(error.request));
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const createBulletin = async (text) => {
    try {
        axios
            .post(`${apiURL}/api/announcement`, {
                text,
            })
            .then((response) => {
                console.log(response);
                window.location.reload();
            });
    } catch (error) {
        console.log(error);
    }
};

export const deleteBulletin = async (announcementID) => {
    axios
        .delete(`${apiURL}/api/announcement/${announcementID}`, announcementID)
        .then((response) => {
            window.location.reload();
        });
};

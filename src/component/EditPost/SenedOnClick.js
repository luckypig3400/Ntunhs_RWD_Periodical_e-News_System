import axios from 'axios'
export default function EditPostSendOnClick(PostID,apiURL,periodNumber,noYear,noMonth,categoryID,writer,content,subject){
    axios.defaults.withCredentials = true;
    axios
        .patch(`${apiURL}/api/post/${PostID}`, {
            periodNumber: periodNumber,
            noYear: noYear,
            noMonth: noMonth,
            categoryID: categoryID,
            writer: writer,
            content: content,
            subject: subject,
        })
        .then((response) => console.log(response))
        .catch((error) => console.log(error.request));
        
        
}



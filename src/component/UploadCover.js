import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Button,
    Stack,
    Alert,
    IconButton,
    Collapse,
} from "@mui/material";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { styled } from "@mui/material/styles";

import { coverUpload } from "../axios/onUpload";
const config = require("../config/default.json");
const imageURL = config.imageURL;

const UploadCover = (props) => {

    const Input = styled("input")({
        display: "none",
    });

    const _onUpload = async (fd, resolve, type) => {
        const response = await coverUpload(fd);
        resolve(
            `${imageURL}/${response}`,
            props.setCover(response),
            props.setCoverLink(`${imageURL}/image/${response}`)
        );
    };
    return (
        <>
            {props.cover ? (
                <>
                    <Button
                        variant="contained"
                        component="span"
                        aria-label="upload picture"
                        endIcon={<InsertPhotoIcon />}
                        sx={{ margin: "10px" }}
                        onClick={(e) => {
                            window.open(props.coverLink, "_blank");
                        }}
                    >
                        瀏覽封面"{props.cover}"
                    </Button>
                    <Button
                        variant="contained"
                        component="span"
                        aria-label="upload picture"
                        color="error"
                        sx={{ margin: "10px" }}
                        onClick={() => {
                            props.setCover("");
                            props.setCoverLink("");
                        }}
                    >
                        刪除封面
                    </Button>
                </>
            ) : (
                <label htmlFor="icon-button-file">
                    <Input
                        accept="image/jpeg, image/png"
                        id="icon-button-file"
                        type="file"
                        onChange={(file) => {
                            return new Promise((resolve, reject) => {
                                const fd = new FormData();
                                fd.append("image", file.target.files[0]);
                                _onUpload(fd, resolve, "image");
                            });
                        }}
                    />
                    <Button
                        variant="outlined"
                        component="span"
                        aria-label="upload picture"
                        endIcon={<DriveFolderUploadIcon />}
                        sx={{ margin: "10px" }}
                    >
                        上傳封面
                    </Button>
                </label>
            )}
        </>
    );
};

export default UploadCover;

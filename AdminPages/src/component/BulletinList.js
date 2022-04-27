import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@mui/icons-material/Delete";

import IconButton from "@mui/material/IconButton";
import { getBulletin } from "../axios/index.js";
import {deleteBulletin} from "../axios/putAxios";

const BulletinList = () => {
    const [bulletin, setBulletin] = useState([]);
    useEffect(async () => {
        setBulletin(await getBulletin());
    }, []);

    return (
        <Box>
            <List
                sx={{
                    width: "100%",
                    bgcolor: "background.paper",
                }}
            >
                {bulletin.map((value) => (
                    <ListItem
                        key={value.id}
                        disableGutters
                        secondaryAction={
                            <IconButton
                                onClick={() => {
                                    deleteBulletin(value.id)
                                }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        }
                    >
                        <ListItemText primary={value.text} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default BulletinList;

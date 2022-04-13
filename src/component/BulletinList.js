import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CommentIcon from "@mui/icons-material/Comment";
import DeleteIcon from '@mui/icons-material/Delete';

import IconButton from "@mui/material/IconButton";

const BulletinList = ({setBulletin,bulletin}) => {
    return (
        <Box>
            <List
                sx={{
                    width: "100%",
                    bgcolor: "background.paper",
                }}
            >
                {bulletin.map((value,id) => (
                    <ListItem
                        key={value}
                        disableGutters
                        secondaryAction={
                            <IconButton onClick={() =>{
                                setBulletin(prev=>prev.filter(p=>p!==value))
                            }}>
                                <DeleteIcon />
                            </IconButton>
                        }
                    >
                        <ListItemText primary={value} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default BulletinList;

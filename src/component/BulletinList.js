import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CommentIcon from "@mui/icons-material/Comment";
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
                {bulletin.map((value) => (
                    <ListItem
                        key={value}
                        disableGutters
                        secondaryAction={
                            <IconButton onClick={() =>{
                                //setBulletin(bulletin=>[...bulletin,bulletin.shift()]);
                                console.log(value.index);
                            }}>
                                <CommentIcon />
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

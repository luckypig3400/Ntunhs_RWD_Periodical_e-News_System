import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@mui/icons-material/Delete";

import IconButton from "@mui/material/IconButton";

const BulletinList = ({ setBulletin, bulletin }) => {
    return (
        <Box>
            <List
                sx={{
                    width: "100%",
                    bgcolor: "background.paper",
                }}
            >
                {bulletin.map((value,index) => (
                    <ListItem
                        key={index}
                        disableGutters
                        secondaryAction={
                            <IconButton
                                onClick={() => {
                                    const newValue = (prev) =>
                                        prev.filter(
                                            (p) => p.value !== value.value
                                        );
                                    setBulletin(newValue);
                                }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        }
                    >
                        <ListItemText primary={value.value} />
                        {value.time}
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default BulletinList;

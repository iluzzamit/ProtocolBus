import { AppBar, Typography } from '@material-ui/core';
import React from 'react';


export default function Header() {
    return (
        <AppBar>
            <Typography className='title'>
                CANBus Reporter
            </Typography>
        </AppBar >
    )
} 
import React from 'react';
import { Fade,  } from '@material-ui/core';
import { LightTooltip } from '../components/Style';



export default function Tooltip({ value }: { value: string }) {

    return (
        <LightTooltip title={value} arrow TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}>
            <span>{value.length > 10 ? value.slice(0, 9) + "..." : value}</span>
        </LightTooltip>
    );
}
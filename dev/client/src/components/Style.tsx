import { withStyles, Accordion as MuiAccordion, AccordionSummary as MuiAccordionSummary, AccordionDetails as MuiAccordionDetails, Tooltip, Switch } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';


export const StyledContainer = styled.div`
    .margin-left {
        margin-left: 20px;
    }
    .title {
        font-size: 60px;
    }

    .two-columns {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }

    .MuiPaper-root{
        background-color: #3f51b500;
    }

    .MuiPaper-elevation4 {
        padding-left: 34px;
        box-shadow: 0px 1px 0px -1px rgba(0,0,0,0.2), 0px -1px 3px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12);
    }

    .MuiAppBar-positionFixed{
        position: unset;
    }

    .MuiTypography-root {
        font: 'Roboto';
        color: #77A6F7;
        font-weight: 300;
    }

    .MuiPaper-elevation1 {
        box-shadow: unset;
    }
    .body-container {
        margin-top: 400px;
        margin: 10px 250px;
    }

    .value-text {
        color: darkslategray;
    }

    .title-text {
        font-size: 20px;
        font-weight: 400;
    }

    .accordion-title{
        font-size: 40px;
    }
`

export const Accordion = withStyles({
    root: {
        border: '1px solid rgba(0, 0, 0, .125)',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
})(MuiAccordion);

export const AccordionSummary = withStyles({
    root: {
        backgroundColor: 'rgba(0, 0, 0, .03)',
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
})(MuiAccordionSummary);

export const AccordionDetails = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiAccordionDetails);


export const LightTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 11,
    },
}))(Tooltip);
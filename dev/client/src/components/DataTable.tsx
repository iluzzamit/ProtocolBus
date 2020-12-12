import { Fade, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import React from 'react';
import { CANMessage, Data, DetectionResult } from '../model/Data';
import { toCamelCase } from '../common/utils';
import Tooltip from '../common/tooltip';
import io from 'socket.io-client';

export default function DataTable({ data }: { data: any[] }) {
  const [currentData, setCurrentData]: any = React.useState(data || []);

  React.useEffect(() => {
    setCurrentData(data);
  }, [data]);

  React.useEffect(() => {
    initialSocket();
  }, []);

  const initialSocket = () => {
    const socket = io('http://localhost:8080/');

    socket.on('message', (newData: any) => {
      setCurrentData(newData);
    });
  }

  const isValid = (detectionResult: DetectionResult) => {
    return detectionResult.data && detectionResult.length && detectionResult.rate ? 'Valid' : 'Invalid'
  }

  return (
    <TableContainer component={Paper} style={{ height: '600px' }} className='scroll'>
      <Fade in={data.length !== 0}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell><Typography className='title-text'>ID</Typography></TableCell>
              <TableCell><Typography className='title-text'>Date</Typography></TableCell>
              <TableCell><Typography className='title-text'>Frame</Typography></TableCell>
              <TableCell><Typography className='title-text'>Status</Typography></TableCell>
              <TableCell><Typography className='title-text'>Reason</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentData.map((row: Data) => (
              <Fade in={true} key={row.uniqueId}>
                <TableRow>
                  <TableCell><Typography className='value-text'>{row.uniqueId}</Typography></TableCell>
                  <TableCell><Typography className='value-text'>{row.timestamp.split('T').join(' ').split('Z')}</Typography></TableCell>
                  <TableCell><Typography className='value-text'><Tooltip value={row.frame} /></Typography></TableCell>
                  <TableCell><Typography className='value-text'>{isValid(row.detectionResults)}</Typography></TableCell>
                  <TableCell><Typography className='value-text'>{Object.entries(row.detectionResults).map(result => {
                    return !result[1] ? toCamelCase(result[0]) + ' ' : null
                  })}</Typography></TableCell>
                </TableRow>
              </Fade>
            ))}
          </TableBody>
        </Table>
      </Fade>
    </TableContainer>
  )
}
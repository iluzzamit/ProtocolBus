import React from 'react'
import { Paper, Typography, IconButton, Switch } from '@material-ui/core'
import { Refresh } from '@material-ui/icons';
import { getData, getIsGenerating, toggleGenerator as toggleGeneratorAPI } from '../api/api';
import { Data } from '../model/Data';
import DataTable from './DataTable';
import { Accordion, AccordionSummary, AccordionDetails, LightTooltip } from './Style';


export default function Body() {
    const [index, setIndex] = React.useState(0);
    const [data, setData]: any = React.useState([]);
    const [isGenerating, setIsGenerating] = React.useState(false);

    React.useEffect(() => {
        initialData();
        initialIsGenerating();
    }, []);

    const initialData = async () => {
        const data: Data[] = await getData();
        setData(data.slice(0, 50));
    }

    const initialIsGenerating = async () => {
        const result: boolean = await getIsGenerating();
        setIsGenerating(result);
    }

    const toggleGenerator = async () => {
        await toggleGeneratorAPI();
        initialIsGenerating();
    }

    return (
        <Paper variant="outlined" square className="body-container">
            <Accordion square expanded={index === 0} onChange={() => setIndex(0)}>
                <AccordionSummary>
                    <div className='two-columns'>
                        <Typography className="accordion-title">Traffic</Typography>
                        <div>
                            <LightTooltip title="Refresh">
                                <IconButton onClick={initialData}>
                                    <Refresh />
                                </IconButton>
                            </LightTooltip>
                            <LightTooltip title={isGenerating ? 'Stop Generator' : 'Start Generator'}>
                                <Switch
                                    checked={isGenerating}
                                    onChange={toggleGenerator}
                                    color="primary"
                                    name="checkedB"
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                />
                            </LightTooltip>
                        </div>
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    <DataTable data={data} />
                </AccordionDetails>
            </Accordion>
            <Accordion square expanded={index === 1} onChange={() => setIndex(1)}>
                <AccordionSummary>
                    <Typography className="accordion-title">Logs</Typography>
                </AccordionSummary>
                <AccordionDetails>
                </AccordionDetails>
            </Accordion>
        </Paper>
    )
}
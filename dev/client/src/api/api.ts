import axios from "axios";
import { Data } from "../model/Data";


export async function getData(): Promise<Data[]> {
    const { data }: { data: Data[] } = await axios.get('http://localhost:8080/api/can-bus/');
    
    return data;
}

export async function getIsGenerating(): Promise<any> {
    const { data } = await axios.get('http://localhost:8080/api/can-bus/is-generating');
    
    return data;
}

export async function toggleGenerator(): Promise<any> {
    const result = await axios.put('http://localhost:8080/api/can-bus/toggle-generator');
    
    return result;
}
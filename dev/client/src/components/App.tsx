import React from 'react';
import Body from './Body';
import Header from './Header';
import { StyledContainer } from './Style';

export default function App() {
    return <StyledContainer>
        <div className='margin-left'>
            <Header />
            <Body />
        </div>
    </StyledContainer>
}
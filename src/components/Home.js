import React from 'react';
import Header from './Header';
import Shop from './shop';

function Home({executeScroll, shopRef}) {
    return (
        <>
        <Header executeScroll={executeScroll}/>
        <Shop shopRef={shopRef}/>
        </>
    )
}

export default Home

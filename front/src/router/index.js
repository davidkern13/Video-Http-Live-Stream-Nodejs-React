import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';

import HomePage from '../pages/Home';
import SearchPage from '../pages/Search';

function RouterContainer({Navigation}) {
    return (
        <>
            <Router>
                <Navigation />
                <Routes>
                    <Route path={'/'} element={<HomePage/>} />
                    <Route path={'/search'} element={<SearchPage/>} />
                </Routes>
            </Router>
        </>
    );
}

export default RouterContainer;
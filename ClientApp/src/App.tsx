import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Counter from './components/Counter';
import FetchData from './components/FetchData';
import ImageUpload from './components/ImageUpload';

import './custom.css'
import ImageList from './components/ImageList';

export default () => (
    <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/imageUpload' component={ImageUpload} />
        <Route path='/imageList' component={ImageList} />
        <Route path='/fetch-data/:startDateIndex?' component={FetchData} />
    </Layout>
);

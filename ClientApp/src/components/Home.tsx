import * as React from 'react';
import { connect } from 'react-redux';

const Home = () => (
  <div>
    
    <p>This is an application to demonstrate some Docker features</p>
  </div>
);

export default connect()(Home);

import React from 'react';
import './App.css';
import { Client } from './client';
import { useQuery } from '@apollo/client';
import { Schema } from './Quaries';

function App() {
  useQuery(Schema.getData, {
    client: Client,
    fetchPolicy: 'no-cache',
    onCompleted: (data) => {
      console.log(data, 'data');
    },
    onError: (err) => {
      console.log(err, 'err');
    },
  });
  return <h2 style={{ textAlign: 'center' }}>Get response headers</h2>;
}

export default App;

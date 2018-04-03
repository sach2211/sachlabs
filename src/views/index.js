import { render } from 'react-dom';
import React from 'react';
import Box from '../components/Block';

console.log("Does exist ? ", document.getElementById('react-root'));
render(<Box />, document.getElementById('react-root'));
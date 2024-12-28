import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'remixicon/fonts/remixicon.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { BrowserRouter as Router } from "react-router-dom";

<style>
@import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&display=swap');
</style>

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>,
)

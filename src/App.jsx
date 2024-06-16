import {  } from 'react'
import { Link } from "react-router-dom";

import './App.css'

function App() {
  return (
    <div className="App">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="rackets">Rackets</Link>
          </li>
          <li>
            <Link to="shoes">Shoes</Link>
          </li>
        </ul>
      </nav>

    </div>
  )
}

export default App

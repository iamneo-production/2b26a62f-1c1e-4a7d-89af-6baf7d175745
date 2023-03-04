import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import { createContext } from "react";
import { useState } from "react";
import { MantineProvider, ColorSchemeProvider } from '@mantine/core';
import { NavbarSimple } from "./Components/SideBar";
import Aqi  from "./Pages/Aqi";
const FoodContext = createContext();

function App() {
  const [food, setFood] = useState([]);
  const [colorScheme, setColorScheme] = useState('light');
  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  return (
      <div className="App" >
        <NavbarSimple />
        <FoodContext.Provider value={{ food, setFood }}>
          <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
          <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
              <Routes>
                <Route path="/" element={< Home />} />
                <Route path="/aqi" element={< Aqi />} />
                <Route path="*" element={<h1>404</h1>} />
              </Routes>
          </MantineProvider>
          </ColorSchemeProvider>
        </FoodContext.Provider>
      </div>
  );
}

export { App, FoodContext };

import React, {useState,useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';

import Search from './components/search';
import DataGrid from './components/datagrid';
import { getInactiveContracts} from './apiService';

function App() {
  const [inactiveContracts, setInactiveContracts] = useState([]);

  useEffect(() => {
    fetchInactiveContracts();
  }, []);
  const fetchInactiveContracts= async () => {
    try {
      const response = await getInactiveContracts();
      setInactiveContracts(response.data);
    } catch (error) {
      console.error('Error fetching contract data:', error);
    }
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Search contracts={inactiveContracts} />} />
          <Route path="/datagrid" element={<DataGrid />} />
          <Route path="*" element={<Outlet />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
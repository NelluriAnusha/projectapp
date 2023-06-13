import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { searchContracts } from '../apiService';
function Search() {
  const history = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [contracts, setContracts] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await searchContracts(searchTerm);
      setContracts(response.data);
    } catch (error) {
      console.error('Error searching contracts:', error);
    }
  };
  const handleRowClick = (contractId) => {
    history.push(`/datagrid/${contractId}`);
  };
  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <table>
        <thead>
          <tr>
            <th>Contract ID</th>
            <th>Contract Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {contracts.map((contract) => (
            <tr key={contract.contractId} onClick={() => handleRowClick(contract.contractId)}>
              <td>{contract.contractId}</td>
              <td>{contract.contractName}</td>
              <td>{contract.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Search;
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getInactiveContracts, inactivateContract } from '../apiService';
function DataGrid() {
  const { contractId } = useParams();
  const [contractData, setContractData] = useState(null);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await getInactiveContracts(contractId);
      setContractData(response.data);
    } catch (error) {
      console.error('Error fetching contract data:', error);
    }
  };
  const handleInactivate = async () => {
    try {
      await inactivateContract(contractId);
      console.log('Contract inactivated successfully.');
      // You can perform additional actions after inactivating the contract
    } catch (error) {
      console.error('Error inactivating contract:', error);
    }
  };
  return (
    <div>
      <h2>Data Grid for Contract ID: {contractId}</h2>
      <button onClick={handleInactivate}>Inactivate Contract</button>
      {contractData ? (
        <table>
          <thead>
            <tr>
              <th>Field 1</th>
              <th>Field 2</th>
              <th>Field 3</th>
              {/* Add more field headers as needed */}
            </tr>
          </thead>
          <tbody>
            {contractData.map((row) => (
              <tr key={row.id}>
                <td>{row.field1}</td>
                <td>{row.field2}</td>
                <td>{row.field3}</td>
                {/* Render more fields from the contractData object */}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading contract data...</p>
      )}
    </div>
  );
}
export default DataGrid;
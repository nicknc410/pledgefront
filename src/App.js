import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
function App() {


  const [totalCount, setTotalCount] = useState(0);

  const handleClick = () => {
    const numFuckValue = document.getElementById("numFuck").value;
    if (numFuckValue === '') {
      alert('Enter the number of fuck ups dumbass');
    } 
    else if(Number(numFuckValue) <= 0){
      alert('Fuck u pledge');
    }
    else {
      const name = document.getElementById("pledgeName").value;
      const reason = document.getElementById("reason").value;
      const data = {"name":name, "reason": reason, "count": numFuckValue};
      fetch("https://thetaxi.onrender.com:10000/addFuck", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    })
      .catch(err => console.error(err));
      window.location.reload();
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch('https://thetaxi.onrender.com:10000/getFuck'); // Use the correct endpoint URL here
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setTotalCount(data.totalCount); // Update the state with the fetched total count
    } catch (error) {
      console.error("Fetching total count failed:", error);
    }
    };

    useEffect(() => {
      fetchData();
    }, []); 
  return (
    <div>
      <h1 id = "FuckUps"> Fuck ups </h1>
      <label for="numFuck">Enter number of fuck ups:</label>
      <input type='number' id = "numFuck"></input><br>

      </br>

      <label for="pledgeName">Enter pledge:</label>
      <select id="pledgeName">
        <option value="Sachin">Sachin</option>
        <option value="NoahPeddie">Noah Peddie</option>
        <option value="NoahF">Noah Feig</option>
        <option value="NoahPlattus">NoahPlattus</option>
        <option value="Aviv">Aviv</option>
        <option value="Harrison">Harrison</option>
        <option value="Harry">Harry</option>
        <option value="Adam">Adam</option>
        <option value="Charlie">Charlie</option>
        <option value="Danny">Danny</option>
        <option value="Evan">Evan</option>
        <option value="Henry">Henry</option>
        <option value="Evan">Evan</option>
        <option value="Justin">Justin</option>
        <option value="Rory">Rory</option>
        <option value="Gilbert">Gilbert</option>
        <option value="Sean">Sean</option>
        <option value="Shree">Shree</option>
        <option value="Drew">Drew</option>
      </select><br></br>
      <p> Reason</p>
      <input type="text" id="reason" style={{ width: '300px', height : '150px' }} />
      <button onClick={handleClick}> Enter </button>
      <h2> Total Fuck ups: {totalCount}</h2>
      
    </div>
  );
}

export default App;

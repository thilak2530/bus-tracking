import React, { useState, useEffect } from "react";
import axios from "axios";

function Admin() {
  const [buses, setBuses] = useState([]);
  const [newBus, setNewBus] = useState({
    bus: "",
    stops: [{ name: "", arrival: "", departure: "" }]
  });

  useEffect(() => {
    axios.get("http://localhost:3001/api/bus-timings")
      .then(res => setBuses(res.data));
  }, []);

  const handleBusChange = (e) => {
    setNewBus({ ...newBus, bus: Number(e.target.value) });
  };

  const handleStopChange = (index, field, value) => {
    const updatedStops = [...newBus.stops];
    updatedStops[index][field] = value;
    setNewBus({ ...newBus, stops: updatedStops });
  };

  const addStop = () => {
    setNewBus({ ...newBus, stops: [...newBus.stops, { name: "", arrival: "", departure: "" }] });
  };

  const submitBus = () => {
    axios.post("http://localhost:3001/api/bus-timings", newBus)
      .then(() => {
        alert("Bus timing added!");
        setNewBus({ bus: "", stops: [{ name: "", arrival: "", departure: "" }] });
      });
  };

  return (
    <div>
      <h2>Admin - Add Bus Timings</h2>
      <input
        type="number"
        placeholder="Bus No"
        value={newBus.bus}
        onChange={handleBusChange}
      />
      {newBus.stops.map((stop, index) => (
        <div key={index}>
          <input
            placeholder="Stop name"
            value={stop.name}
            onChange={e => handleStopChange(index, "name", e.target.value)}
          />
          <input
            placeholder="Arrival"
            value={stop.arrival}
            onChange={e => handleStopChange(index, "arrival", e.target.value)}
          />
          <input
            placeholder="Departure"
            value={stop.departure}
            onChange={e => handleStopChange(index, "departure", e.target.value)}
          />
        </div>
      ))}
      <button onClick={addStop}>Add Stop</button>
      <button onClick={submitBus}>Save Bus</button>

      <h3>All Buses:</h3>
      {buses.map(bus => (
        <div key={bus.bus}>
          <strong>Bus {bus.bus}</strong>
          <ul>
            {bus.stops?.map((s, i) => (
              <li key={i}>{s.name}: {s.arrival} - {s.departure}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Admin;
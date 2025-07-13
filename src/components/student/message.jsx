import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

function StudentHome() {
  const [updates, setUpdates] = useState([]);
  const busNo = parseInt(localStorage.getItem("usernames")); // ensure it's a number

  useEffect(() => {
    if (!busNo) return; // if bus number not selected, skip everything
    

    // 1. Fetch stored updates when student logs in
    fetch(`http://localhost:3001/student/get-updates/${busNo}`)
      .then((res) => res.json())
      .then((data) => setUpdates(data))
      .catch((err) => console.error("Fetch error:", err));

    // 2. Listen for live updates via Socket.IO
    socket.on("bus-data", (data) => {
      if (parseInt(data.busNo) === busNo) {
        setUpdates((prev) => [...prev, data]);
      }
    });

    return () => {
      socket.off("bus-data");
    };
  }, [busNo]);

  return (
    <div className="message-home-main">
      <div className="message-home">
        <h2>Live Bus Updates</h2>
        {updates.length === 0 && <p>Bus Ready to Start</p>}
        {updates.map((item, index) => (
          <div key={index}>
            <p>🚌 Bus is at {item.stop} ({item.time})</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentHome;
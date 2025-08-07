import { useEffect, useRef, useState } from "react";
import axios from "axios";

function DriverTracker() {
  const watchIdRef = useRef(null);
  const [tripActive, setTripActive] = useState(false);
  const [stops, setStops] = useState([]);
  const triggeredStopsRef = useRef(new Set());

  // ✅ Fetch stop coordinates for this bus from backend
  useEffect(() => {
    const fetchStops = async () => {
      const busno = localStorage.getItem("busno");
      if (busno) {
        try {
          const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/bus-stops?busNo=${busno}`);
          setStops(res.data); // Expected format: [{ stop_key, stop_name, lat, lng }, ...]
        } catch (err) {
          console.error("❌ Error fetching stops:", err);
        }
      }
    };

    fetchStops();
  }, []);

  const toRadians = (degree) => degree * (Math.PI / 180);

  const getDistanceMeters = (lat1, lon1, lat2, lon2) => {
    const R = 6371000; // Earth radius in meters
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const startTracking = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    setTripActive(true);

    watchIdRef.current = navigator.geolocation.watchPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const busno = localStorage.getItem("busno");

        console.log("Live Location:", latitude, longitude);

        // ✅ Send location to backend
        try {
          await axios.post(`${process.env.REACT_APP_BASE_URL}/update_location`, {
            driver: busno,
            latitude,
            longitude,
          });
          console.log("✅ Location updated");
        } catch (err) {
          console.error("❌ Error updating location:", err.response?.data || err.message);
        }

        // ✅ Check if near any stop
        for (const stop of stops) {
          const distance = getDistanceMeters(latitude, longitude, stop.lat, stop.lng);

          if (distance < 150 && !triggeredStopsRef.current.has(stop.stop_key)) {
            triggeredStopsRef.current.add(stop.stop_key);
            console.log(`✅ Reached ${stop.stop_name}, auto-triggering!`);

            try {
              await axios.post(`${process.env.REACT_APP_BASE_URL}/stop_reached`, {
                stop_key: stop.stop_key,
                stop_name: stop.stop_name,
                bus_number: busno,
                timestamp: new Date().toISOString(),
              });
              console.log("✅ stop_reached sent successfully");
            } catch (err) {
              console.error("❌ Error sending stop_reached:", err.response?.data || err.message);
            }

            // ✅ Update localStorage so UI reflects checked status
            const storageKey = `checkedStops_${busno}`;
            const prev = JSON.parse(localStorage.getItem(storageKey)) || [];
            const updated = [...new Set([...prev, stop.stop_name])];
            localStorage.setItem(storageKey, JSON.stringify(updated));
          }
        }
      },
      (error) => {
        console.error("Error getting location:", error);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 1000,
        timeout: 3000,
      }
    );
  };

  const stopTracking = () => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    setTripActive(false);
  };

  // Auto-start tracking when bus number and stops are available
  useEffect(() => {
    const busno = localStorage.getItem("busno");
    if (busno && stops.length > 0) {
      startTracking();
    } else {
      stopTracking();
    }

    return stopTracking; // Clean up on unmount
  }, [stops]);

  return null; // Invisible background tracker component
}

export default DriverTracker;
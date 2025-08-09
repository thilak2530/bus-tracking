import { useEffect, useRef, useState } from "react";
import axios from "axios";

function DriverTracker() {
  const watchIdRef = useRef(null);
  const [tripActive, setTripActive] = useState(false);
  const [stops, setStops] = useState([]);
  const triggeredStopsRef = useRef(new Set());

  // ✅ Always use the environment variable
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  if (!BASE_URL) {
    console.error("❌ Missing REACT_APP_BASE_URL in .env file");
  }

  // ✅ Fetch stops for the current bus
  useEffect(() => {
    const fetchStops = async () => {
      const busno = localStorage.getItem("busno");

      if (!busno) {
        console.warn("⚠ No bus number found in localStorage, skipping fetchStops");
        return;
      }

      try {
        const res = await axios.get(`${BASE_URL}/bus-stops?busNo=${busno}`);
        if (Array.isArray(res.data)) {
          setStops(res.data);
          console.log("✅ Stops fetched:", res.data);
        } else {
          console.error("❌ Invalid stops data format:", res.data);
        }
      } catch (err) {
        console.error("❌ Error fetching stops:", err.response?.data || err.message);
      }
    };

    fetchStops();
  }, [BASE_URL]);

  const toRadians = (degree) => degree * (Math.PI / 180);

  const getDistanceMeters = (lat1, lon1, lat2, lon2) => {
    const R = 6371000;
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) ** 2;
    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
  };

  const startTracking = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported in this browser.");
      return;
    }

    const busno = localStorage.getItem("busno");
    if (!busno) {
      console.warn("⚠ Cannot start tracking, busno is missing");
      return;
    }

    setTripActive(true);

    watchIdRef.current = navigator.geolocation.watchPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        console.log("📍 Live Location:", latitude, longitude);

        // ✅ Send location to backend
        try {
          await axios.post(`${BASE_URL}/update_location`, {
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
            console.log(`✅ Reached ${stop.stop_name}, sending stop_reached...`);

            try {
              await axios.post(`${BASE_URL}/stop_reached`, {
                stop_key: stop.stop_key,
                stop_name: stop.stop_name,
                bus_number: busno,
                timestamp: new Date().toISOString(),
              });
              console.log("✅ stop_reached sent successfully");
            } catch (err) {
              console.error("❌ Error sending stop_reached:", err.response?.data || err.message);
            }

            // ✅ Update checked stops in localStorage
            const storageKey = `checkedStops_${busno}`;
            const prev = JSON.parse(localStorage.getItem(storageKey)) || [];
            const updated = [...new Set([...prev, stop.stop_name])];
            localStorage.setItem(storageKey, JSON.stringify(updated));
          }
        }
      },
      (error) => {
        console.error("❌ Error getting location:", error);
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

  useEffect(() => {
    const busno = localStorage.getItem("busno");
    if (busno && stops.length > 0) {
      startTracking();
    } else {
      stopTracking();
    }
    return stopTracking;
  }, [stops]);

  return null;
}

export default DriverTracker;
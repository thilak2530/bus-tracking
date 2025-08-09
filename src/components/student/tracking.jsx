import { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import "../css/trackor.css";
import Sidebox from "./sidebox";

function TrackingBus() {
  const mapRef = useRef(null);
  const googleMap = useRef(null);
  const liveMarkerRef = useRef(null);
  const [stops, setStops] = useState([]);

  // ✅ Always get from environment
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  if (!BASE_URL) {
    console.error("❌ Missing REACT_APP_BASE_URL in .env");
  }

  // ✅ Fetch stops for the selected bus
  useEffect(() => {
    const fetchStops = async () => {
      const busno = localStorage.getItem("usernames");
      if (!busno) {
        console.warn("⚠ No bus number found in localStorage");
        return;
      }

      try {
        const response = await fetch(`${BASE_URL}/get-bus-timings/${busno}`, {
          method: "GET",
          headers: { "Accept": "application/json" },
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        console.log("✅ Fetched Bus Stops:", data);
        setStops(data);
      } catch (err) {
        console.error("❌ Error fetching stops:", err);
      }
    };

    fetchStops();
  }, [BASE_URL]);

  // ✅ Load Google Map & show bus stops
  useEffect(() => {
    if (stops.length === 0) return;

    const loader = new Loader({
      apiKey: "AIzaSyBO_8ovGlHfaswgc-OurhJyFJs-GJyo4rI",
      version: "weekly",
      libraries: ["marker"],
      mapIds: ["72a9dad0545427bfe196f8bf"],
    });

    loader.load().then(() => {
      const google = window.google;
      const map = new google.maps.Map(mapRef.current, {
        center: { lat: 17.9784, lng: 79.5941 },
        zoom: 15,
        mapId: "72a9dad0545427bfe196f8bf",
      });

      googleMap.current = map;
      const { AdvancedMarkerElement } = google.maps.marker;

      stops.forEach((stop) => {
        const info = new google.maps.InfoWindow({
          content: `<div><b>${stop.name}</b></div>`,
        });

        const marker = new AdvancedMarkerElement({
          position: { lat: stop.lat, lng: stop.lng },
          map,
          title: stop.name,
        });

        marker.addListener("click", () => info.open(map, marker));
      });
    });
  }, [stops]);

  // ✅ Update bus live location every 3 seconds
  useEffect(() => {
    const intervalId = setInterval(async () => {
      const driver = localStorage.getItem("usernames");
      if (!driver) {
        console.warn("⚠ No driver name found, skipping location fetch");
        return;
      }

      try {
        const res = await fetch(`${BASE_URL}/live-location/${driver}`, {
          method: "GET",
          headers: { "Accept": "application/json" },
        });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        // 🔍 Check if response is actually JSON
        const textData = await res.text();
        try {
          const data = JSON.parse(textData);

          if (data && window.google && googleMap.current) {
            const google = window.google;
            const position = new google.maps.LatLng(data.latitude, data.longitude);
            const { AdvancedMarkerElement } = google.maps.marker;

            if (liveMarkerRef.current) {
              liveMarkerRef.current.position = position;
            } else {
              const iconImage = document.createElement("img");
              iconImage.src = "https://www.nicepng.com/png/detail/317-3171623_file-emoji-u1f68d-svg-bus-emoji.png";
              iconImage.style.width = "50px";
              iconImage.style.height = "50px";

              const marker = new AdvancedMarkerElement({
                position,
                map: googleMap.current,
                content: iconImage,
                title: "Live Bus Location",
              });

              liveMarkerRef.current = marker;
            }

            googleMap.current.setCenter(position);
          }
        } catch (jsonErr) {
          console.error("❌ Live location is not JSON. Response:", textData);
        }
      } catch (error) {
        console.error("❌ Error fetching live location:", error);
      }
    }, 3000);

    return () => clearInterval(intervalId);
  }, [BASE_URL]);

  return (
    <div className="trackor-main">
      <Sidebox />
      <div className="maps" ref={mapRef}></div>
    </div>
  );
}

export default TrackingBus;
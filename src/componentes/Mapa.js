'use client';

import { useEffect } from "react";
import "./Mapa.css"

const Mapa = ({ lat, lng }) => {
  useEffect(() => {
    if (window.google && lat && lng) {
      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat, lng },
        zoom: 15
      });

      new window.google.maps.Marker({
        position: { lat, lng },
        map
      });
    }
  }, [lat, lng]);

  return <div id="map" style={{ height: "500px" }} />;
};

export default Mapa;

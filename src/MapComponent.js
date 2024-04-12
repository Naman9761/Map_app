import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = () => {
    const mapRef = useRef(null);
  
    useEffect(() => {
      if (!mapRef.current) {
        mapRef.current = L.map('map').setView([51.505, -0.09], 13);
        const defaultLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
        });
  
        const alternateLayer = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenTopoMap contributors',
        });
  
        const baseMaps = {
          Default: defaultLayer,
          Alternate: alternateLayer,
        };
  
        L.control.layers(baseMaps).addTo(mapRef.current);
        defaultLayer.addTo(mapRef.current);
      }
  
      return () => {
        mapRef.current.remove();
        mapRef.current = null;
      };
    }, []);
  
    return (
      <div>
        <div id="map" className="Map-container"></div>
        <div className="Layer-buttons">
          <button onClick={() => mapRef.current?.eachLayer(layer => layer.remove())}>Clear Layers</button>
          </div>
      </div>
    );
  };
  


export default MapComponent;

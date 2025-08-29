import React, { useEffect, useRef } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat, toLonLat } from "ol/proj";
import { Feature } from "ol";
import Point from "ol/geom/Point";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { Icon, Style } from "ol/style";

const LocationPicker = ({ initialCoords = [76.28, 9.98], setFormData }) => {
  const mapRef = useRef();
  const markerSource = new VectorSource();
    
  useEffect(() => {
    const markerLayer = new VectorLayer({ source: markerSource });

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({ source: new OSM() }),
        markerLayer,
      ],
      view: new View({
        center: fromLonLat(initialCoords),
        zoom: 14,
      }),
    });

    map.on("click", (event) => {
      const coords = toLonLat(event.coordinate); // [lon, lat]
        setFormData((prev) => ({...prev, lat: coords[0], lon: coords[1]}))
      

      // Clear old marker
      markerSource.clear();

      // Add new marker
      const marker = new Feature({
        geometry: new Point(event.coordinate),
      });
      marker.setStyle(
        new Style({
          image: new Icon({
            src: "https://openlayers.org/en/latest/examples/data/icon.png",
            anchor: [0.5, 1],
            scale: 0.8,
          }),
        })
      );
      markerSource.addFeature(marker);
    });

    return () => map.setTarget(undefined);
  }, []);

  return <div ref={mapRef} style={{ width: "100%", gridColumn: '1/-1', height: "400px" }} />;
};

export default LocationPicker;

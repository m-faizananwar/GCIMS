/* eslint-disable @typescript-eslint/no-require-imports */
"use client"
import { LatLngExpression } from 'leaflet'
import L from 'leaflet';
import React, { useEffect } from 'react'
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet'

import 'leaflet/dist/leaflet.css';

// @ts-expect-error: It works but shows an error. Shut up.
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

interface MapProps {
    position: LatLngExpression;
    zoom?: number | undefined;
    scrollZoom?: boolean;
}

const Map: React.FC<MapProps> = ({ position, zoom }) => {

    const MapComponent = () => {
        const map = useMap();

        useEffect(() => {
            map.invalidateSize();
        }, [map])

        return null;
    }
    return (
        <div className="h-full w-full">
            <MapContainer center={position} zoom={zoom} scrollWheelZoom={false} style={{ height: '100%', width: '100%', borderRadius: '0.75 rem'}}>
                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={position} riseOnHover={true}>
                </Marker>
                <MapComponent />
            </MapContainer>
        </div>
    )
}

export default Map
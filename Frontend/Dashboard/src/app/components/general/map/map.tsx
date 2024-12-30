/* eslint-disable @typescript-eslint/no-require-imports */
"use client"
import { LatLng, LatLngExpression } from 'leaflet'
import L from 'leaflet';
import React, { useEffect, useState } from 'react'
import { Circle, MapContainer, Marker, Rectangle, TileLayer, useMap, useMapEvents } from 'react-leaflet'

import 'leaflet/dist/leaflet.css';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

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
            <MapContainer center={position} zoom={zoom} scrollWheelZoom={false} style={{ height: '100%', width: '100%', borderRadius: '0.75 rem' }}>
                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={position} riseOnHover={true}>
                </Marker>
                <MapComponent />
            </MapContainer>
        </div>
    )
}

export default Map

interface ClickableMapProps {
    onClick: (e: L.LeafletMouseEvent) => void;
    center?: [number, number];
    position?: [number, number];
    defaultZoom?: number;
}

export const ClickableMap: React.FC<ClickableMapProps> = ({ onClick, center: defaultCenter, defaultZoom, position: givenPos }) => {
    const [position, setPosition] = useState<[number, number] | undefined>(givenPos);
    const [center, setCenter] = useState<[number, number] | undefined>(defaultCenter);

    useEffect(() => {
        if (givenPos) {
            setPosition(givenPos);
        }
    }, [givenPos]);

    useEffect(() => {
        if (defaultCenter) {
            setCenter(defaultCenter);
        }
    }, [defaultCenter]);

    const LocationMarker = () => {
        useMapEvents({
            click(e) {
                setPosition([e.latlng.lat, e.latlng.lng]);
                onClick(e);
            },
        });
        return position === undefined ? null : (
            <Marker position={position}></Marker>
        );
    };

    const MapCenterUpdater = () => {
        const map = useMap()
        useEffect(() => {
            if (center) {
                map.setView(center)
            }
        }, [center, map])
        return null
    }

    return (
        <MapContainer center={center || [51.505, -0.09]} zoom={defaultZoom || 13} style={{ height: '100%', width: '100%', borderRadius: '0.75rem' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker />
            <MapCenterUpdater />
        </MapContainer>
    );
};

interface MapSearchProps extends ClickableMapProps {
    position2?: [number, number]
    radius?: boolean;
}

export const MapSearch: React.FC<MapSearchProps> = ({ onClick, center: defaultCenter, defaultZoom, position: firstPos, position2: secondPos, radius: givenRadius }) => {

    const router = useRouter()              // TODO: Implement functionality
    const pathname = usePathname()          // TODO: Implement functionality
    const searchParams = useSearchParams()  // TODO: Implement functionality

    const customMarkerIcon = L.divIcon({
        className: 'w-full h-full rounded-full bg-secondary outline outline-2 outline-black hover:bg-black',
        // html: '<div style="background-color: #E6A22A;  width: 10px; height: 10px; border-radius: 50%"></div>',
        html: '<div></div>',
        iconSize: [10, 10],
        iconAnchor: [5, 5]
    })

    const [firstPosition, setFirstPosition] = useState<[number, number] | undefined>(firstPos);
    const [secondPosition, setSecondPosition] = useState<[number, number] | undefined>(secondPos);
    const [radius, setRadius] = useState<boolean | undefined>(givenRadius)
    const [center, setCenter] = useState<[number, number] | undefined>(defaultCenter);

    useEffect(() => {
        setFirstPosition(firstPos)
        setSecondPosition(secondPos)
        setRadius(givenRadius)
    }, [firstPos, secondPos, givenRadius]);

    useEffect(() => {
        if (defaultCenter) {
            setCenter(defaultCenter);
        }
    }, [defaultCenter]);

    const ClickHandler = () => {
        useMapEvents({
            click(e) {
                onClick(e);
            },
        });
        return null
        // return firstPosition === undefined ? null : (
        //     <Marker position={firstPosition}></Marker>
        // );
    };

    const PositionMarker = (props: { position?: [number, number] }) => {
        return props.position === undefined ? null : (
            <Marker position={props.position} icon={customMarkerIcon}></Marker>
        )
    }

    const MapCenterUpdater = () => {
        const map = useMap()
        useEffect(() => {
            if (center) {
                map.setView(center)
            }
        }, [center, map])
        return null
    }

    const bounds = (firstPosition && secondPosition && !radius) ? [firstPosition, secondPosition] : undefined
    
    return (
        <div className="w-full flex flex-col gap-6 items-center">
            <div className="w-full h-[400px] flex gap-3 items-center">
                <MapContainer center={center || [51.505, -0.09]} zoom={defaultZoom || 13} style={{ height: '100%', width: '100%', borderRadius: '0.75rem' }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {!radius && bounds && <Rectangle bounds={bounds} pathOptions={{ color: '#E6A22A', fillOpacity: 0.5 }} />}
                    {firstPosition && secondPosition && radius && <Circle center={new LatLng(firstPosition[0], firstPosition[1])} radius={(new LatLng(firstPosition[0], firstPosition[1])).distanceTo(new LatLng(secondPosition[0], secondPosition[1]))} pathOptions={{ color: '#E6A22A', fillOpacity: 0.5 }} />}
                    <ClickHandler />
                    <PositionMarker position={firstPosition} />
                    <PositionMarker position={secondPosition} />
                    <MapCenterUpdater />
                </MapContainer>
            </div>
        </div>)
}
import { MapContainer, TileLayer, CircleMarker } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/dist/styles.min.css";
import { Sensor } from '../types/Sensor'
import MarkerClusterGroup from 'react-leaflet-markercluster';
import SensorTooltip from './SensorTooltip';
import { useState } from 'react';

interface Props {
    sensors: Sensor[]
    center: [number, number]
}

interface Active {
    sensor: Sensor
    center: [number, number]
    active: boolean
}

const Map = (props: Props) => {
    const active: Active = {
        sensor: {
            name: "",
            id: "",
            lat: 0,
            lng: 0
        },
        center: [0, 0],
        active: false
    }
    const [activeSensor, setActiveSensor] = useState(active);

    return (
        <MapContainer center={props.center} zoom={13} minZoom={3} style={{ width: "100%", position: "absolute", height: 700, bottom: 0, zIndex: 500, }}
            updateWhenZooming={false}
            updateWhenIdle={true}
            preferCanvas={true}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MarkerClusterGroup animate={true}>
                {
                    props.sensors.map(sensor => {
                        return (
                            <CircleMarker key={sensor.id} center={[sensor.lat, sensor.lng]} opacity={1}
                                radius={30}
                                weight={1}
                                eventHandlers={{
                                    click: () => {
                                        setActiveSensor({ sensor: sensor, center: [sensor.lat, sensor.lng], active: false });
                                        setActiveSensor({ sensor: sensor, center: [sensor.lat, sensor.lng], active: true });
                                        console.log(1);
                                    },

                                }}
                            >
                            </CircleMarker>
                        )
                    })
                }
            </MarkerClusterGroup>
            {activeSensor.active &&
                <SensorTooltip
                    sensor={activeSensor.sensor}
                    location={activeSensor.center}
                />
            }
        </MapContainer >
    )
}

export default Map
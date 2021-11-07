import React from 'react'
import dynamic from 'next/dynamic'
import { Sensor } from '../types/Sensor'

interface Props {
    sensors: Sensor[]
    center: [number, number]
}

function HomePage({ sensors, center }: Props) {
    const Map = React.useMemo(() => dynamic(
        () => import('../components/Map'),
        {
            loading: () => <p>A map is loading</p>,
            ssr: false
        }
    ), [/* list variables which should trigger a re-render here */])
    return <Map sensors={sensors} center={center} />
}

function getCenter(sensors: Sensor[]): [number, number] {
    const lat = sensors.reduce((acc, cur) => acc + cur.lat, 0) / sensors.length
    const lng = sensors.reduce((acc, cur) => acc + cur.lng, 0) / sensors.length
    return [lat, lng]
}

export async function getStaticProps(): Promise<{ props: Props }> {
    // const response = await fetch('http://localhost:3000/api/sensors')
    // const sensors = await response.json()
    const sensors = [{ name: "TestBed", id: "1", lat: -41.314220, lng: 174.822680 }, { name: "Vic Uni", id: "2", lat: -41.289840, lng: 174.769120 }];
    return {
        props: {
            sensors,
            center: getCenter(sensors)
        }
    }
}

export default HomePage
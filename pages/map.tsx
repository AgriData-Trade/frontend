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
    const response = await fetch('http://localhost:3000/api/sensors')
    const sensors = await response.json()
    return {
        props: {
            sensors,
            center: getCenter(sensors)
        }
    }
}

export default HomePage
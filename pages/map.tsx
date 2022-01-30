import React from 'react'
import dynamic from 'next/dynamic'
import { Node } from '../types/Node'
import useSWR from 'swr'
import { NextPage } from 'next'
import { useNodes } from '../hooks/useNodes'

const Map: NextPage = () => {
    const { nodes, isLoading, isError } = useNodes();
    const Map = React.useMemo(() => dynamic(
        () => import('../components/Map'),
        {
            loading: () => <p>A map is loading</p>,
            ssr: false
        }
    ), [/* list variables which should trigger a re-render here */])
    return <Map nodes={nodes} center={getCenter(nodes)} />
}

function getCenter(sensors: Node[]): [number, number] {
    const lat = sensors.reduce((acc, cur) => acc + cur.location, 0) / sensors.length
    const lng = sensors.reduce((acc, cur) => acc + cur.location, 0) / sensors.length
    return [lat, lng]
}

export default Map
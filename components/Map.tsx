import { MapContainer, TileLayer, CircleMarker } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/dist/styles.min.css";
import { Node } from '../types/Node'
import MarkerClusterGroup from 'react-leaflet-markercluster';
import SensorTooltip from './SensorTooltip';
import { useState } from 'react';

interface Props {
    nodes: Node[]
    center: [number, number]
}

interface Active {
    node: Node
    center: [number, number]
    active: boolean
}

const Map = (props: Props) => {
    const active: Active = {
        node: {
            nodeName: "",
            id: "",
            location: 0
        },
        center: [0, 0],
        active: false
    }
    const [activeNode, setActiveNode] = useState(active);

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
                    props.nodes.map(node => {
                        return (
                            <CircleMarker key={node.id} center={[node.location, node.location]} opacity={1}
                                radius={30}
                                weight={1}
                                eventHandlers={{
                                    click: () => {
                                        setActiveNode({ node: node, center: [node.location, node.location], active: false });
                                        setActiveNode({ node: node, center: [node.location, node.location], active: true });
                                    },

                                }}
                            >
                            </CircleMarker>
                        )
                    })
                }
            </MarkerClusterGroup>
            {activeNode.active &&
                <SensorTooltip
                    node={activeNode.node}
                />
            }
        </MapContainer >
    )
}

export default Map
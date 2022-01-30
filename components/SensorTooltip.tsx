import { Node } from '../types/Node'

interface Props {
    node: Node;
}


const SensorTooltip = (props: Props) => {
    return (
        <div className='sensorTooltip'>
            <div>Name: {props.node.nodeName}</div>
            <div>Location: {props.node.location}</div>
            <div>ID: {props.node.id}</div>
        </div>
    )
}

export default SensorTooltip;
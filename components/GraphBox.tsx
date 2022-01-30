import Graph, { GraphProps } from "./Graph"

const GraphBox = (props: GraphProps) => {
    return (
        <div className='rounded-md shadow-md bg-white max-w-sm'>
            <div className="">
                <div className="text-2xl font-bold">{props.details.title} </div>
            </div >

            <div className=''>
                <Graph node={props.node} data={props.data} details={props.details} ></Graph>
            </div>
        </div >
    )
}

export default GraphBox
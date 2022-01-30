import React from 'react'
import { Node } from '../types/Node'
import useSWR from 'swr'
import { NextPage } from 'next'

const Nodes: NextPage = () => {
    const { data } = useSWR<Node[]>('http://localhost:3000/api/nodes')
    const nodes = data === undefined ? [] : data
    console.log(nodes)

    return (
        <div></div>
    )
}

export default Nodes
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Sensor } from '../../types/Sensor'


export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Sensor[]>
) {
    res.status(200).json([{ name: "TestBed", id: "1", lat: -41.314220, lng: 174.822680 }, { name: "Vic Uni", id: "2", lat: -41.289840, lng: 174.769120 }])
}

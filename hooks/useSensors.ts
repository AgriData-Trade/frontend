import useSWR from "swr"
import { Log } from "../types/Log"
import { fetcher } from "./fetcher"

interface UseSensors {
    logs: Log[]
    isLoading: boolean
    isError: boolean
}

export function useSensors(id: string): UseSensors {
    const { data, error } = useSWR(`/api/sensors/${id}`, fetcher)

    return {
        logs: data,
        isLoading: !error && !data,
        isError: error
    }
}
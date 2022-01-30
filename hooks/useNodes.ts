import useSWR from "swr"
import { fetcher } from "./fetcher"

interface UseNodes {
    nodes: Node[]
    isLoading: boolean
    isError: boolean
}

export function useNodes(): UseNodes {
    const { data, error } = useSWR(`/api/nodes`, fetcher)

    return {
        nodes: data,
        isLoading: !error && !data,
        isError: error
    }
}
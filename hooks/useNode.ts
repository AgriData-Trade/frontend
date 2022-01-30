import useSWR from "swr"
import { fetcher } from "./fetcher"

interface UseNode {
    node: Node
    isLoading: boolean
    isError: boolean
}

export function useNode(id: string): UseNode {
    const { data, error } = useSWR(`/api/node/${id}`, fetcher)

    return {
        node: data,
        isLoading: !error && !data,
        isError: error
    }
}
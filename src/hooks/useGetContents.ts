import { useQuery } from "@tanstack/react-query"

interface Content {
    id: number
    username: string
    created_datetime: Date
    title: string
    content: string
}

interface GetContentsResponse {
    count: number
    next: string | null
    previous: string | null
    results: Content[]
}

export function useGetContents() {
    return useQuery(['contents'], async () => {
        const response = await fetch('https://dev.codeleap.co.uk/careers/')
        const data = await response.json() as GetContentsResponse
    
        return data
    })
}
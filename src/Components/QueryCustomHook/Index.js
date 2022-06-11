import axios from 'axios';
import { useQuery } from 'react-query';

// Custom Query component for data get

export const CustomQueryHookGet = (name, url, enable) => {
    return useQuery(
        name,
        () => {
            return axios.get(url, {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
            });
        },
        {
            onSuccess: (data) => {
                console.log(data);
            },
            enabled: enable,
            onError: (error) => {
                console.log(error)
            },
            refetchInterval: false,
            refetchOnWindowFocus: false,
        }
    );
}

// Custom Query components for get by Id

export const CustomQueryHookById = (name, id, url, enable) => {
    return useQuery([name, id], () => axios.get(url + id), {
        onSuccess: (data) => {
            console.log(data);
        },
        enabled: enable,
        onError: (error) => {
            console.log(error)
        },
        refetchInterval: false,
        refetchOnWindowFocus: false,
    });
}

// Custom Query component for post data

export const CustomQueryHookPost = (name, url, enable) => {
    return useQuery(
        name,
        () => {
            return axios.post(url, {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
            });
        },
        {
            onSuccess: (data) => {
                console.log(data);
            },
            enabled: enable,
            onError: (error) => {
                console.log(error)
            },
            refetchInterval: false,
            refetchOnWindowFocus: false,
        }
    );
}


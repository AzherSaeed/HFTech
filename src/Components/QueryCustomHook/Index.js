import axios from 'axios';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';


console.log(useSelector, "use selector in custom components");

// Custom Query component for data get

export const CustomQueryHookGet = (name, url, enable, OnWindow) => {
    // const {userId,token}=useSelector((state)=>state.authReducer.user.result);
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
            refetchOnWindowFocus: OnWindow ? true : false,
        }
    );
}

// Custom Query components for get by Id

export const CustomQueryHookById = (name, id, url, enable, OnWindow) => {
    return useQuery([name, id], async () => await axios.get((url + id), {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",

        },
    }), {
        onSuccess: (data) => {
            console.log(data);
        },
        enabled: enable,
        onError: (error) => {
            console.log(error)
        },
        refetchInterval: false,
        refetchOnWindowFocus: OnWindow ? true : false,
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


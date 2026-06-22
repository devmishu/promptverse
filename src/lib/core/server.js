"use server"

import { getUserToken } from "./session";

const baseurl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000'

const authHeader = async () => {
    const token = await getUserToken();
    const header = token ? {
        authorization: `Bearer ${token}`
    } : {};
    return header;
}

export const serverFetch = async (path) => {
    try {
        const res = await fetch(`${baseurl}${path}`, {
            headers: await authHeader()
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data?.message || "Something went wrong");
        }

        return data?.data;
    } catch (error) {
        console.error("Protected Fetch Error:", error.message);
        throw new Error(error.message);
    }
};



export const protectedFetch = async (path) => {
    try {
        const res = await fetch(`${baseurl}${path}`,{
            headers: await authHeader()
        });

        const data = await res.json();

        
        return data?.data;
    } catch (error) {
        console.error("Protected Fetch Error:", error.message);
        throw new Error(error.message);
    }
};





export const serverMutation = async (path, apiData, method = "POST") => {
    const res = await fetch(`${baseurl}${path}`, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData)
    });


    return res.json();
}

// export const serverDelete = async (path, method = "DELETE") => {
//     const res = await fetch(`${baseurl}${path}`, {
//         method: method
//     });

//     return res.json();
// }


export const serverDelete = async (path) => {
    const res = await fetch(`${baseurl}${path}`, {
        method: 'DELETE',
    });
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || 'Something went wrong');
    }
    return data;
}
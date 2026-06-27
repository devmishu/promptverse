"use server"

import { getUserToken } from "./session";

const baseurl = process.env.NEXT_PUBLIC_BASE_URL

const authHeader = async () => {
    const token = await getUserToken();
    const header = token ? {
        authorization: `Bearer ${token}`
    } : {};
    return header;
}

export const serverFetch = async (path) => {
    try {
        const res = await fetch(`${baseurl}${path}`);

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
        const res = await fetch(`${baseurl}${path}`, {
            method: "GET",
            cache: "no-store",
            headers: await authHeader(),
        });

        if (res.status === 401) {
            redirect("/unauthorized");
        }

        if (res.status === 403) {
            redirect("/forbidden");
        }

        const data = await res.json();

        return data?.data;
    } catch (error) {
        console.error("Protected Fetch Error:", error.message);
        throw error;
    }
};





export const serverMutation = async (path, apiData, method = "POST") => {
    const res = await fetch(`${baseurl}${path}`, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            ... await authHeader()
        },
        body: JSON.stringify(apiData)
    });


    return handleStatusCode(res);
}




export const serverDelete = async (path) => {
    const res = await fetch(`${baseurl}${path}`, {
        method: 'DELETE',
        headers: await authHeader()
    });

    return handleStatusCode(res);
}



const handleStatusCode = (res) => {
    if (res.status === 401) {
        redirect('/unauthorized')
    }
    if (res.status === 403) {
        redirect('/forbidden')
    }
    return res.json();
}
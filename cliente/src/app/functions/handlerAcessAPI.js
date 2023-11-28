'use server'
import {cookies} from "next/headers"

const url = "http://localhost:4000";

const getUserAuthenticated = async (user) => {
    const responseOfApi = await fetch(url + "/logar",
    { //transcrever pra json. para criar comunicação com servidor
        cache: "no-cache",
        method: "POST",
        headers: {"Content-Type": "Application/json"},
        body: JSON.stringify(user)
    });
    let userAuth = await responseOfApi.json();
    return userAuth;
}

const getUsers = async (user) => {
    const token = cookies().get('token')?.value;
    try{
        const responseOfApi = await fetch (url + "/usuarios/listar", {cache:"no-cache", headers:{
            'Content-Type':'Application/json', Cookie: `token=${token}`, next: {revalidate:10}},
            body: JSON.stringify(user)
        }) 
        const users = await responseOfApi.json();
        return users;
    }catch{
        return null;
}}

export {getUsers, getUserAuthenticated}
'use server'
import { cookies } from "next/dist/client/components/headers";

const url = "http://localhost:4000";

const getUserAuthenticated = async (user) => {
    const responseOfApi = await fetch(url + "/logar",
    { //transcrever pra json. para criar comunicação com servidor
        cache: "no-cache",
        method: "POST",
        headers: 
        {"Content-Type": "Application/json"},
        body: JSON.stringify(user)
    });
    let userAuth = await responseOfApi.json();
    return userAuth;
}

const postUser = async (user) => {
    try{
        const responseOfApi = await fetch (url + "/usuarios/listar", {
            method: 'POST',
            headers: {"Content-Type": "Application/json",
            Cookie: `token=${cookies().get('token').value}`},
            body: JSON.stringify(user)
        });
        const newSave = await responseOfApi.json();
        console.log(newSave)
        return newSave;
    }catch {
    return null;
    }

}

const getUsers = async () => {
    try{
        const responseOfApi = await fetch (url + "/usuarios/listar", {
            method: 'GET',
            next: { revalidate: 5 },
            headers: {
                "Content-Type": "Application/json",
                Cookie: `token=${cookies().get('token').value}`
            }
        }) 
        const users = await responseOfApi.json();
        return users;
    }catch{
        return null;
}}

const getUser = async () => {
    try{
        const responseOfApi = await fetch (url + "/usuarios/listar", {
            method: 'GET',
            next: { revalidate: 5 },
            headers: {
                "Content-Type": "Application/json",
                Cookie: `token=${cookies().get('token').value}`
            }
        }) 
        const user = await responseOfApi.json();
        return user;
    }catch{
        return null;
}}

export {getUsers, getUser, getUserAuthenticated, postUser}
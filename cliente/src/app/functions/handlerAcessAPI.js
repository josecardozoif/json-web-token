'use server'

const url = "https://localhost:4000";

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

const getUsers = async () => {
    try{
        const responseOfApi = await fetch (url + "/users", {cache:"no-cache"}, {next: { revalidate: 10}})
        const users = await responseOfApi.json();
        return users;
    }catch{
        return null;
}
}
export {getUsers, getUserAuthenticated}
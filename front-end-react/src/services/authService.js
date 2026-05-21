import axios from "axios"; // importando o axios

// função que coleta o token do localStorage
export const getAxiosConfig = () => ({
    headers: {
        Authorization: `Bearer ${ typeof window !== "undefined" ?
            (localStorage.getItem("token") ?? "" ) : ""}`,
    }
})

// função que realiza o login, ja exportando ela
export const login = async (email, password) => {
    try{
        // manda um objeto c email e senha no corpo da requisição p endpoint 
        const response = await axios.post("http://localhost:4000/auth", {
            email,
            password
        });
        // após o login a API retorna o token
        // coletando o token:
        const token = response.data.token
        // armazenando o token no localStorage do navegador
        localStorage.setItem("token", token);
        return { success: true }

    } catch(error){
        return { success: false, message: error.message }
    }
}

// função que realiza o logout
export const logout  = async (router) => { //cahma o router ao invés de importar
    localStorage.removeItem("token");
    router.push("/")
}

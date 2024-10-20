import axios from "axios"


// login, returns a promise
export const loginAPI = async ({email,password}) => {
  const response = await axios.post('http://localhost:8000/api/users/login',{
            email, 
            password,
        });
        // return a promise
        return response.data;
}
// register, returns a promise
export const registerAPI = async ({email,password, username}) => {
  const response = await axios.post('http://localhost:8000/api/users/register',{
            email, 
            password,
            username
        });
        // return a promise
        return response.data;
}

// profile, returns a promise
export const profileAPI = async (token) => {
  const response = await axios.get('http://localhost:8000/api/users/profile',{
            headers:{
              Authorization:`Bearer ${token}`
            }
        });
        // return a promise
        return response.data;
}
import { useState } from "react"
import {useUserContext} from './useUserContext'
export const useSignup=()=>{
    const {dispatch}= useUserContext()
    const [error,setError]=useState(null)
    const [isloading,setIsloading]=useState(null)
    const signup = async (userName,firstName,lastName,password)=>{
        setError(null)
        setIsloading(true)
        const response =await fetch ('/api/user/signup',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ userName,firstName,lastName, password })
        })
        const json =await response.json()

        if(!response.ok){
            setError(json.error)
            setIsloading(false)
        }
        if(response.ok){
            localStorage.setItem('user',JSON.stringify(json))

            dispatch({type:'LOGIN',payload:json})


            setIsloading(false)
        }
    }
    return{signup,isloading,error}
}
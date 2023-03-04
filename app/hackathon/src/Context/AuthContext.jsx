import axios from "axios";
import React, { useEffect, useState } from "react";
import { createContext } from "react";
import useLocalState from "../Hooks/useLocalState";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useLocalState("token");
  const [loading, setLoading] = useState(true);
  const api = axios.create();

  console.log("User state: ", user);

  const signup = async (userData) => {
    console.log(userData)
    const res = await api.post(
      `http://localhost:8000/auth/doctor/register`,
      JSON.stringify(userData),
      { 
        headers: {
        'Content-Type': 'application/json',
      }
     } 
    );
    console.log(res);
    return res.data;
  };

  const searchData = async (data) => {
    console.log(data)
    const res = await api.post(
      `http://localhost:8000/data`,
       JSON.stringify(data),
      { 
        headers: {
        'Content-Type': 'application/json',
      }
     } 
    );
    console.log(res);
    return res.data;
  };



  const login = async  (userData) => {
    const res = await api.post(
      `http://localhost:8000/auth/doctor/login`,
      JSON.stringify(userData),
      { 
        headers: {
        'Content-Type': 'application/json',
      }
     } 
    );
    localStorage.setItem("name", res.data.name);
    localStorage.setItem("email", res.data.email);
    localStorage.setItem("specializations", res.data.specializations);
    localStorage.setItem("experience", res.data.experience);
    localStorage.setItem("token", res.data.token);
    setUser({ ...res.data });
    return res.data;
  };


  const logout = () => {
    setToken(null);
  };



  const addQuestion = async (questionData, email) => {
   
    const res = await api.post(
      `http://localhost:8000/questions`,
      JSON.stringify({"email" : email, "questionData" : questionData}),
      {
        headers: {
          "Content-Type": "application/json",
        }
      }
    );
    console.log(res);
    return res.data;
  };


  const getQuestions = async (email) => {
    const res = await api.post(
      `http://localhost:8000/getQuestions`,
      JSON.stringify({"email" : email}),
      {
        headers: {
          "Content-Type": "application/json",
        }
      }
    );
    console.log(res);
    return res.data;
  }

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout, searchData, addQuestion, getQuestions}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

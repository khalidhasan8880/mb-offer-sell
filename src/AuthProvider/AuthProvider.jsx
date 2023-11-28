import { createContext, useEffect, useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile, onAuthStateChanged } from "firebase/auth";
import app from "../Firebase/firebase.config";
import api from "../hooks/interceptors";
const googleProvider = new GoogleAuthProvider();
const auth = getAuth(app)
export const AuthContext = createContext()
const AuthProvider = ({children}) => {
const [user, setUser] = useState(null)
const [loading, setLoading] = useState(true)
const [balance, setBalance] = useState('')
const [language, setLanguage] = useState('BN');
const [estimateCost, setEstimateCost] = useState({})

useEffect(()=>{
  const token = localStorage.getItem("token")
  if (token) {
    api.get(`/get-user?email=${user?.email}`)
    .then(res=>{
      setBalance(res.data?.balance)
    })
  } 
 },[user?.email])



  // google authentication
  const googleSignInHandler = async() => {
    setLoading(true)
    return await signInWithPopup(auth, googleProvider)
  };


 const createUser  = (email,password)=>{
  setLoading(true)
  return createUserWithEmailAndPassword(auth, email, password)
 }

  const logIn = (email, password) => {
      setLoading(true)
      return signInWithEmailAndPassword(auth, email, password)
  }
  const logOut = () => {
      setLoading(true)
      return signOut(auth)
  }

  const updateUser = (name) => {
    setLoading(true)
      return updateProfile(auth.currentUser, {
          displayName: name
      }).then(() => {
          setLoading(false)
      }).catch(() => {
        setLoading(false)
      })
  }



  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          console.log(currentUser?.email);
            setUser(currentUser)
           fetch('http://localhost:5000/jwt',{
            method:"POST",
            headers:{
              "content-type":"application/json",  
            },
            body:JSON.stringify({email:currentUser?.email, name:currentUser?.displayName})
          })
           .then((res)=>res.json())
           .then(data=>{            
            localStorage.setItem('token', data?.token)
           setLoading(false);
            if (!loading) {
              fetch(`http://localhost:5000/users?email=${currentUser?.email}&name=${currentUser?.displayName}`,{
                method:"POST",
                headers:{
                  "Authorization": `Bearer ${data?.token}`,
                  'content-type':'application/json'
                }
              })
              .then(res=>res.json())
              .then(()=>{
              })
            }             
           })

        } else {
            localStorage.removeItem('access-token')
            setUser(null)
            setLoading(false)
        }
    });

    return () => {
        unsubscribe()
    }
}, [loading])


    // ----------------------------------
    const authInfo = {
        googleSignInHandler,
        createUser,
        logIn,
        logOut,
        updateUser,
        loading,
        user,
        balance,
        estimateCost,
        language,
        setLanguage,
    }
    return (
    <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>)
};

export default AuthProvider;
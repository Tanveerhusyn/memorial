import React,{ createContext, useContext, useEffect, useState } from "react";
import LovedOne from "../ui/components/lovedone/LovedOne";
import MemoLogin from "../ui/components/creatememo_login/MemoLogin";
import PrivacyOption from "../ui/components/privacyoption/PrivacyOption";
import ChoosePlane from "../ui/components/creatememo_chooseplane/ChoosePlane";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import axios from "axios";
import { auth } from "../utils/firebaseConfig";
import { useSignOut } from "react-firebase-hooks/auth";

import { useNavigate } from "react-router-dom";

const MemorialContext = createContext();

export function MemorialContextProvider({ children }) {
  const userData = JSON.parse(sessionStorage.getItem('user'))
  const formDataStored = JSON.parse(sessionStorage.getItem('formData'))
  const [user, setUser] = useState(userData);
  const [error, setError] = useState("");
  const [themes, setThemes] = useState([]);
  const [newThemes, setNewThemes] = useState(themes)
  const [selectedTheme, setSelectedTheme] = useState()
  const navigate = useNavigate();
  const [options, setOptions] = React.useState([]);
  const [currentMemorial, setCurrentMemorial] = React.useState()
  
   const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const [showOption, setShowOption] = React.useState({
    title: "About your loved one",
    isCompleted: true,
    isActive: true,
    component: <LovedOne />,
  });

  const [formData, setFormData] = useState(formDataStored || {
    firstName: "",
    lastName: "",
    gender: "",
    relationship: "",
    memorialDestination: "",
    country: "",
    birthDate: null,
    birthPlace: "",
    passedDate: null,
    deathPlace: "",
    deathCountry: "",
    webAddress: "",
    publicVisibility: false,
    // add other fields as needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleSelected = (itm) => {
    const newArr = options.map((option) => {
      if (option === itm) {
        return {
          ...option,
          isActive: true,
        };
      } else {
        return {
          ...option,
          isActive: false,
        };
      }
    });
    
   if(formData.firstName!='' && formData.lastName!='' && formData.relationship!='' && formData.gender!='' && formData.memorialDestination!=''){
    setOptions(newArr);
    setShowOption({ ...itm, isActive: true });
   }
 
  };
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [isLegacyLogin, setIsLegacyLogin] = useState(true);
  const [signOut] = useSignOut(auth);
  const [name, setName] = useState("");
  const userFormData = JSON.parse(sessionStorage.getItem('formData'))

  function emailPasswordSignIn(email, password) {
    signInWithEmailAndPassword(auth, email, password)
      .then((currentuser) => {
        if (currentuser) {
          setIsLoading(false);
          setGoogleLoading(false);

          setLoginLoading(false);
          const data = {
            name: name,
            email: currentuser.user.email,
          };
          fetch(`${backendUrl}/api/users`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          })
            .then((response) => response.json())
            .then((data) => {
              // Handle the successful creation of the user
              console.log("User:", data.user);
              setUser({ ...currentuser.user,displayName:data.user.name, meta: { ...data.user } });
            sessionStorage.setItem('user',JSON.stringify({ ...currentuser, meta: { ...data.user } }))
             

              setLoginLoading(false);
              
              if (!userFormData) {
                navigate("/");
              }
              else if(userFormData!=null){
               
                let title =
                user && user.meta.hasPaid
                  ? "Privacy options"
                  : user && !user.meta.hasPaid
                  ? "Choose your plan"
                  : "Account details";
            
              const handleSelected1 = (itm) => {
                const newArr = options.map((option) => {
                  // console.log(Option)
                  if (option.title === title) {
                    return {
                      ...option,
                      isActive: true,
                    };
                  } else {
                    return {
                      ...option,
                      isActive: false,
                    };
                  }
                });
            
                const filterArr = newArr.filter((element) => element.title == title);
                setOptions(newArr);
            
                setShowOption(...filterArr);
              
              };
              
                handleSelected1() 
                // navigate('/creatememorial')
                console.log(data.user)
                window.location.href="/creatememorial"
              }
            })
            .catch((error) => {
              // Handle any errors that occur during the request
              console.error("Error creating user:", error);
              setError(error.message);
            });
        }
      })
      .catch((err) => {
        setError(err.message);
        setLoginLoading(false);
      });
  }

  function emailPasswordSignUp(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((currentuser) => {
        if (currentuser) {
          setIsLoading(false);
          setGoogleLoading(false);
          setLoginLoading(false);
          const data = {
            name: name,
            email: currentuser.user.email,
          };
          fetch(`${backendUrl}/api/users`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          })
            .then((response) => response.json())
            .then((data) => {
              // Handle the successful creation of the user
              console.log("User:", data.user);
              // setUser({ ...currentuser.user, meta: { ...data.user } });
              setIsLoading(false);
              navigate("/login");
            })
            .catch((error) => {
              // Handle any errors that occur during the request
              console.error("Error creating user:", error);
            });
        }
      })
      .catch((err) => {
        setError(err.message);
        console.log(err.message);
        setIsLoading(false);
      });
  }
  const delayedTrigger = (callback) => {
    setLoading(true);

    setTimeout(() => {
      callback();
      setLoading(false);
    }, 3000);
  };

  const fetchUser = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/users/${user.meta._id}`);
      if (response.ok) {
        const data = await response.json();
        setUser({ ...user, meta: { ...data.user } });

      } else {
        // Handle error case
        console.error("Failed to fetch memorials");
      }
    } catch (error) {
      // Handle error case
      console.error("Error fetching memorials:", error);
    }
  };
  

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/themes`);
        setThemes(response.data.themes);
      } catch (error) {
        console.error(error);
        // Handle error
      }
    };

    fetchThemes();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      console.log("Auth Status", isLegacyLogin);

      if (currentuser && !isLegacyLogin) {
        setIsLoading(false);
        setGoogleLoading(false);
        setLoginLoading(false);
        const data = {
          name: currentuser?.displayName || "",
          email: currentuser.email,
        };
        fetch(`${backendUrl}/api/users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((data) => {
            // Handle the successful creation of the user
            console.log("User:", data.user);
            setUser({ ...currentuser, meta: { ...data.user } });
            sessionStorage.setItem('user',JSON.stringify({ ...currentuser, meta: { ...data.user } }))
            setIsLoading(false);

            if (window.location.pathname != "/success" && !userFormData) {
              navigate("/");
            }
            else if(userFormData!=null){
             
              let title =
              user && user.meta.hasPaid
                ? "Privacy options"
                : user && !user.meta.hasPaid
                ? "Choose your plan"
                : "Account details";
          
            const handleSelected1 = (itm) => {
              const newArr = options.map((option) => {
                // console.log(Option)
                if (option.title === title) {
                  return {
                    ...option,
                    isActive: true,
                  };
                } else {
                  return {
                    ...option,
                    isActive: false,
                  };
                }
              });
          
              const filterArr = newArr.filter((element) => element.title == title);
              setOptions(newArr);
          
              setShowOption(...filterArr);
            
            };
            
              handleSelected1() 
              // navigate('/creatememorial')
              console.log(data.user)
              window.location.href="/creatememorial"
            }
          })
          .catch((error) => {
            // Handle any errors that occur during the request
            console.error("Error creating user:", error);
          });
      }
    });

    return () => {
      unsubscribe();
    };
  }, [isLegacyLogin]);

  return (
    <MemorialContext.Provider
      value={{
        name,
        setName,
        isLegacyLogin,
        setIsLegacyLogin,
        formData,
        handleChange,
        user,
        emailPasswordSignIn,
        emailPasswordSignUp,
        error,
        setError,
        isLoading,
        themes,
        signOut,
        delayedTrigger,
        loading,
        setIsLoading,
        googleLoading,
        loginLoading,
        setGoogleLoading,
        setLoginLoading,
        options,
        setOptions,
        showOption,
        setShowOption,
        handleSelected,
        setThemes,
        newThemes,
        setSelectedTheme,
        selectedTheme,
        setNewThemes,
        setCurrentMemorial,
        currentMemorial,
        fetchUser
      }}
    >
      {children}
    </MemorialContext.Provider>
  );
}

export function useUserContext() {
  return useContext(MemorialContext);
}

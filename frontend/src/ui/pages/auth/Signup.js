import React from "react";
import "./signup.css";
import arrow from "../../../assets/icons/arraw.svg";
import { BiHide, BiShow } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import line from "../../../assets/icons/line.svg";
import { Link } from "react-router-dom";
import { auth } from "../../../utils/firebaseConfig";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useUserContext } from "../../../context/MemorialContext";
import { ToastContainer, toast } from 'react-toastify';
import { ThreeDots } from "react-loader-spinner";
import 'react-toastify/dist/ReactToastify.css';
function Signup() {
  const [showIcon, setShowIcon] = React.useState(<BiHide />);
  const [email,setEmail] = React.useState('')
  const [err,setErr] = React.useState(false);
  const [password,setPassword] = React.useState('') 
  const {emailPasswordSignUp,error,name,setError, setName,isLoading,googleLoading,setGoogleLoading,setIsLoading,delayedTrigger,setIsLegacyLogin} = useUserContext()
  const [signInWithGoogle, user, loading,] = useSignInWithGoogle(auth);
  const [emailError,  setEmailError ] = React.useState()
  const [passwordError, setPasswordError] = React.useState()
  const [nameError, setNameError] = React.useState()
  
  const [show, setShow] = React.useState(false);
  const toggleShow = () => {
    if (show) {
      setShowIcon(<BiHide />);
    } else {
      setShowIcon(<BiShow />);
    }
    setShow(!show);
  };


  const handleSignUp = (email,password) => {
    if (validateEmail(email)) {
      setErr(false)
      emailPasswordSignUp(email, password);
    } else {
      // Show email validation error
      setErr(true)
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };


  

  React.useEffect(()=>{
    const notify = () => toast.error(error, {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    if(error){
      notify()
      setError('')
    }
    console.log("Error",error)
  },[error!=''])
  return (
    <div className="login-page">
      <div className="login-top">
        <div className="topcontent">
          <h2>Welcome to the Family </h2>
          <p>
            we provide a shared, easily-accessible virtual space where family
            members and friends can pay homage to a special life while helping
            each other heal by sharing their feelings, warm memories, and words
            of support.
          </p>
        </div>
      </div>

      <div className="login-card">
        <div className="firstLine">
          <h2>Sign up</h2>
          <div className="singp">
            <p>Already have an account?</p>

            <span>
              <b>
                <Link to="/login">Login</Link>
              </b>{" "}
              <img src={arrow} width={30} />
            </span>
          </div>
        </div>

        <div className="loginsingle-line">
          <div className="loginsingle-input">
            <p>Name</p>
             <input value={name} 
              style={{ border: `${nameError ? "1.5px solid red" : "none"}` }}
             
             onChange={(e)=>{ 
              setName(e.target.value)
              if (e.target.value.trim() === "") {
                setNameError("Please enter the user name");
              } else {
                setNameError("");
              }
            }
            
              
              }
              onBlur={() => {
                if (name.trim() === "") {
                  setNameError("Please enter the user name");
                } else {
                  setNameError("");
                }
              }}
              type="text" /> 
          </div>
          {nameError && <p className="error-message">{nameError}</p>}
          
          <div className="loginsingle-input">
            <p>Email</p>
            {/* <input  value={email} onChange={(e)=>setEmail(e.target.value)} type="email" /> */}
            <input
              value={email}
              pattern="[^\s@]+@[^\s@]+\.[^\s@]+" 
              onChange={(e) => {
                setEmail(e.target.value);
                if (!validateEmail(e.target.value)) {
                  setEmailError("Please enter a valid email address");
                } else {
                  setEmailError("");
                }
              }}
              onBlur={() => {
                if (!validateEmail(email)) {
                  setEmailError("Please enter a valid email address");
                } else {
                  setEmailError("");
                }
              }}
              style={{ border: `${emailError ? "1.5px solid red" : "none"}` }}
              type="email"
            />
          </div>
          {emailError && <p className="error-message">{emailError}</p>}
             
          <div className="loginsingle-input">
            <p>Password</p>
            {/* <input  value={password} onChange={(e)=>setPassword(e.target.value)} type={show ? "text" : "password"} /> */}
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (e.target.value.trim() === "") {
                  setPasswordError("Please enter a password");
                } else {
                  setPasswordError("");
                }
              }}
              type={show ? "text" : "password"}
              style={{
                border: `${passwordError ? "1.5px solid red" : "none"}`,
              }}
              onBlur={() => {
                if (password.trim() === "") {
                  setPasswordError("Please enter a password");
                } else {
                  setPasswordError("");
                }
              }}
            />
            <span className="icons" onClick={toggleShow}>
              {showIcon}
            </span>
          </div>
          {passwordError && <p className="error-message">{passwordError}</p>}

          <div className="rember">
            <div>
              <input
                type="radio"
                id="remember-me"
                name="remember"
                value="yes"
              />
              <label
                for="remember-me"
                className="remberme"
                style={{ fontSize: "1rem" }}
              >
                I’ve read and agree with Terms of Services and Privacy Policy.
              </label>
            </div>
          </div>
        </div>

        <button 
          disabled={emailError || passwordError || nameError}
          style={{
            background: `${
              emailError || passwordError || nameError ? "#88868e" : "#5c5470"
            }`,
          }}
        className="login" onClick={() => {
          setIsLoading(true)
          setIsLegacyLogin(true)
          delayedTrigger(()=>{
            setIsLegacyLogin(true)
            
            handleSignUp(email, password)
          })
        }}>
        {isLoading ? (
            <ThreeDots
              height="50"
              width="50"
              radius="9"
              color="#fff"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          ) : (
            "Sign up"
          )}
        </button>

        <div className="ordivire">
          <img src={line} /> or <img src={line} />{" "}
        </div>
        <button className="goolge" onClick={()=>{
          setIsLegacyLogin(false)
          setGoogleLoading(true)
          delayedTrigger(()=>{
            signInWithGoogle()
          })

          
          }}>
          {!googleLoading && <FcGoogle style={{ marginRight: "10px" }} />}
          {googleLoading ? (
            <ThreeDots
              height="50"
              width="50"
              radius="9"
              color="#5c5470"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          ) : (
            "Continue with google"
          )}
        </button>
      </div>
      <div className="Lbottom"></div>
    </div>
  );
}

export default Signup;

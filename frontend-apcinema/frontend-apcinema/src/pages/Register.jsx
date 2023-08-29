import { Link } from "react-router-dom"
import banner2 from "../assets/background2.png"
import { useContext } from "react"
import { AllContext } from "../App"
import { FcGoogle } from "react-icons/fc"

// import text field dari MUI
import TextField from '@mui/material/TextField';
import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "@mui/material"

// import captcha
import ReCaptcha from "react-google-recaptcha"
import { useRef } from 'react';
import { useEffect } from "react"
import { Navigate } from "react-router-dom"
import { useNavigate } from "react-router-dom"

export default function Regisster() {
    const navigate = useNavigate()
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    const [userGoogle, setUserGoogle] = useState(null)
    const login = useGoogleLogin({
        onSuccess: async (codeResponse) => {
            const response = await fetch("https://www.googleapis.com/oauth2/v1/userinfo", {
                headers: {
                    Authorization: `Bearer ${codeResponse.access_token}`,
                },
            })
            const userInfo = await response.json()
            console.log(userInfo);
            setUserGoogle(userInfo)
        },
    });

    // fungsi logout
    const logOut = () => {
        googleLogout();
        setUser(null);
    }


    const captchaRef = useRef(null)
    const [captcha, setCaptcha] = useState(false)

    const [user,setUser] = useState({
        email:"",
        nama:"",
        password:""
    })
    // const [email, setEmail] = useState("")
    // const [name, setName] = useState("")
    // const [password, setPassword] = useState("")
    // const [confirmPassword, setConfirmPassword] = useState("")
    const { theme } = useContext(AllContext)
    // const theme = "light"
    const inputs = [
        {
            text: "email",
            type: "email",
        },
        {
            text: "nama",
            type: "text",
        },
        {
            text: "password",
            type: "password",
        },
        {
            text: "Confirm Password",
            type: "password",
        }]

    // handle for reCaptcha
    const handleSubmit = (e) => {
        e.preventDefault();
        const token = captchaRef.current.getValue();
        captchaRef.current.reset();
        console.log(token);
    }
    return (
        <div
            className={`w-full relative m-0 p-0 bg-fixed bg-cover bg-center bg-no-repeat text-${theme}`}
            style={{ backgroundImage: `url(${banner2})` }}
        >
            <div className="py-32 w-4/5 m-auto z-10">
                <div className={`max-w-xl w-full py-[60px] px-[40px] mx-auto my-0 form-${theme}`}>
                    <h1 className={`mb-9 text-[38px] font-bold text-${theme} text-center`}>WELCOME TO <br /><span className="text-[#f11]"> AP CINEMA</span></h1>
                    <form action="" className="px-3 flex flex-col gap-5" onSubmit={(e) => {
                        e.preventDefault()
                        fetch(`http://localhost:8080/api/user/add-user`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(user),
                        }).then(async (response) => {
                            if (response.ok) {
                                alert("registration succes...");
                                navigate("/login");
                            } else {
                                alert("registration failed...");
                            }
                        });
                    }}>
                        {
                            inputs.map((input, i) => {
                                return <TextField key={i} onChange={(e) => setUser({
                                    ...user,
                                    [input.text]:e.target.value
                                })} className="bg-white rounded w-full" label={input.text} variant="outlined" type={input.type} />
                            })
                        }
                        <div className="flex justify-center">
                            <ReCaptcha sitekey="6Ld69sEnAAAAAOqLD_KL6s14uY6PrkIxnOAgWc_N" theme={theme} ref={captchaRef} />
                        </div>

                        <div className="mb-6 flex justify-center">
                            <button
                                type="submit"
                                className="font-semibold text-white text-lg uppercase 
                bg-gradient-to-r from-[#00e] via-[#c0c] to-[#e00] rounded-[30px] h-[50px] w-auto px-[50px] hover:shadow-[0_10px_15px_0_rgba(59,55,188,0.5)] transition duration-300"
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>
                    {/* option */}
                    <div className="text-center mb-7 font-normal">
                        have an account?{" "}
                        <Link to="/login" className="text-[#00e]">
                            Sign in now
                        </Link>
                    </div>
                    {/* or */}

                    <div className="uppercase flex items-center justify-between mb-7">
                        <span className="bg-[#bdbdbd] opacity-50 h-[2px] w-[40%] top-[10px] inline-block"></span>
                        <span>Or</span>
                        <span className="bg-[#bdbdbd] opacity-50 h-[2px] w-[40%] top-[10px] inline-block"></span>
                    </div>
                    {/* social */}
                    <div className="flex justify-center">
                        <Button variant="contained" color="secondary" onClick={() => login()} className="flex items-center gap-3">
                            <span>Sign Up With Google</span> <FcGoogle size={25} />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
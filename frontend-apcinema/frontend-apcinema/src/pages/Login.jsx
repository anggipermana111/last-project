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
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function Login() {
  const { theme, isHasLogin, setIsHasLogin, schedule } = useContext(AllContext)
  const navigate = useNavigate()
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  const [user, setUser] = useState(null)
  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      const response = await fetch("https://www.googleapis.com/oauth2/v1/userinfo", {
        headers: {
          Authorization: `Bearer ${codeResponse.access_token}`,
        },
      })
      const userInfo = await response.json()
      console.log(userInfo);
      setUser(userInfo)
    },
  });

  // fungsi logout
  // const logOut = () => {
  //   googleLogout();
  //   setUser(null);
  // }

  const handleClickLogin = (event) => {
    event.preventDefault();
    fetch(`http://localhost:8080/api/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password
      }),
    }).then(async (response) => {
      if (response.ok) {
        alert("login succes...");
        setIsHasLogin(true);
        localStorage.setItem("email",email)
        if (Object.keys(schedule).length === 0) {
          navigate("/")
        } else {
          navigate("/checkout")
        }
      } else {
        alert("login failed...");
      }
    });
  };

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const inputs = [{
    text: "email",
    set: setEmail
  }, {
    text: "password",
    set: setPassword
  }]
  return (
    <div
      className={`w-full relative m-0 p-0 bg-fixed bg-cover bg-center bg-no-repeat text-${theme}`}
      style={{ backgroundImage: `url(${banner2})` }}
    >
      <div className="py-32 w-4/5 m-auto z-10">
        <div className={`max-w-xl w-full py-[60px] px-[40px] mx-auto my-0 form-${theme}`}>
          <h1 className={`mb-9 text-[38px] font-bold text-${theme} text-center`}>WELCOME BACK</h1>
          <form action="" className="px-3 flex flex-col gap-5">
            {
              inputs.map((input, i) => {
                return <TextField key={i} onChange={(e) => input.set(e.target.value)} className="bg-white rounded w-full capitalize" label={input.text} variant="outlined" type={input.text} />
              })
            }

            <div className="mb-6 flex justify-center">
              <button
                onClick={handleClickLogin}
                type="submit"
                className="font-semibold text-white text-lg uppercase 
                bg-gradient-to-r from-[#00e] via-[#c0c] to-[#e00] rounded-[30px] h-[50px] w-auto px-[50px] hover:shadow-[0_10px_15px_0_rgba(59,55,188,0.5)] transition duration-300"
              >
                Log In
              </button>
            </div>
          </form>
          {/* option */}
          <div className="text-center mb-7 font-normal">
            Don't have an account?{" "}
            <Link to="/register" className="text-[#00e]">
              Sign up now
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
              <span>Sign In With Google</span> <FcGoogle size={25} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
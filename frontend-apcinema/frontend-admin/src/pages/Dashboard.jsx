import { useEffect } from "react";
import OrderList from "../components/OrderList";
import Statistics from "../components/Statistics";

export default function Dashboard() {
  const getCookie = (name) => {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    
    if (parts.length === 2) {
      return parts.pop().split(";").shift();
    }
    
    return null;
  }
  useEffect(() => {
    // Memeriksa apakah cookie mengandung token
    const cookieToken = getCookie('token');
    
    if (cookieToken) {
      console.log('Cookie mengandung token:', cookieToken);
      // Lakukan tindakan yang sesuai dengan keberadaan token di cookie
    } else {
      console.log('Cookie tidak mengandung token');
      // Lakukan tindakan yang sesuai jika tidak ada token di cookie
    }
  }, []);
  return (
    <div className="flex flex-col w-full px-10 py-5 overflow-y-scroll">
        <Statistics/>
        <OrderList/>
    </div>
  )
}

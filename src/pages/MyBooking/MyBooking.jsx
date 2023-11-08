import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const MyBooking = () => {
  const { user } = useContext(AuthContext);
  const { email } = user || {};


  const [myCart, setMyCart] = useState([]);
  return (
    <div>MyBooking</div>
  )
}

export default MyBooking;
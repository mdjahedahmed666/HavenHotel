import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";

const Register = () => {
  const [error, setError] = useState("");
  const {createUser} = useContext(AuthContext);
  const navigate = useNavigate();


  const handleSubmit = e => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get('name');
    const email = form.get('email');
    const password = form.get('password');
console.log(name, email, password);
const newUser = {name, email, password};

const passwordRegex = /^(?=.*[A-Z])(?=.*[\W_]).{6,}$/;
if (!passwordRegex.test(password)) {
  setError("Invalid password. Password must be at least 6 characters long and contain at least one capital letter and one special character.");
  return;
}

//send data to the server
fetch('https://havenserver-f87bz3knk-mdjahedahmed12-gmailcom.vercel.app/users', {
  method: "POST",
  headers: {
      "content-type": "application/json"
  },
  body: JSON.stringify(newUser)
})
.then(res => res.json())
.then(data => {
  console.log(data);
  Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: 'User is added successfully',
      confirmButtonText: 'Cool'
    })
})


setError("")
    createUser(email, password)
    .then(
      
      Swal.fire({
        title: 'Register',
        text: 'Successfully Registered',
        icon: 'Success',
        confirmButtonText: 'ok'
      }),
      navigate('/login')
     

    )
    .catch(err => {
      console.error(err);
      setError(err.message);
    });

  }
  return (
    <div className="hero min-h-screen bg-[#F4F3F0]">
    <div className="hero-content flex-col">
      <div className="text-center">
        <h1 className="text-5xl font-bold mt-10 font-rancho">Register here..</h1>
      </div>
      <div className="w-full lg:w-[600px] shadow-smbg-base-100 p-10">
        <form onSubmit={handleSubmit} className="w-full">
          <div className="form-control">
            <label className="label">
              <span className="text-base">Name</span>
            </label>
            <input type="text" name="name" required placeholder="name" className="input input-bordered" />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="text-base">Email</span>
            </label>
            <input type="email" name="email" required placeholder="email" className="input input-bordered" />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="text-base">Password</span>
            </label>
            <input type="password" name="password" required placeholder="password" className="input input-bordered" />
          </div>
          <div className="form-control my-6">
            <button className="btn btn-outline btn-[#331A15]">Register</button>
          </div>
        </form>
        {
          error && <span className="text-red-400">{error}</span>
        }
        <div className="label p-5 pt-0">
          <p className="text-blue-500">Already have an account?
          <Link to="/login" className="text-sm link link-hover mb-4">
                Login
              </Link>
          </p>
          </div>
      </div>
    </div>
  </div>
  )
}

export default Register
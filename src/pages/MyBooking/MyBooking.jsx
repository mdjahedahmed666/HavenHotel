import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const MyBooking = () => {
  const [myBooking, setMyBooking] = useState([]);
  const { user } = useContext(AuthContext);
  const { email } = user || {};

  const handleDelete = (_id,name) => {
    console.log(_id);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
       
        fetch(`http://localhost:5000/bookings/${_id}`,{
          method: 'DELETE'
        })
        .then((res) => res.json())
      .then((data) =>{
        if(data.deletedCount){
          setMyBooking((remainingCart) => remainingCart.filter((item) => item._id !== _id));
          
           fetch(`http://localhost:5000/rooms/${name}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ availability: true }),
          })
          Swal.fire(
            'Deleted!',
            'Your cart has been deleted.',
            'success'
          )
        }
      })
      }
    })

  };
  const handleUpdate = () => {
console.log(update);

  };
  useEffect(() => {
    fetch('http://localhost:5000/bookings')
      .then((res) => res.json())
      .then((data) => {
        const userBooking = data.filter(user => user.userEmail===email);
        setMyBooking(userBooking);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="container mx-auto px-4 md:px-32 my-16">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {
    myBooking.map((item,index) =>
      <div key={index} className="card bg-base-100 shadow-xl">
      <figure><img src={item.room_image} alt="Shoes" /></figure>
      <div className="card-body">
        <h2 className="card-title">
          {item.name}
          <div className="badge badge-secondary">£{item.price_per_night}</div>
        </h2>
        <p className="mb-4">{item.description}</p>
        <div className="card-actions justify-end">
          <Link to={`/rooms/${item.name}`} className="btn btn-outline">Give a review</Link>
          <button onClick={() => handleUpdate(item._id,item.name) } className="btn btn-outline">Update Booking</button>
          <button onClick={() => handleDelete(item._id,item.name) } className="btn btn-error">Delete Booking</button>
        </div>
      </div>
    </div>
    )
  }
  </div>
  
  </div>
  )
}

export default MyBooking;
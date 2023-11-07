import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Rooms = () => {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
      fetch("http://localhost:5000/rooms")
        .then((res) => res.json())
        .then((data) => setRooms(data));
    }, []);
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-3 py-10 container mx-auto px-4 md:px-32">
      {rooms.map((room, index) => (
        <div
          key={index}
          className="card card-compact bg-base-100 shadow-xl"
        >
          <figure>
            <img
              src={room.room_image}
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title font-rancho">{room.name}</h2>
            <p className="text-lg font-raleway">{room.description}</p>
            <p className="text-lg font-raleway">Price: £{room.price_per_night}/night</p>
            <p className="text-lg font-raleway">Total review: </p>
            <Link to={`/rooms/${room.name}`} className="card-actions justify-end">
              <button className="btn btn-primary">Book Now</button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Rooms;
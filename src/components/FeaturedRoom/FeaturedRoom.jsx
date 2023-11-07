import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FeaturedRoom = () => {
  const [room, setRoom] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/rooms")
      .then((res) => res.json())
      .then((data) => setRoom(data));
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 my-36 py-10 container mx-auto px-4 md:px-32">
      {room.slice(0, 3).map((room, index) => (
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
            <h2 className="card-title">{room.name}</h2>
            <p>{room.description}</p>
            <p>Price: £{room.price_per_night}/night</p>
            <Link to="/rooms" className="card-actions justify-end">
              <button className="btn btn-primary">Details More</button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedRoom;

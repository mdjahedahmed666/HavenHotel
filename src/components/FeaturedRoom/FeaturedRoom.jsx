import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FeaturedRoom = () => {
  const [room, setRoom] = useState([]);

  useEffect(() => {
    fetch("https://havenserver-f87bz3knk-mdjahedahmed12-gmailcom.vercel.app/rooms")
      .then((res) => res.json())
      .then((data) => setRoom(data));
  }, []);
  return (
    <div className="container mx-auto px-4 md:px-32  my-28 py-10">
      <h2 className="font-bold font-rancho text-2xl text-black text-center mb-10">
        Featured Room
      </h2>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
      {room.slice(0, 3).map((room, index) => (
        <div
          key={index}
          className="card card-compact bg-base-100 shadow-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:z-10 hover:bg-indigo-500 duration-300"
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
    </div>
  );
};

export default FeaturedRoom;

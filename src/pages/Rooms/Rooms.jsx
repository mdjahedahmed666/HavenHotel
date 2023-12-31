import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [userReview, setUserReview] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Number.MAX_VALUE);
  useEffect(() => {
    fetch("https://havenserver-f87bz3knk-mdjahedahmed12-gmailcom.vercel.app/review")
      .then((res) => res.json())
      .then((data) => {
        setUserReview(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    fetch("https://havenserver-f87bz3knk-mdjahedahmed12-gmailcom.vercel.app/rooms")
      .then((res) => res.json())
      .then((data) => setRooms(data));
  }, []);
  const filterRoomsByPrice = () => {
    return rooms.filter(
      (room) =>
        room.price_per_night >= minPrice && room.price_per_night <= maxPrice
    );
  };
  const getTotalReviews = (roomName) => {
    const roomReviews = userReview.filter((review) => review.name === roomName);
    return roomReviews.length;
  };
  return (
    <div className="container mx-auto px-4 md:px-32 my-10">
      <h2 className="font-bold font-rancho text-2xl">
        Filter Room by price range
      </h2>
      <div>
        <div className="form-control">
          <label className="label">
            <span className="text-base">Min Price:</span>
          </label>
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="Min Price:"
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="text-base">Max Price:</span>
          </label>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Max Price:"
            className="input input-bordered"
          />
        </div>
      </div>
      <div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10">
        {filterRoomsByPrice().map((room, index) => (
          <Link
            to={`/rooms/${room.name}`}
            key={index}
            className="card bg-base-100 shadow-xl image-full"
          >
            <figure>
              <img src={room.room_image} alt={room.name} />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{room.name}</h2>
              <p>{room.description}</p>
              <p>Review: {getTotalReviews(room.name)}</p>
              <p>Price: £{room.price_per_night}/night</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Rooms;

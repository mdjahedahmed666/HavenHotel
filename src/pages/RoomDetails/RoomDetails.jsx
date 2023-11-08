import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
// import Review from "../../components/Review/Review";
import { AuthContext } from "../../providers/AuthProvider";

const RoomDetails = () => {
  const [room, setRoom] = useState([]);
  const { roomName } = useParams();
  const { user } = useContext(AuthContext);
  const { email } = user || {};

  const {
    name,
    description,
    price_per_night,
    room_size,
    room_image,
    availability,
    special_offer,
  } = room;

  useEffect(() => {
    fetch(`http://localhost:5000/rooms/${roomName}`)
      .then((res) => res.json())
      .then((data) => {
        setRoom(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [roomName]);

  const handleBookRoom = async () => {
    const roomData = {
      userEmail: email,
      name,
      description,
      price_per_night,
      room_size,
      room_image,
    };
    fetch(`http://localhost:5000/rooms/${roomName}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(roomData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
    if (room.availability) {
      Swal.fire({
        title: "Book Room",
        text: "Are you sure you want to book this room?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Book",
        cancelButtonText: "Cancel",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await fetch(
              `http://localhost:5000/rooms/${roomName}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ availability: false }),
              }
            );

            if (response.status === 200) {
              // Room booked successfully
              setRoom({ ...room, availability: false });
              Swal.fire(
                "Room booked!",
                "You have successfully booked the room.",
                "success"
              );
            } else {
              Swal.fire(
                "Booking failed",
                "There was an issue booking the room.",
                "error"
              );
            }
          } catch (error) {
            console.error("Error booking room:", error);
            Swal.fire(
              "Booking failed",
              "An error occurred while booking the room.",
              "error"
            );
          }
        }
      });
    } else {
      Swal.fire("Room not available", "This room is already booked.", "info");
    }
  };

  return (
    <div className="card card-compact bg-base-100 shadow-xl">
      <div className="grid grid-cols-1 md:grid-cols-3 my-36 py-10 container mx-auto px-4 md:px-32">
        <figure>
          <img src={room_image} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <p>{description}</p>
          <p>{room_size}</p>
          <p>Room: {availability ? "Available" : " Room is not available"}</p>
          <p>
            Special Offer:{" "}
            {special_offer ? room.special_offer : "No Offer Available"}
          </p>
          <p>Price: £{price_per_night}/night</p>
          {/* <Link to="/rooms" className="card-actions justify-end">
            <button onClick={handleBookRoom} disabled={!room.availability} className="btn btn-primary">Book Now</button>
          </Link> */}
          <button className="btn btn-primary" onClick={()=>document.getElementById('my_modal_5').showModal()}>Book Now</button>
<dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    <h3 className="font-bold text-lg">{name}</h3>
    <p className="py-4">{description}</p>
    <p className="py-4">{price_per_night}</p>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button onClick={handleBookRoom} disabled={!room.availability} className="btn btn-primary">Book</button>
      </form>
    </div>
  </div>
</dialog>
        </div>
      </div>
      {/* <Review/> */}
    </div>
  );
};

export default RoomDetails;

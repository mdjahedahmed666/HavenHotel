import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import Review from "../../components/Review/Review";
import { AuthContext } from "../../providers/AuthProvider";

const RoomDetails = () => {
  const [room, setRoom] = useState([]);
  const [hasBookedRoom, setHasBookedRoom] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { roomName } = useParams();
  const { user } = useContext(AuthContext);
  const { email } = user || {};
  const navigate = useNavigate();

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
    if (!user) {
      // User is not logged in, redirect to login page
      navigate("/login");
      return;
    }

    if (selectedDate < new Date()) {
      // Date is in the past, show an error message.
      Swal.fire("Invalid Date", "Please select a future date.", "error");
      return;
    }

    if (room.availability === 0) {
      // Room is fully booked, show an error message.
      Swal.fire("Room Fully Booked", "This room is fully booked.", "error");
      return;
    }

    const roomData = {
      userEmail: email,
      date: selectedDate.toISOString(),
      name,
      description,
      price_per_night,
      room_size,
      room_image,
      availability: availability-1,
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
                body: JSON.stringify({  availability: availability - 1 }),
              }
            );

            if (response.status === 200) {
              // Room booked successfully
              setHasBookedRoom(true);
              setRoom({ ...room, availability: room.availability - 1 });
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
      <div className="grid grid-cols-1 md:grid-cols-3 my-10 container mx-auto px-4 md:px-32">
        <figure>
          <img src={room_image} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <p>{description}</p>
          <p>{room_size}</p>
          <p>Room Available: {availability ? availability : " Room is not available"}</p>
          <p>
            Special Offer:{" "}
            {special_offer ? room.special_offer : "No Offer Available"}
          </p>
          <p>Price: £{price_per_night}/night</p>
          {/* <Link to="/rooms" className="card-actions justify-end">
            <button onClick={handleBookRoom} disabled={!room.availability} className="btn btn-primary">Book Now</button>
          </Link> */}
          <p>
            Choose your date:{" "}
            <span>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                minDate={new Date()}
              />
            </span>
          </p>
          <button
            className="btn btn-primary"
            onClick={() => document.getElementById("my_modal_1").showModal()}
          >
            Book Now
          </button>
          <dialog
            id="my_modal_1"
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box">
              <h3 className="font-bold text-lg">{name}</h3>
              <p className="py-4">{description}</p>
              <p className="py-4">Price: £{price_per_night}</p>
              <div className="modal-action">
                <form method="dialog">
                  {/* <button
                    onClick={handleBookRoom}
                    disabled={!room.availability}
                    className="btn btn-primary"
                  >
                    Book
                  </button> */}
                  {room.availability > 0 ? (
                    <button
                    onClick={handleBookRoom}
                    disabled={!room.availability}
                    className="btn btn-primary"
                  >
                    Book
                  </button>
                  ) : (
                    <p>This room is fully booked.</p>
                  )}
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>
      <Review name={name} hasBookedRoom={hasBookedRoom} />
    </div>
  );
};

export default RoomDetails;

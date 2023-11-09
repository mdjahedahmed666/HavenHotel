import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";

const Review = ({ name,hasBookedRoom }) => {
  const [userReview, setUserReview] = useState([]);
  const [userBooked, setUserBooked] = useState([]);
  const { user } = useContext(AuthContext);
  const { email } = user || {};

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => {
        setUserBooked(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/review")
      .then((res) => res.json())
      .then((data) => {
        const userView = data.filter(review => review.name===name);
        setUserReview(userView);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const review = form.get("review");
    const rating = form.get("rating");
    console.log(review, rating);
    const user = userBooked.find((user) => user.email === email);

    const newReview = {
      name,
      userName: user.name,
      review,
      rating,
    };

    //send data to the server
    fetch("http://localhost:5000/review", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newReview),
    })
      .then((res) => res.json())
      .then((data) => {
        setUserReview([...userReview, newReview]);
        console.log(data);
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "review is added successfully",
          confirmButtonText: "Cool",
        });
      });
  };
  return (
    <div className="container mx-auto px-4 md:px-32 my-16">
      <div>
      {hasBookedRoom ? (
          <form onSubmit={handleSubmit} className="w-full">
            <div className="form-control">
              <label className="label">
                <span className="text-base">Write your review</span>
              </label>
              <textarea
                name="review"
                className="textarea textarea-primary"
                placeholder="Review"
              ></textarea>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="text-base">Provide rating 1-5</span>
              </label>
              <input
                type="number"
                name="rating"
                required
                placeholder="email"
                className="input input-bordered"
              />
            </div>
            <div className="form-control my-6">
              <button className="btn btn-outline btn-[#331A15]">Submit</button>
            </div>
          </form>
        ) : (
          <p>You need to book a room to submit a review.</p>
        )}
      </div>
      <h2>Customers reviews</h2>
<div className="grid gap-1 grid-flow-col md:grid-cols-3">
{userReview.map((item, index) => (
        <div key={index} className="card bg-yellow-100 shadow-sm">
          <div className="card-body">
            <h2 className="card-title">{item.userName}</h2>
            <p>{item.review}</p>
            <div className="card-actions justify-end">
              <p>Rating: {item.rating} out of 5</p>
            </div>
          </div>
        </div>
      ))}
</div>
    </div>
  );
};

export default Review;

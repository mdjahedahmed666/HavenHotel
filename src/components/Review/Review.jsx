
const Review = ({user}) => {
  return (
    <div>
        <h2>Customers reviews</h2>
        <div className="card bg-base-100 shadow-xl">
  <div className="card-body">
    <h2 className="card-title">{user.name}</h2>
    <p>{user.review}</p>
    <div className="card-actions justify-end">
    <div className="rating">
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" checked />
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
</div>
    </div>
  </div>
</div>
    </div>
  )
}

export default Review;
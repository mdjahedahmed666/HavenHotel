

const SpecialOffer = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row">
    <div className="grid card grid-cols-1 md:grid-cols-2 gap-2">
    <img src="https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="max-w-sm rounded-lg" />
    <img src="https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="max-w-sm rounded-lg" />
    <img src="https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="max-w-sm rounded-lg" />
    <img src="https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="max-w-sm rounded-lg" />
    </div>
    <div>
      <h1 className="text2xl:md:text-5xl font-bold">Winter Offer!</h1>
      <p className="py-6">One room for every day is £90.</p>
      <button className="btn btn-primary">Book Now</button>
    </div>
  </div>
</div>
  )
}

export default SpecialOffer;
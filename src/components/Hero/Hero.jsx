import { Parallax } from 'react-scroll-parallax';

const Hero = () => {
  return (
    <Parallax speed={-5} className="hero min-h-screen" style={{backgroundImage: 'url(https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)'}}>
  <div className="hero-overlay bg-black bg-opacity-60"></div>
  <div className="hero-content text-center text-neutral-content">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold">Welcome to Haven Hotel</h1>
      <p className="mb-5 font-bold text-2xl">Where every stay is unique</p>
      <button className="btn btn-outline text-white text-lg px-4">Explore</button>
    </div>
  </div>
</Parallax>
  )
}

export default Hero;
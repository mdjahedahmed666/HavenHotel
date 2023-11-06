import { useEffect, useState } from "react";
import Hero from "../../components/Hero/Hero";
import Testimonial from "../../components/Testimonial/Testimonial";
import NewsLetter from "../../components/NewsLetter/NewsLetter";
import Map from "../../components/Map/Map";

const Home = () => {
  const [testimonial, setTestimonial] = useState([]);

  useEffect(() => {
    fetch("/testimonialData.json")
      .then((res) => res.json())
      .then((data) => setTestimonial(data));
  }, []);
  return (
    <div>
      <Hero/>
      <Testimonial testimonial={testimonial}/>
      <NewsLetter/>
      <Map/>
    </div>
  )
}

export default Home;
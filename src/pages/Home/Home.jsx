import React, { useEffect, useState } from 'react'
import Categories from '../../components/Categories/Categories'
import Contact from '../../components/Contact/Contact'
import FeaturedProducts from '../../components/FeaturedProducts/FeaturedProducts'
import Slider from '../../components/Slider/Slider'
import "./Home.scss"
import clothesServices from '../../services/clothesServices'

const Home = () => {
  const [featured, setFeatured] = useState([])
  useEffect(() => {
    clothesServices.getAllClothes().then(data => setFeatured(data))
  }, [])
  return (
    <div className='home'>
      <Slider />
      <FeaturedProducts type="featured" dataSet={featured} />
      <Categories />
      <FeaturedProducts type="trending" dataSet={featured}/>
      <Contact />
    </div>
  )
}

export default Home
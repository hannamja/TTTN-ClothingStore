import React, { useEffect, useState } from 'react'
import Categories from '../../components/Categories/Categories'
import Contact from '../../components/Contact/Contact'
import FeaturedProducts from '../../components/FeaturedProducts/FeaturedProducts'
import Slider from '../../components/Slider/Slider'
import "./Home.scss"
import clothesServices from '../../services/clothesServices'
import { useSelector } from 'react-redux'

const Home = () => {
  const [featured, setFeatured] = useState([])
  const user = useSelector(state => state.user)
  useEffect(() => {
    // clothesServices.getAllClothes().then(data => setFeatured(data))
    let active = true;
    (async () => {
      try {
        const data = await clothesServices.getAllClothes()
        if (active) {
          setFeatured(data)
        }
      } catch (error) {
        console.log(error);
      }
    })()
    return () => {
      active = false;
    }
  }, [])

  return (
    <div className='home'>
      <Slider />
      {featured.length > 0 && <FeaturedProducts type="featured" dataSet={featured} />}
      <Categories />
      {featured.length > 0 && <FeaturedProducts type="trending" dataSet={featured} />}
      <Contact />
    </div>
  )
}

export default Home
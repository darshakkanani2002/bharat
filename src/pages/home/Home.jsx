
import Layout from '../../components/layout/Layout'
import HeroSection from '../../components/herosection/HeroSection'
import Filter from '../../components/filter/Filter'
import ProductCart from '../../components/productcart/ProductCart'
import Track from '../../components/track/Track'
import Testimonial from "../../components/testimonial/Testimonial";
// import { useDispatch, useSelector } from 'react-redux'
// import { addToCart, deleteFromCart } from '../../redux/cartslice'
function Home() {
  return (
    <div>
      <Layout>
        <HeroSection></HeroSection>
        <Filter></Filter>
        <ProductCart></ProductCart>
        <Track></Track>
        <Testimonial></Testimonial>
      </Layout>
    </div>
  )
}

export default Home

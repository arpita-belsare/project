import React from 'react'
import '../CSS/About.css'
import img from '../Image/Watch.webp'
import img2 from '../Image/M-21072024-TrendsSIS-fallwinter24strip.avif'
import img3 from '../Image/trousers-starting699.avif'
import img4 from '../Image/dresses-starting499.avif'
import img5 from '../Image/boysteesshirts-starting249.avif'
const About = () => {
  return (
<>
<div className='div'>    
  <h1>About Our Website </h1>
  {/* <div className='scroll'>
  <img src={img} alt="imge1" className='sale1' />
  <img src={img2} alt="imge1" className='sale1' />
  <img src={img3} alt="imge1" className='sale1' />
  </div> */}

<div className="one">
<img src={img} alt="imge1" className='sale1' />
<div className="one-inside">
 <header id='head'>
  <h1>Top Selling Electronics</h1>
  <h3>Latest Technology, Best Brands</h3>
 </header>
 <p>
 <button>Explore More </button> <button>BUY NOW</button><br />
Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam, quos cupiditate ipsam nisi eveniet adipisci voluptate consectetur vitae tenetur aperiam!
    </p>
</div>
</div>
<div className="two">
  <img src={img2} alt="ddd" />
  <div className="down-t">
  <img src={img3} alt="img2" />
  <img src={img4} alt="img4" />
  <img src={img5} alt="img5" />
  </div>
</div>
</div>
</>
  )
}

export default About;









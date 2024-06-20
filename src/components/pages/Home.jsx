import homeImage from '../../assets/tennis_home.jpeg';
import "./Home.css";

export function Home() {
  return (
    <div>
      <div className="mainContainerHome">
        <img src={homeImage} alt="HomeImage" className="homeImage"/>
        <h1 className='title'>Tennis Now</h1>
        <h6 className='titleExtra'>Find a partner, court, or tournament</h6>
      </div>
    </div>
  );
}

export default Home;

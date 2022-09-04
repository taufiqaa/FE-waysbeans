import Header from "../molecules/header";
import ImageHero from "../../assets/ImageHero.png";
import HeroTitle from "../../assets/HeroTitle.svg";
import Waves from "../../assets/Waves.png";
import CoffeeList from "../molecules/coffee-list";

export default function Home() {
  return (
    <>
      <Header />
      <section>
        <div className="hero space-navbar">
          <img alt="hero" src={Waves} className="Waves" />
          <img src={ImageHero} alt="heading" className="Imagehero" />

          <img alt="hero" src={HeroTitle} className="HeroTitle" />
        </div>
      </section>
      <CoffeeList />
    </>
  );
}

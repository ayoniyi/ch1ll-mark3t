import Card from "../components/Card/Card";
import style from "../styles/Home.module.scss";
//import Image from "next/image";
import { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <div className={style.container}>
        <div className={style.hero}>
          <div className={style.heroTxt}>
            <h1>Discover, Collect And Sell Ch1ll NFTs</h1>
            <button>Explore Market</button>
          </div>
          <div className={style.imageBx}>
            <div className={style.nftA}>
              <Card />
            </div>
            <div className={style.nftB}>
              <Card />
            </div>
          </div>
        </div>
        <div className={style.banner}>
          <div className={style.bannerContent}>
            <li>Shop exclusively from the ch1ll collektion! </li>
            <li></li>
            <li>Shop exclusively from the ch1ll collektion! </li>
            <li></li>
            <li>Shop exclusively from the ch1ll collektion! </li>
            <li></li>
            <li>Shop exclusively from the ch1ll collektion! </li>
            <li></li>
            <li>Shop exclusively from the ch1ll collektion! </li>
            <li></li>
            <li>Shop exclusively from the ch1ll collektion! </li>
            <li></li>
            <li>Shop exclusively from the ch1ll collektion! </li>
            <li></li>
            <li>Shop exclusively from the ch1ll collektion! </li>
            <li></li>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

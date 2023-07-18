import React from "react";
import Img from "./img.png";
import style from "./Card.module.scss";
import Image from "next/image";

const Card = () => {
  return (
    <>
      <div className={style.container}>
        <div className={style.cardTop}>
          <Image src={Img} alt="nft" />
          <div className={style.cardTitles}>
            <h2>The russeau</h2>
            <p>Art Hunter</p>
          </div>
        </div>
        <div className={style.cardBtm}>
          <div className={style.description}>
            <div className={style.descTop}>
              <p>Price</p>
              <p>ID #02</p>
            </div>
            <div className={style.descBtm}>
              <p>0.1 MATIC</p>
              <button>Buy</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;

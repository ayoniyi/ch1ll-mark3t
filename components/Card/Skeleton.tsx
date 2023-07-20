import React from "react";
import style from "./Card.module.scss";

const Skeleton = () => {
  return (
    <>
      <div className={style.container}>
        <div className={style.cardTop}>
          {/* <Image src={Img} alt="nft" /> */}
          <div className={style.imgSkeleton}></div>
          <div className={style.cardTitles}>
            {/* <h2>The russeau</h2>
            <p>Art Hunter</p> */}
            <div className={style.blackBg}></div>
          </div>
        </div>
        <div className={style.cardBtm}>
          <div className={style.description}>
            <div className={style.descTop}>
              <div className={style.blackBg2}></div>

              <div className={style.blackBg2}></div>
              {/* <p>ID #02</p> */}
            </div>
            <br />
            <br />
            <div className={style.descBtm}>
              {/* <p>0.1 MATIC</p> */}
              <div className={style.blackBg2}></div>

              <div className={style.blackBg2}></div>
              {/* <button></button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Skeleton;

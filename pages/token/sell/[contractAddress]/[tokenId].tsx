import React from "react";
import style from "../../Trade.module.scss";
import Back from "../../back.svg";
import Image from "next/image";
import Item from "../../item.svg";
import Link from "next/link";
import Box from "../../box.svg";

const TokenSell = () => {
  return (
    <>
      <div className={style.container}>
        <div className={style.content}>
          <Link href="#" className={style.top}>
            <Image src={Back} alt="back" />
          </Link>
          <div className={style.body}>
            <div className={style.itemImg}>
              <Image src={Item} alt="item" />
            </div>
            <div className={style.itemTxt}>
              <div className={style.title}>
                <div className={style.collection}>
                  <Image src={Box} alt="collection" />
                  <p>Collection 01</p>
                </div>
                <h2>The russeau</h2>
                {/* <div className={style.collection}>
                  <Image src={Circle} alt="collection" />
                  <p>0x000000</p>
                </div> */}
              </div>
              <div className={style.form}>
                <div className={style.inputBx}>
                  <p>Listing start date:</p>
                  <input
                    type="datetime-local"
                    placeholder="Select Date and Time"
                  />
                </div>
                <div className={style.inputBx}>
                  <p>Listing end date:</p>
                  <input type="text" />
                </div>
                <div className={style.inputBx}>
                  <p>Price:</p>
                  <input type="text" />
                </div>

                <button>Put On Sale</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TokenSell;

import { useRef, useEffect } from "react";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import { gsap, Power3, Expo } from "gsap";
import Link from "next/link";
import Image from "next/image";
import style from "./NavBar.module.scss";

import user from "./user3.svg";

const NavBarMobile = () => {
  const address = useAddress();
  const openMenu: any = useRef();
  const menu: any = useRef();
  const links: any = useRef();
  const btn: any = useRef();
  const handleToggle = () => {
    openMenu.current.classList.toggle("active");
  };
  useEffect(() => {
    const t1 = gsap.timeline();
    t1.to(menu.current, 1, {
      right: 0,
      //top: 0,
      ease: Power3.easeInOut,
    });
    t1.staggerTo(
      links.current,
      0.6,
      { bottom: 0, opacity: 1, ease: Expo.easeOut },
      "0.1"
      // "-=0.2"
    );
    t1.staggerTo(
      btn.current,
      0.2,
      { bottom: 0, opacity: 1, ease: Expo.easeOut },
      "0.1"
      //"-=0.2"
    );
    t1.reverse();
    openMenu.current.onclick = function () {
      t1.reversed(!t1.reversed());
    };
    links.current.onclick = function () {
      t1.reversed(!t1.reversed());
    };
    // btn.current.onclick = function () {
    //   t1.reversed(!t1.reversed());
    // };
  }, [menu]);
  return (
    <>
      <div className={style.containerM}>
        <div className={style.contentM}>
          <Link href="/" className={style.logoBxM}>
            <h2>Ch1llMark3t</h2>
          </Link>
          <div className={style.hamBox}>
            <svg
              className="ham hamRotate ham4 menu-open"
              viewBox="0 0 100 100"
              width="45"
              id="ham04_2"
              ref={openMenu}
              onClick={handleToggle}
            >
              <path
                className="hline top"
                d="m 70,33 h -40 c 0,0 -8.5,-0.149796 -8.5,8.5 0,8.649796 8.5,8.5 8.5,8.5 h 20 v -20"
              />
              <path className="hline middle" d="m 70,50 h -40" />
              <path
                className="hline bottom"
                d="m 30,67 h 40 c 0,0 8.5,0.149796 8.5,-8.5 0,-8.649796 -8.5,-8.5 -8.5,-8.5 h -20 v 20"
              />
            </svg>
          </div>
        </div>
        <div className={style.navMenu} ref={menu}>
          <div className={style.menuContent}>
            <div className={style.mLinks} ref={links}>
              <Link href={`/profile/${address}`}>
                <p>Buy</p>
              </Link>{" "}
              <Link href={`/profile/${address}`}>
                <p>Sell</p>
              </Link>
            </div>
            <div className={style.accountM} ref={btn}>
              <ConnectWallet btnTitle="Connect" className={style.connectBtn2} />
              {address && (
                <Link
                  //as={NextLink}
                  href={`/profile/${address}`}
                >
                  <Image src={user} alt="user" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBarMobile;

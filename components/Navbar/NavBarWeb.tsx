import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import Link from "next/link";
//import NextLink from "next/link";
import Image from "next/image";
import style from "./NavBar.module.scss";

import user from "./user3.svg";

const NavbarWeb = () => {
  const address = useAddress();
  return (
    <>
      <div className={style.container}>
        <div className={style.content}>
          <Link href="/" className={style.logoBx}>
            <h2>Ch1llMark3t</h2>
          </Link>
          <div className={style.links}>
            <Link
              //as={NextLink}
              href={`/profile/${address}`}
            >
              <p>Buy</p>
            </Link>
            <Link
              //as={NextLink}
              href={`/profile/${address}`}
            >
              <p>Sell</p>
            </Link>
          </div>
          <div className={style.account}>
            <ConnectWallet btnTitle="Connect" className={style.connectBtn} />
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
    </>
  );
};

export default NavbarWeb;

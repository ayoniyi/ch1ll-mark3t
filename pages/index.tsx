import { useState, useEffect } from "react";
import type { NFT as NFTType } from "@thirdweb-dev/sdk";
import { useContract, useNFTs } from "@thirdweb-dev/react";
import { NFT_COLLECTION_ADDRESS } from "../constants/addresses";
import Card from "../components/Card/Card";
import style from "../styles/Home.module.scss";
//import Image from "next/image";
import { NextPage } from "next";
import Link from "next/link";
import Skeleton from "../components/Card/Skeleton";

type Props = {
  overrideOnclickBehavior?: (nft: NFTType) => void;
};

const Home = ({ overrideOnclickBehavior }: Props) => {
  const [item, setItem] = useState<any>();
  const { contract } = useContract(NFT_COLLECTION_ADDRESS);
  const { data, isLoading } = useNFTs(contract);

  useEffect(() => {
    if (data) {
      setItem(data);
      console.log("nft>>>", data);
    }
  }, [data]);

  return (
    <>
      <div className={style.container}>
        <div className={style.hero}>
          <div className={style.heroTxt}>
            <h1>Discover, Collect And Sell Ch1ll NFTs</h1>
            <Link href="/token/buy">
              <button>Explore Market</button>
            </Link>
          </div>

          <div className={style.imageBx}>
            {item ? (
              <div className={style.nftA}>
                <Link
                  href={`/token/buy/${NFT_COLLECTION_ADDRESS}/${item[1].metadata.id}`}
                >
                  <Card nft={item[1]} action="buy" />
                </Link>
              </div>
            ) : (
              <div className={style.nftA}>
                <Skeleton />
              </div>
            )}
            {item ? (
              <div className={style.nftB}>
                <Link
                  href={`/token/buy/${NFT_COLLECTION_ADDRESS}/${item[0].metadata.id}`}
                >
                  <Card nft={item[0]} action="buy" />
                </Link>
              </div>
            ) : (
              <div className={style.nftB}>
                <Skeleton />
              </div>
            )}
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

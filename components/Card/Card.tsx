import React from "react";
import { NFT } from "@thirdweb-dev/sdk";
import {
  MARKETPLACE_ADDRESS,
  NFT_COLLECTION_ADDRESS,
} from "../../constants/addresses";
import {
  ThirdwebNftMedia,
  useContract,
  useValidDirectListings,
  //useValidEnglishAuctions,
} from "@thirdweb-dev/react";
//import Img from "./img.png";
import style from "./Card.module.scss";
//import Image from "next/image";
//import Skeleton from "./Skeleton";

type Props = {
  action?: string;
  nft?: any;
};

const Card = ({ action, nft }: Props) => {
  const { contract: marketplace, isLoading: loadingMarketplace } = useContract(
    MARKETPLACE_ADDRESS,
    "marketplace-v3"
  );

  const { data: directListing, isLoading: loadingDirectListing } =
    useValidDirectListings(marketplace, {
      //tokenContract: NFT_COLLECTION_ADDRESS,
      tokenId: nft?.metadata.id,
    });
  //console.log(nft);
  return (
    <>
      <div className={style.container}>
        <div className={style.cardTop}>
          {/* <Image src={Img} alt="nft" /> */}
          <ThirdwebNftMedia
            metadata={nft?.metadata}
            height={"100%"}
            width={"100%"}
            style={{
              width: "100%",
              height: "550px",
              //borderRadius: "15px",
            }}
          />
          <div className={style.cardTitles}>
            <h2>
              {/* The russeau  */}
              {nft?.metadata.name}
            </h2>
            <p>Art Hunter</p>
          </div>
        </div>

        <div className={style.cardBtm}>
          <div className={style.description}>
            <div className={style.descTop}>
              {action === "buy" && <p>Price</p>}
              <p>
                ID
                {/* #02  */} #{nft?.metadata.id}
              </p>
            </div>
            {directListing && directListing[0] ? (
              <div className={style.descBtm}>
                {action === "buy" && directListing && (
                  <p>
                    {/* 0.1 MATIC */}
                    {`${directListing[0]?.currencyValuePerToken.displayValue} ${directListing[0]?.currencyValuePerToken.symbol}`}
                  </p>
                )}
                <button disabled={!directListing}>
                  {action === "buy" ? "Buy" : "Sell"}
                </button>
              </div>
            ) : (
              <div className={style.descBtm}>
                {action === "buy" && (
                  <p>
                    {/* 0.1 MATIC */}
                    Not Listed
                  </p>
                )}
                <button disabled={!directListing}>
                  {action === "buy" ? "Buy" : "Sell"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;

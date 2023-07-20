import {
  MediaRenderer,
  ThirdwebNftMedia,
  Web3Button,
  useContract,
  useMinimumNextBid,
  useValidDirectListings,
  useValidEnglishAuctions,
} from "@thirdweb-dev/react";
import { NFT, ThirdwebSDK } from "@thirdweb-dev/sdk";
import { useState } from "react";
import {
  MARKETPLACE_ADDRESS,
  NFT_COLLECTION_ADDRESS,
} from "../../../../constants/addresses";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import style from "../../Trade.module.scss";
//import Link from "next/link";

import Back from "../../back.svg";
import Image from "next/image";
import Item from "../../item.svg";
// import Box from "../../box.svg";
// import Circle from "../../circle.svg";
import user from "../../../../components/Navbar/user3.svg";
import SkeletonImg from "../../../../components/Card/SkeletonImg";

type Props = {
  nft: NFT;
  contractMetadata: any;
};

const TokenBuy = ({ nft, contractMetadata }: Props) => {
  const router = useRouter();
  const { contract: marketplace, isLoading: loadingMarketplace } = useContract(
    MARKETPLACE_ADDRESS,
    "marketplace-v3"
  );
  const { data: directListing, isLoading: loadingDirectListing } =
    useValidDirectListings(marketplace, {
      tokenContract: NFT_COLLECTION_ADDRESS,
      tokenId: nft?.metadata.id,
    });

  async function buyListing() {
    let txResult;

    //Add for auction section
    if (directListing?.[0]) {
      txResult = await marketplace?.directListings.buyFromListing(
        directListing[0].id,
        1
      );
    } else {
      throw new Error("No listing found");
    }

    return txResult;
  }

  return (
    <>
      <div className={style.container}>
        <div className={style.content}>
          <div
            //href="#"
            onClick={() => router.back()}
            className={style.top}
          >
            <Image src={Back} alt="back" />
          </div>
          <div className={style.body}>
            <div className={style.itemImg}>
              {/* <Image src={Item} alt="item" /> */}
              {!loadingMarketplace && !loadingDirectListing ? (
                <ThirdwebNftMedia
                  metadata={nft?.metadata}
                  style={{
                    width: "100%",
                    height: "600px",
                    borderRadius: "15px",
                  }}
                />
              ) : (
                <SkeletonImg />
              )}
            </div>
            <div className={style.itemTxt}>
              <div className={style.title}>
                <div className={style.collection}>
                  {/* <Image src={Box} alt="collection" /> */}
                  <MediaRenderer
                    src={contractMetadata.image}
                    height="32px"
                    width="32px"
                  />
                  <p>{contractMetadata.name}</p>
                </div>
                <h2>
                  {/* The russeau  */}
                  {nft.metadata.name}
                </h2>
                <div className={style.collection}>
                  <Image src={user} alt="collection" />
                  <p>
                    {" "}
                    {nft.owner.slice(0, 6)}...{nft.owner.slice(-4)}
                  </p>
                </div>
              </div>
              <div className={style.desc}>
                <div className={style.descTxt}>
                  <h3>Description</h3>
                  <p>
                    This is a one in a kind bot, yours truly Afen bot special
                    NFT. Blockchain has the potential to adequately transform
                    African society. Offering insurmountable opportunities to
                    those leveraging it to build a new structure in diverse
                    sectors.{" "}
                  </p>
                </div>
                <div className={style.price}>
                  <p>Price :</p>
                  {directListing && directListing[0] ? (
                    <h3>
                      {directListing[0]?.currencyValuePerToken.displayValue}
                      {" " + directListing[0]?.currencyValuePerToken.symbol}
                    </h3>
                  ) : (
                    <h3>Not for sale</h3>
                  )}
                </div>
                {/* <button>Buy at asking price</button> */}
                <Web3Button
                  contractAddress={MARKETPLACE_ADDRESS}
                  action={async () => buyListing()}
                  isDisabled={!directListing || !directListing[0]}
                >
                  Buy at asking price
                </Web3Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TokenBuy;

export const getStaticProps: GetStaticProps = async (context) => {
  const tokenId = context.params?.tokenId as string;

  const sdk = new ThirdwebSDK("mumbai");

  const contract = await sdk.getContract(NFT_COLLECTION_ADDRESS);

  const nft = await contract.erc721.get(tokenId);

  let contractMetadata;

  try {
    contractMetadata = await contract.metadata.get();
  } catch (e) {}

  return {
    props: {
      nft,
      contractMetadata: contractMetadata || null,
    },
    revalidate: 1, // https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const sdk = new ThirdwebSDK("mumbai");

  const contract = await sdk.getContract(NFT_COLLECTION_ADDRESS);

  const nfts = await contract.erc721.getAll();

  const paths = nfts.map((nft) => {
    return {
      params: {
        contractAddress: NFT_COLLECTION_ADDRESS,
        tokenId: nft.metadata.id,
      },
    };
  });

  return {
    paths,
    fallback: "blocking", // can also be true or 'blocking'
  };
};

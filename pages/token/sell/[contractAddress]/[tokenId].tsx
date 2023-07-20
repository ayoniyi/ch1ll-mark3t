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
import {
  MARKETPLACE_ADDRESS,
  NFT_COLLECTION_ADDRESS,
} from "../../../../constants/addresses";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import style from "../../Trade.module.scss";
import Back from "../../back.svg";
import Image from "next/image";
//import Item from "../../item.svg";
//import Link from "next/link";
//import Box from "../../box.svg";
import user from "../../../../components/Navbar/user3.svg";
import SkeletonImg from "../../../../components/Card/SkeletonImg";

type Props = {
  nft: NFT;
  contractMetadata: any;
};

const TokenSell = ({ nft, contractMetadata }: Props) => {
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

  return (
    <>
      <div className={style.container}>
        <div className={style.content}>
          <div onClick={() => router.back()} className={style.top}>
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

                <button>Put On Sale - coming soon</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TokenSell;

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

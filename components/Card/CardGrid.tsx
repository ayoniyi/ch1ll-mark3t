import style from "./Card.module.scss";
import type { NFT as NFTType } from "@thirdweb-dev/sdk";
import { NFT_COLLECTION_ADDRESS } from "../../constants/addresses";
import Card from "./Card";
import Skeleton from "./Skeleton";
import Link from "next/link";

type Props = {
  isLoading: boolean;
  data: NFTType[] | undefined;
  overrideOnclickBehavior?: (nft: NFTType) => void;
  emptyText?: string;
  action?: string;
};

const CardGrid = ({
  isLoading,
  data,
  overrideOnclickBehavior,
  emptyText = "No NFTs found",
  action,
}: Props) => {
  return (
    <>
      {/* <div className={style.grid}>
        <Card action={action} />
        
        <Card action={action} />
        <Skeleton />
      </div> */}
      <div className={style.grid}>
        {isLoading ? (
          [...Array(20)].map((_, index) => <Skeleton key={index} />)
        ) : data && data.length > 0 ? (
          data.map(
            (nft) => (
              //!overrideOnclickBehavior ? (
              <Link
                href={`/token/${action}/${NFT_COLLECTION_ADDRESS}/${nft.metadata.id}`}
                key={nft.metadata.id}
              >
                <Card nft={nft} action={action} />
              </Link>
            )
            // ) : (
            //   <div
            //     key={nft.metadata.id}
            //     onClick={() => overrideOnclickBehavior(nft)}
            //   >
            //     <Card nft={nft} action={action} />
            //   </div>
            // )
          )
        ) : (
          <p>{emptyText}</p>
        )}
      </div>
    </>
  );
};

export default CardGrid;

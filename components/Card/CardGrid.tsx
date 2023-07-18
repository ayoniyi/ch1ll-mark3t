import style from "./Card.module.scss";
import type { NFT as NFTType } from "@thirdweb-dev/sdk";
import { NFT_COLLECTION_ADDRESS } from "../../constants/addresses";

type Props = {
  isLoading: boolean;
  data: NFTType[] | undefined;
  overrideOnclickBehavior?: (nft: NFTType) => void;
  emptyText?: string;
};

const CardGrid = ({
  isLoading,
  data,
  overrideOnclickBehavior,
  emptyText = "No NFTs found",
}: Props) => {
  return <div className={style.grid}></div>;
};

export default CardGrid;

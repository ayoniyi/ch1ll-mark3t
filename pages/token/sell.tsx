import React from "react";
import CardGrid from "../../components/Card/CardGrid";
import { NFT_COLLECTION_ADDRESS } from "../../constants/addresses";
import { useContract, useNFTs } from "@thirdweb-dev/react";
import style from "./Token.module.scss";

const Buy = () => {
  const { contract } = useContract(NFT_COLLECTION_ADDRESS);
  const { data, isLoading } = useNFTs(contract);
  return (
    <>
      <div className={style.container}>
        <div className={style.content}>
          <div className={style.top}>
            <h2>Sell NFTs</h2>
            <p>Select which of your NFTs to sell.</p>
          </div>

          <CardGrid
            isLoading={isLoading}
            data={data}
            emptyText={"No NFTs found"}
            action="sell"
          />
        </div>
      </div>
    </>
  );
};

export default Buy;

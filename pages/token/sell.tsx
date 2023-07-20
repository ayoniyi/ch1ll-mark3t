// import {useState} from "react";
import CardGrid from "../../components/Card/CardGrid";
import { NFT_COLLECTION_ADDRESS } from "../../constants/addresses";
import { useAddress, useContract, useOwnedNFTs } from "@thirdweb-dev/react";

import style from "./Token.module.scss";

const Buy = () => {
  const address = useAddress();
  const { contract } = useContract(NFT_COLLECTION_ADDRESS);
  const { data, isLoading } = useOwnedNFTs(contract, address);
  return (
    <>
      <div className={style.container}>
        <div className={style.content}>
          <div className={style.top}>
            <h2>Sell NFTs</h2>
            <p>Select which of your owned NFTs to sell.</p>
          </div>

          <CardGrid
            isLoading={isLoading}
            data={data}
            emptyText={"You don't own any NFTs yet from this collection."}
            action="sell"
          />
        </div>
      </div>
    </>
  );
};

export default Buy;

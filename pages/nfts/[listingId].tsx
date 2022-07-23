import {
    MediaRenderer,
    useMarketplace,
    useNetwork,
    useNetworkMismatch,
    useListing,
  } from "@thirdweb-dev/react";
  import { ChainId, ListingType, NATIVE_TOKENS } from "@thirdweb-dev/sdk";
  import type { NextPage } from "next";
  import { useRouter } from "next/router";
  import { useState } from "react";
  import styles from "../../styles/Home.module.css";
  
  const ListingPage: NextPage = () => {
    const router = useRouter();
    const { listingId } = router.query as { listingId: string };
  
    const networkMismatch = useNetworkMismatch();
    const [, switchNetwork] = useNetwork();
  
    const marketplace = useMarketplace(
      "0x3Fe6cfeb8530B3283c4d3E276BCC418FFdc0b748" 
    );
  
    const { data: listing, isLoading: loadingListing } = useListing(
      marketplace,
      listingId
    );
  
    const [bidAmount, setBidAmount] = useState<string>("");
  
    if (loadingListing) {
      return <div className={styles.loadingOrError}>Loading...</div>;
    }
  
    if (!listing) {
      return <div className={styles.loadingOrError}>Listing not found</div>;
    }
  
    async function createBidOrOffer() {
      try {
        if (networkMismatch) {
          switchNetwork && switchNetwork(4);
          return;
        }
  
        if (listing?.type === ListingType.Direct) {
          await marketplace?.direct.makeOffer(
            listingId, 
            1, 
            NATIVE_TOKENS[ChainId.Rinkeby].wrapped.address, 
            bidAmount 
          );
        }
  
        if (listing?.type === ListingType.Auction) {
          await marketplace?.auction.makeBid(listingId, bidAmount);
        }
  
        alert(
          `${
            listing?.type === ListingType.Auction ? "Bid" : "Offer"
          } created successfully!`
        );
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
  
    async function buyNft() {
      try {
        if (networkMismatch) {
          switchNetwork && switchNetwork(4);
          return;
        }
  
        await marketplace?.buyoutListing(listingId, 1);
        alert("NFT bought successfully!");
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
  
    return (
      <div className={styles.container} style={{}}>
        <div className={styles.listingContainer}>
          <div className={styles.leftListing}>
            <MediaRenderer
              src={listing.asset.image}
              className={styles.mainNftImage}
            />
          </div>
  
          <div className={styles.rightListing}>
            <h1>{listing.asset.name}</h1>
            <p>
              Owned by{" "}
              <b>
                {listing.sellerAddress?.slice(0, 6) +
                  "..." +
                  listing.sellerAddress?.slice(36, 40)}
              </b>
            </p>
  
            <h2>
              <b>{listing.buyoutCurrencyValuePerToken.displayValue}</b>{" "}
              {listing.buyoutCurrencyValuePerToken.symbol}
            </h2>
  
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 20,
                alignItems: "center",
              }}
            >
              <button
                style={{ borderStyle: "none" }}
                className={styles.mainButton}
                onClick={buyNft}
              >
                Buy
              </button>
              <p style={{ color: "grey" }}>|</p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <input
                  type="text"
                  name="bidAmount"
                  className={styles.textInput}
                  onChange={(e) => setBidAmount(e.target.value)}
                  placeholder="Amount"
                  style={{ marginTop: 0, marginLeft: 0, width: 128 }}
                />
                <button
                  className={styles.mainButton}
                  onClick={createBidOrOffer}
                  style={{
                    borderStyle: "none",
                    background: "transparent",
                    width: "fit-content",
                  }}
                >
                  Make Offer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default ListingPage;
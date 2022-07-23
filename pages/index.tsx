import Head from "next/head";
import type { NextPage } from "next";
import Link from "next/link";
import tw from "tailwind-styled-components";
import styles from "../styles/Home.module.css";
import {
  MediaRenderer,
  useActiveListings,
  useMarketplace,
} from "@thirdweb-dev/react";
import { useRouter } from "next/router";

// Components
import Header from "../components/Header";
import Footer from "../components/Footer";

const Home: NextPage = () => {
  const router = useRouter();

  const marketplace = useMarketplace(
    "0x3Fe6cfeb8530B3283c4d3E276BCC418FFdc0b748" 
  );

  const { data: listings, isLoading: loadingListings } =
    useActiveListings(marketplace);



    return (
      <>
        {/* Content */}
        <div className={styles.container}>
          {/* Top Section */}
          <h1 className={styles.h1}>NFT Marketplace w/ thirdweb + Next.JS</h1>
          <hr className={styles.divider} />
  
          <div style={{ marginTop: 32, marginBottom: 32 }}>
            <Link href="/create">
              <a className={styles.mainButton} style={{ textDecoration: "none" }}>
                Create A Listing
              </a>
            </Link>
          </div>
  
          <div className="main">
            {
              loadingListings ? (
                <div>Loading listings ser...Stay Calm & Enjoy the Experiment</div>
              ) : (
                <div className={styles.listingGrid}>
                  {listings?.map((listing) => (
                    <div
                      key={listing.id}
                      className={styles.listingShortView}
                      onClick={() => router.push(`/nfts/${listing.id}`)}
                    >
                      <MediaRenderer
                        src={listing.asset.image}
                        style={{
                          borderRadius: 16,
                          width: "100%",
                          height: "100%",
                        }}
                      />
                      <h2 className={styles.nameContainer}>
                        <Link href={`/nfts/${listing.id}`}>
                          <a className={styles.name}>{listing.asset.name}</a>
                        </Link>
                      </h2>
  
                      <p>
                        <b>{listing.buyoutCurrencyValuePerToken.displayValue}</b>{" "}
                        {listing.buyoutCurrencyValuePerToken.symbol}
                      </p>
                    </div>
                  ))}
                </div>
              )
            }
          </div>
        </div>
      </>
    );
  };
  
export default Home;
import styles from "./page.module.css";
import React from "react";
import Image from "next/image";

interface IApiAdvertisement {
  data: {
    attributes: {
      title: string;
      photos: {
        data: { attributes: { url: string; width: number; height: number } }[];
      };
    };
  }[];
}

const getAdvertisements = async () =>
  await fetch(process.env.CMS_API + "advertisements?populate=photos", {
    cache: "no-cache",
  })
    .then((res) => res.json())
    .then((data) => data);

const Home = async () => {
  const ads: IApiAdvertisement = await getAdvertisements();
  return (
    <main className={styles.main}>
      <h1>GSK Next test</h1>
      {ads.data.map((item) => (
        <>
          <p key={item.attributes.title}>{item.attributes.title}</p>

          <Image
            src={
              "http://localhost:1337" +
              ads.data[1].attributes.photos.data[0].attributes.url
            }
            width={ads.data[1].attributes.photos.data[0].attributes.width}
            height={ads.data[1].attributes.photos.data[0].attributes.height}
            alt={"ad image"}
          />
        </>
      ))}
    </main>
  );
};

export default Home;

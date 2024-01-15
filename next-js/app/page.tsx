"use client";
import styles from "./page.module.css";
import React from "react";
import Image from "next/image";
import { decrement, increment } from "@/lib/features/counter/counterSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

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

const Home = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
    /*<main className={styles.main}>
        <h1>GSK Next test</h1>
        {ads.data &&
          ads.data.map((item) => (
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
      </main>*/
  );
};

export default Home;

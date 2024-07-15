import localFont from "next/font/local";
export const gilroyFont = localFont({
  src: [
    {
      path: "./Gilroy-Regular.woff",
      weight: "400",
      style: "normal",
      preload: false,
    },
    {
      path: "./Gilroy-Medium.woff",
      weight: "500",
      style: "normal",
      preload: false,
    },
    {
      path: "./Gilroy-Light.woff",
      weight: "300",
      style: "normal",
      preload: false,
    },
    {
      path: "./Gilroy-Bold.woff",
      weight: "700",
      style: "normal",
      preload: false,
    },
    {
      path: "./Gilroy-Heavy.woff",
      weight: "900",
      style: "normal",
      preload: false,
    },
  ],
});

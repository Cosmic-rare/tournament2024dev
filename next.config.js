/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: process.env.DEPLOY == "s3" ? "https://s3.tani-exe.net/tournament2024" : null,
  basePath: process.env.DEPLOY == "s3" ? "/tournament2024" : null,
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
        },
      ],
    });
    return config;
  },
  images: {
    disableStaticImages: true, // importした画像の型定義設定を無効にする
  },
}

module.exports = nextConfig

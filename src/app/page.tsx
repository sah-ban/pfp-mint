import { Metadata } from "next";
import App from "@/app/app";

const appUrl = process.env.NEXT_PUBLIC_URL;

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const frame = {
    version: "next",
    imageUrl: `${appUrl}/og.png`,
    button: {
      title: "mint your pfp",
      action: {
        type: "launch_frame",
        name: "PFP → NFT",
        url: `${appUrl}`,
        splashImageUrl: `${appUrl}/splash.png`,
        splashBackgroundColor: "#333333",
      },
    },
  };

  return {
    title: "PFP → NFT",
    openGraph: {
      title: "PFP → NFT",
      description: "turn your pfp into an nft",
      images: [
        {
          url: `${appUrl}/og.png`,
          width: 1200,
          height: 630,
          alt: "GIF Search",
        },
      ],
    },
    other: {
      "fc:frame": JSON.stringify(frame),
    },
  };
}

export default function Home() {
  return <App />;
}

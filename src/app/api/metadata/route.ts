import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const imageUrl = req.nextUrl.searchParams.get("url");
  const fid = req.nextUrl.searchParams.get("fid");
  const time = Math.floor(Date.now() / 1000);

  return NextResponse.json({
    name: `PFP #${fid} `,
    description: `A unique 1/1 NFT crafted from the original profile picture of FID ${fid}.`,
    image: imageUrl,
    external_url: `https://farcaster.xyz/~/profiles/${fid}`,
    attributes: [
      { trait_type: "fid", value: fid },
      {
        trait_type: "Edition",
        value: "1/1",
      },
      {
        trait_type: "Rarity",
        value: "Unique PFP",
      },
      { trait_type: "Platform", value: "Farcaster" },
      {
        display_type: "date",
        trait_type: "Minted On",
        value: time,
      },
    ],
  });
}

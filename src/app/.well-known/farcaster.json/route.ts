export async function GET() {
  const appUrl = process.env.NEXT_PUBLIC_URL;

  const config = {
    accountAssociation: {
      header:
        "eyJmaWQiOjI2ODQzOCwidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweDIxODA4RUUzMjBlREY2NGMwMTlBNmJiMEY3RTRiRkIzZDYyRjA2RWMifQ",
      payload: "eyJkb21haW4iOiJwZnAuaXRzY2FzaGxlc3MuY29tIn0",
      signature:
        "LMFUj36XMRDk4rBdWmk0gjBfE59c86N7QiWveP5+6Fk+Q6hr/hBAe+/jAUNFyB7GaBkwhFb55+CEWMfxFRKlgBw=",
    },
    frame: {
      version: "1",
      name: "PFP → NFT",
      iconUrl: `${appUrl}/logo.png`,
      homeUrl: appUrl,
      buttonTitle: "mint your pfp",
      splashImageUrl: `${appUrl}/splash.png`,
      splashBackgroundColor: "#f5f1ea",
      description: "turn your pfp into an nft",
      primaryCategory: "utility",
      webhookUrl: `${appUrl}/api/webhook`,
    },
    baseBuilder: {
      allowedAddresses: ["0x06e5B0fd556e8dF43BC45f8343945Fb12C6C3E90"],
    },
  };

  return Response.json(config);
}

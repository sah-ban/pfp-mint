# PFP → NFT

A [Farcaster miniapp](https://pfp.itscashless.com) that lets you mint your profile picture as a unique **1/1 ERC-721 NFT** on **Base** — in one tap.

## ✨ Features

- **One-tap minting** — Connect wallet and mint your Farcaster PFP as an on-chain NFT
- **1/1 unique tokens** — Each NFT is tied to your Farcaster ID (FID), so no duplicates
- **On-chain metadata** — Dynamic metadata API serves name, image, traits, and mint date
- **Post-mint actions** — Cast about your mint or view it on OpenSea directly from the app
- **Haptic feedback** — Native vibration on successful mint for a satisfying UX

## 🛠 Tech Stack

| Layer          | Technology                                                                     |
| -------------- | ------------------------------------------------------------------------------ |
| Framework      | [Next.js 15](https://nextjs.org/) (App Router)                                 |
| Language       | TypeScript                                                                     |
| Styling        | [Tailwind CSS 4](https://tailwindcss.com/)                                     |
| Blockchain     | [wagmi](https://wagmi.sh/) + [viem](https://viem.sh/)                          |
| Data Fetching  | [TanStack React Query](https://tanstack.com/query)                             |
| Farcaster      | [@farcaster/miniapp-sdk](https://www.npmjs.com/package/@farcaster/miniapp-sdk) |
| Smart Contract | Solidity (ERC-721 via OpenZeppelin)                                            |
| Chain          | [Base](https://base.org/)                                                      |

## 📁 Project Structure

```
src/
├── app/
│   ├── .well-known/farcaster.json/  # Farcaster miniapp manifest
│   ├── api/metadata/                # Dynamic NFT metadata endpoint
│   ├── layout.tsx                   # Root layout with providers
│   ├── page.tsx                     # Entry page with frame metadata
│   ├── providers.tsx                # Client-side provider wrapper
│   └── globals.css                  # Global styles
├── components/
│   ├── providers/WagmiProvider.tsx   # Wagmi + React Query config (Base chain)
│   ├── Connect.tsx                  # Wallet connection button
│   └── Main.tsx                     # Core mint UI & logic
├── contracts/
│   ├── contract.sol                 # Pfp ERC-721 smart contract
│   └── abi.json                     # Contract ABI
public/
├── logo.png                         # App icon
├── og.png                           # Open Graph image
└── splash.png                       # Splash screen image
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 20.18.0
- **Yarn** (or npm)

### Installation

```bash
# Clone the repo
git clone https://github.com/sah-ban/pfp-mint.git
cd pfp-mint

# Install dependencies
yarn install
```

### Environment Variables

Create a `.env` file in the project root:

```env
NEXT_PUBLIC_URL=https://your-domain.com
```

### Development

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) — note that the full experience requires access from within a Farcaster client (e.g. Warpcast).

### Production Build

```bash
yarn build
yarn start
```

## 📜 Smart Contract

| Detail       | Value                                        |
| ------------ | -------------------------------------------- |
| **Name**     | Farcaster PFP                                |
| **Symbol**   | PFP                                          |
| **Chain**    | Base                                         |
| **Address**  | `0x994CdBEb0702D65232D84a6A419ce81788C287db` |
| **Mint Fee** | 0.00036 ETH                                  |
| **Token ID** | User's Farcaster FID                         |
| **Standard** | ERC-721 (with URI Storage)                   |

## 🔗 Links

- **Miniapp** — [pfp.itscashless.com](https://pfp.itscashless.com)
- **OpenSea** — [Collection on OpenSea](https://opensea.io/collection/farcaster-pfp)
- **Contract** — [View on BaseScan](https://basescan.org/address/0x994CdBEb0702D65232D84a6A419ce81788C287db)

---

Built by [@cashlessman.eth](https://farcaster.xyz/cashlessman.eth)

"use client";

import React, { useState, useEffect } from "react";
import sdk, { type Context } from "@farcaster/miniapp-sdk";
import Connect from "./Connect";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
  useReadContract,
} from "wagmi";
import { Address } from "viem";
import abi from "../contracts/abi.json";
import { base } from "wagmi/chains";
import { parseEther } from "viem";

export default function MintPfp() {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [context, setContext] = useState<Context.MiniAppContext>();
  const [isClicked, setIsClicked] = useState(false);
  const { isConnected, chain } = useAccount();

  useEffect(() => {
    const load = async () => {
      const context = await sdk.context;
      setContext(context);

      sdk.actions.ready({});
    };
    if (sdk && !isSDKLoaded) {
      setIsSDKLoaded(true);
      load();
      return () => {
        sdk.removeAllListeners();
      };
    }
  }, [isSDKLoaded]);

  const CONTRACT_ADDRESS =
    "0x994CdBEb0702D65232D84a6A419ce81788C287db" as Address;

  // Write hook
  const { writeContract, data: hash, isPending } = useWriteContract();

  // Track confirmation
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash });

  const { data: alreadyMinted } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi,
    functionName: "isMinted",
    args: [BigInt(context?.user.fid || 0)],
    chainId: base.id,
  });

  const handleMint = async () => {
    setIsClicked(true);

    setTimeout(async () => {
      try {
        if (!isConnected) {
          alert("Please connect your wallet.");
          return;
        }

        if (chain?.id !== base.id) {
          alert("Please switch to the Base network.");
          return;
        }

        if (!context?.user.fid || !context.user.pfpUrl) {
          alert("No valid FID or PFP found.");
          return;
        }

        if (isConfirmed) {
          sdk.actions.composeCast({
            text: "Just turned my PFP into an onchain NFT 😤💎\nImmutable. Ownable. Forever mine.\nMint yours now!",
            embeds: [
              `${process.env.NEXT_PUBLIC_URL}`,
              `https://opensea.io/item/base/${CONTRACT_ADDRESS}/${context.user.fid}`,
            ],
          });
          return;
        }

        // Write contract
        await writeContract({
          address: CONTRACT_ADDRESS,
          abi,
          functionName: "mint",
          args: [BigInt(context.user.fid), context.user.pfpUrl],
          value: parseEther("0.0003"),
          chainId: base.id,
        });
      } catch {
        alert("Failed to mint NFT.");
      } finally {
        setIsClicked(false); // Always reset
      }
    }, 500);
  };

  useEffect(() => {
    if (isConfirmed) {
      sdk.haptics.notificationOccurred("success");
    }
  }, [isConfirmed]);

  useEffect(() => {
    if (context && !context?.client.added && isConfirmed) {
      sdk.actions.addMiniApp();
    }
  }, [context, context?.client.added, isConfirmed]);

  if (!context)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="flex flex-col items-center justify-center text-white text-2xl p-4">
          <p className="flex items-center justify-center text-center">
            You need to access this mini app from inside a farcaster client
          </p>
          <div
            className="flex items-center justify-center text-center bg-indigo-800 p-3 rounded-lg mt-4 cursor-pointer"
            onClick={() =>
              window.open(
                "https://farcaster.xyz/miniapps/EA9J8_1X1y_W/pfp--nft",
                "_blank"
              )
            }
          >
            Open in Farcaster
          </div>
        </div>
      </div>
    );

  if (!isConnected) {
    return (
      <div className="flex items-center justify-center h-screen w-full bg-slate-900">
        <Connect />
      </div>
    );
  }

  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-between px-6 py-4 text-white">
      {/* Top title */}
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight">Your PFP → NFT</h1>
        <p className="text-purple-200 mt-2 text-sm">
          One tap to own it forever on-chain
        </p>
      </div>

      {/* Main glowing PFP with premium frame */}
      <div className="flex-1 flex items-center justify-center">
        <div className="relative">
          {/* Outer glow ring */}
          <div className="absolute inset-0 rounded-full bg-purple-500 blur-3xl opacity-50 animate-pulse"></div>

          {/* Gradient border ring */}
          <div className="relative animate-float">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition duration-1000" />
            <div className="relative p-6 bg-black/40 backdrop-blur-2xl rounded-full border border-white/20">
              <img
                src={context?.user.pfpUrl || ""}
                className="w-80 h-80 rounded-full object-cover ring-4 ring-white/30"
                alt="User PFP"
              />
            </div>
            <div className="absolute inset-0 rounded-full bg-white/5 " />
          </div>
        </div>
      </div>
      {!alreadyMinted && (
        <button
          onClick={handleMint}
          className="text-black bg-white text-center py-2 rounded-xl font-semibold text-lg shadow-lg relative overflow-hidden transform transition-all duration-200 hover:scale-110 active:scale-95 flex items-center justify-center gap-2 mb-4 cursor-pointer"
        >
          <div
            className={`absolute inset-0 bg-gray-600 transition-all duration-500 ${
              isClicked ? "scale-x-100" : "scale-x-0"
            }`}
            style={{ transformOrigin: "center" }}
          ></div>
          <style>{`
              @keyframes gradientAnimation {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
              }
            `}</style>
          <div className="flex flex-row gap-2 px-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 relative z-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
              />
            </svg>{" "}
            <span className="relative z-10">
              {isPending
                ? "Processing..."
                : isConfirming
                ? "Minting..."
                : isConfirmed
                ? "Minted!, Caste It!"
                : "Mint Your PFP"}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 relative z-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
              />
            </svg>{" "}
          </div>
        </button>
      )}
      {(alreadyMinted || isConfirmed) && (
        <button
          className="bg-white text-black font-bold px-4 py-3 rounded-xl text-lg transition cursor-pointer flex items-center"
          onClick={() =>
            sdk.actions.openUrl(
              `https://opensea.io/item/base/${CONTRACT_ADDRESS}/${context?.user.fid}`
            )
          }
        >
          Already Minted, View on OpenSea
        </button>
      )}
      {/* Mint Button */}
      <div className="w-full max-w-sm pb-10">
        <p className="text-center text-purple-300 text-xs mt-4">
          Limited edition • 1/1 • Yours forever
        </p>
      </div>

      {/* Optional custom CSS for slow spin */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

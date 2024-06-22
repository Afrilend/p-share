"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useEffect, useMemo, useState } from "react";
import {
  InputBase
} from "~~/components/scaffold-stark";
import { CheckIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { accountsDetails } from "./../data/accountsDetails";
import { useAccount } from "@starknet-react/core";
import { Address as AddressType, devnet } from "@starknet-react/chains";
import { BanknotesIcon } from "@heroicons/react/24/outline";
import {
  Address,
  AddressInput,
  Balance,
  EtherInput,
} from "~~/components/scaffold-stark";
import { useNetwork } from "@starknet-react/core";
import { mintEth } from "~~/services/web3/faucet";
import { useTargetNetwork } from "~~/hooks/scaffold-stark/useTargetNetwork";
import { RpcProvider } from "starknet";
import { notification } from "~~/utils/scaffold-stark";

const CreditorPlatform: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [sendValue, setSendValue] = useState("");
  const connectedAddress = useAccount();
  const [inputAddress, setInputAddress] = useState<AddressType>();
  const [faucetAddress] = useState<AddressType>(
    "0x78662e7352d062084b0010068b99288486c2d8b914f6e2a55ce945f8792c8b1",
  );

  const { chain: ConnectedChain } = useNetwork();
  const { targetNetwork } = useTargetNetwork();

  const publicNodeUrl = targetNetwork.rpcUrls.public.http[0];

  // Use useMemo to memoize the publicClient object
  const publicClient = useMemo(() => {
    return new RpcProvider({
      nodeUrl: publicNodeUrl,
    });
  }, [publicNodeUrl]);

  useEffect(() => {
    const checkChain = async () => {
      try {
        const providerInfo = await publicClient.getBlock();
        console.log(providerInfo);
      } catch (error) {
        console.error("⚡️ ~ file: Faucet.tsx:checkChain ~ error", error);
        notification.error(
          <>
            <p className="font-bold mt-0 mb-1">
              Cannot connect to local provider
            </p>
            <p className="m-0">
              - Did you forget to run{" "}
              <code className="italic bg-base-300 text-base font-bold">
                yarn chain
              </code>{" "}
              ?
            </p>
            <p className="mt-1 break-normal">
              - Or you can change{" "}
              <code className="italic bg-base-300 text-base font-bold">
                targetNetwork
              </code>{" "}
              in{" "}
              <code className="italic bg-base-300 text-base font-bold">
                scaffold.config.ts
              </code>
            </p>
          </>,
          {
            duration: 5000,
          },
        );
      }
    };
    checkChain().then();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendETH = async () => {
    if (!faucetAddress || !inputAddress) {
      return;
    }

    try {
      setLoading(true);
      await mintEth(inputAddress, sendValue);
      setLoading(false);
      setInputAddress(undefined);
      setSendValue("");
    } catch (error) {
      console.error("⚡️ ~ file: Faucet.tsx:sendETH ~ error", error);
      setLoading(false);
    }
  };

  // Render only on local chain
  if (ConnectedChain?.id !== devnet.id) {
    return null;
  }
  const account = accountsDetails[1];


    return (
      <>
        <main className="flex items-center flex-col flex-grow pt-10">
          <div className="px-5">
            <h1 className="text-center">
              <ul className="list lh-lg list-inside text-1xl">
                <li className="block text-4xl font-bold mb-5">PShare</li>
              </ul>
            </h1> 
            <div className="flex justify-center items-center space-x-2">
              <p className="my-2 font-medium">Connected Address:</p>
              <Address address={connectedAddress.address as AddressType} />
            </div>
          </div>
          <div className="flex-grow bg-base-100 w-full mt-16 px-24 py-6">
            <div className="flex justify-center flex-col sm:flex-row bg-base-300 p-12 py-0 pb-12 drop-shadow-2xl rounded-xl">

              <div className="container mx-auto bg-base-200 px-4 xl:px-8 py-5 gap-12 drop-shadow-2xl max-w-2xl">
                <h5 className="text-3xl font-bold mb-6">{account.title}</h5>
                <ul className="list lh-lg mb-6 ml-4 leading-relaxed lg:leading-[3em]">
                  {account.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-center py-2 md:py-0">
                      <CheckIcon className="size-6 text-primary mr-2"/>
                      <span>{detail}</span>
                  </li>
                  ))}
                </ul>
              </div>
              
              <div className="container mx-auto bg-base-200 px-4 xl:px-8 py-5 drop-shadow-2xl max-w-4xl">
                <h5 className="text-3xl font-bold mb-6">Send Founds</h5>
                <form  className="flex flex-col gap-4">
                  <div className="space-y-3">
                    <div className="flex space-x-4">
                      <div>
                        <span className="text-sm font-bold">From:</span>
                        <Address address={faucetAddress} />
                      </div>
                      <div>
                        <span className="text-sm font-bold pl-3">Available:</span>
                        <Balance address={faucetAddress} />
                      </div>
                    </div>
                    <div className="flex flex-col space-y-3">
                      <AddressInput
                        placeholder="Destination Address"
                        value={inputAddress ?? ""}
                        onChange={(value) => setInputAddress(value as AddressType)}
                      />
                      <EtherInput
                        placeholder="Amount to send"
                        value={sendValue}
                        onChange={(value) => setSendValue(value)}
                      />
                      <button
                        className="h-10 btn btn-primary btn-sm px-2 rounded-full"
                        onClick={sendETH}
                        disabled={loading}
                      >
                        {!loading ? (
                          <BanknotesIcon className="h-6 w-6" />
                        ) : (
                          <span className="loading loading-spinner loading-sm"></span>
                        )}
                        <span>Send</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </>
    )
}


export default CreditorPlatform;
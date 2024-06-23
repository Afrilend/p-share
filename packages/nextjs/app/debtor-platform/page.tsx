"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { Address, Balance, EtherInput } from "~~/components/scaffold-stark";
import { useAccount } from "@starknet-react/core";
import { Address as AddressType } from "@starknet-react/chains";
import { BanknotesIcon, CheckIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useEffect, useMemo, useState } from "react";
import { InputBase } from "~~/components/scaffold-stark";
import { accountsDetails } from "./../data/accountsDetails";
import { uploadFile } from "./../data/uploadFiles";
import Image from "next/image";
//import fs from "node:fs/promises";
import { useRef } from "react";
const DebtorPlatform: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [sendValue, setSendValue] = useState("");
  const connectedAddress = useAccount();
  const account = accountsDetails[0];
  const [inputAddress, setInputAddress] = useState<AddressType>();
  const [faucetAddress] = useState<AddressType>(
    "0x78662e7352d062084b0010068b99288486c2d8b914f6e2a55ce945f8792c8b1"
  );

  const fileInput = useRef<HTMLInputElement>(null);

  async function uploadFile(
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    evt.preventDefault();

    const formData = new FormData();
    formData.append("file", fileInput?.current?.files?.[0]!);

    const response = await fetch("/api/uploadImage", {
      method: "POST",
      body: formData,
    });
    const result = await response.json();
    console.log(result);
  }

  return (
    <>
      <main className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <ul className="list lh-lg list-inside text-1xl">
              <li className="block text-4xl font-bold mb-5">
                Your Debtor Page
              </li>
            </ul>
          </h1>
        </div>
        <div className="flex justify-center items-start space-x-12">
          <div>
            <p className="uppercase text-sm text-gray-500">
              Total borrowed amount
            </p>
            <p className="text-2xl font-mono">$12,000</p>
          </div>
          <div>
            <p className="uppercase text-sm text-gray-500">
              Total refunded amount
            </p>
            <p className="text-2xl font-mono">$5,000</p>
          </div>
          <div>
            <p className="uppercase text-sm text-gray-500">Next payment</p>
            <p className="text-2xl font-mono">$1,000</p>
            <span>on 12/07/2024</span>
          </div>
        </div>
        <div className="flex-grow bg-base-100 w-full mt-16 px-24 p-6">
          <div className="container mx-auto bg-base-200 px-4 xl:px-8 py-5 drop-shadow-2xl max-w-4xl">
            <h5 className="text-3xl font-bold mb-6">Refund now</h5>
            <form className="flex flex-col gap-8">
              <div className="space-y-3">
                <div className="flex space-x-4 py-4">
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
                  {/* <AddressInput
                      placeholder="Destination Address"
                      value={inputAddress ?? ""}
                      onChange={(value) =>
                        setInputAddress(value as AddressType)
                      }
                    /> */}
                  <EtherInput
                    placeholder="Amount to send"
                    value={sendValue}
                    onChange={(value) => setSendValue(value)}
                  />
                  <button
                    className="h-10 btn btn-primary btn-sm px-2 rounded-full"
                    onClick={() => {}}
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
          <div className="flex justify-center flex-col sm:flex-row p-12 pb-12 drop-shadow-2xl rounded-xl">
            <div className="container mx-auto bg-base-200 px-4 xl:px-8 py-5 gap-12 drop-shadow-2xl rounded-xl max-w-2xl">
              <h5 className="text-3xl font-bold mb-6">{account.title}</h5>
              <ul className="list lh-lg mb-6 ml-4 leading-relaxed lg:leading-[3em]">
                {account.details.map((detail, detailIndex) => (
                  <li
                    key={detailIndex}
                    className="flex items-center py-2 md:py-0"
                  >
                    <CheckIcon className="size-6 text-primary mr-2" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="container mx-auto bg-base-200 px-4 xl:px-8 py-5 drop-shadow-2xl rounded-xl max-w-4xl">
              <h5 className="text-3xl font-bold mb-6">Submit a new project</h5>
              <form className="flex flex-col gap-4">
                <div className="space-y-3">
                  <div className="flex flex-col space-y-3 mb-3">
                    <InputBase
                      placeholder="Project name"
                      value={sendValue}
                      onChange={(value) => setSendValue(value)}
                    />
                  </div>

                  <div className="flex flex-col space-y-3 mb-3">
                    <div
                      className={`flex border-2 border-base-300 bg-base-200 rounded-xl text-accent`}
                    >
                      <textarea
                        id="project-details"
                        rows={4}
                        className="input input-ghost focus-within:border-transparent focus:outline-none focus:bg-transparent focus:text-gray-400 h-[8.8rem] min-h-[8.8rem] px-4 border w-full font-medium placeholder:text-accent/50 text-gray-400 rounded-xl"
                        placeholder="Write the project's details..."
                      ></textarea>
                    </div>
                  </div>

                  <label>
                    <p>Upload a PDF file</p>
                    <input type="file" name="file" ref={fileInput} />
                  </label>
                </div>

                <div className="flex flex-col space-y-3">
                  <button
                    className="h-10 btn btn-primary btn-sm px-2 rounded-full"
                    onClick={uploadFile}
                  >
                    {loading && (
                      <span className="loading loading-spinner loading-sm"></span>
                    )}
                    <span>Submit</span>
                  </button>
                </div>
              </form>

              <div className="flex flex-wrap">
                {/* {images.map((image) => (
                    <div key={image} className="px-2 h-auto w-1/2">
                      <Image
                        key={image}
                        src={image}
                        width={400}
                        height={400}
                        alt={image}
                        className="object-cover w-full"
                      />
                    </div>
                  ))} */}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default DebtorPlatform;

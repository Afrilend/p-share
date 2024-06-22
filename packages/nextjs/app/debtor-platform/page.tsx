"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { Address } from "~~/components/scaffold-stark";
import { useAccount } from "@starknet-react/core";
import { Address as AddressType } from "@starknet-react/chains";
import { CheckIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useEffect, useMemo, useState } from "react";
import {
  InputBase
} from "~~/components/scaffold-stark";
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
                <h5 className="text-3xl font-bold mb-6">Submit a project</h5>
                <form  className="flex flex-col gap-4">
                  <div className="space-y-3">
                    <div className="flex flex-col space-y-3 mb-3">
                      <InputBase
                        placeholder="Project name"
                        value={sendValue}
                        onChange={(value) => setSendValue(value)}
                      />
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
                      {loading &&
                        (<span className="loading loading-spinner loading-sm"></span>)
                      }
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
    )
}


export default DebtorPlatform;
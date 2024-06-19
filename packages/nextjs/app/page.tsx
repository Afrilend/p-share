"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { CheckIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-stark";
import { useAccount } from "@starknet-react/core";
import { Address as AddressType } from "@starknet-react/chains";



const Home: NextPage = () => {
  const connectedAddress = useAccount();

  return (
    <>
      <main className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">PShare</span>
          </h1>
          <div className="flex justify-center items-center space-x-2">
            <p className="my-2 font-medium">Connected Address:</p>
            <Address address={connectedAddress.address as AddressType} />
          </div>
          
        </div>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 lg:gap-32 flex-col sm:flex-row">
            <div className="flex flex-col bg-base-100 px-4 lg:px-8 py-5 max-w-lg rounded-xl drop-shadow-2xl">
              <h5 className="text-3xl font-bold mb-6">For debtor</h5>
              <ul className="list lh-lg mb-6 ml-4 leading-relaxed lg:leading-[3em]">
                <li className="flex items-center py-2 md:py-0">
                  <CheckIcon className="size-6 text-green-300 mr-2"/>
                  <span>Creating an Ethereum wallet.</span>
                </li>
                <li className="flex items-center py-2 md:py-0">
                  <CheckIcon className="size-6 text-green-300 mr-2"/>
                  <span>Set up your debtor account</span>
                </li>
                <li className="flex items-center py-2 md:py-0">
                  <CheckIcon className="size-6 text-green-300 mr-2"/>
                  <span>Deposit funds</span>
                </li>
                <li className="flex items-center py-2 md:py-0 leading-normal">
                  <CheckIcon className="size-6 text-green-300 mr-2"/>
                  <span>Participate in one-year investment cycles.</span>
                </li>
                <li className="flex items-center py-2 md:py-0">
                  <CheckIcon className="size-6 text-green-300 mr-2"/>
                  <span>Submit documents for validation</span>
                </li>
                <li className="flex items-center py-2 md:py-0">
                  <CheckIcon className="size-6 text-green-300 mr-2"/>
                  <span>Complete KYC validation.</span>
                </li>
                <li className="flex items-center py-2 md:py-0">
                  <CheckIcon className="size-6 text-green-300 mr-2"/>
                  <span>Join investment campaigns</span>
                </li>
                <li className="flex items-center py-2 md:py-0">
                  <CheckIcon className="size-6 text-green-300 mr-2"/>
                  <span>Track total investments per cycle</span>
                </li>
                <li className="flex items-center py-2 md:py-0">
                  <CheckIcon className="size-6 text-green-300 mr-2"/>
                  <span>Ensure deposits meet required amounts.
                  </span>
                </li>
                <li className="flex items-center py-2 md:py-0">
                  <CheckIcon className="size-6 text-green-300 mr-2"/>
                  <span>Withdraw funds after campaign completion</span>
                </li>
                <li className="flex items-center py-2 md:py-0">
                  <CheckIcon className="size-6 text-green-300 mr-2"/>
                  <span>Receive returns plus interest.</span>
                </li>
              </ul>
              <Link 
                href='' 
                className="bg-emerald-500 shadow-md py-2 px-4 rounded-full text-center text-white font-bold text-xl hover:bg-blue-200 hover:text-cyan-950">
                  Submit a Project
              </Link>
            </div>
            <div className="flex flex-col bg-base-100 px-4 lg:px-8 py-5 max-w-lg rounded-xl drop-shadow-2xl">
              <h5 className="text-3xl font-bold mb-6">For Creditor</h5>
              <ul className="list lh-lg mb-6 ml-4 leading-relaxed lg:leading-[3em]">
                <li className="flex items-center py-2 md:py-0">
                  <CheckIcon className="size-6 text-green-300 mr-2"/>
                  <span>Creating an Ethereum wallet.</span>
                </li>
                <li className="flex items-center py-2 md:py-0">
                  <CheckIcon className="size-6 text-green-300 mr-2"/>
                  <span>Set up your debtor account</span>
                </li>
                <li className="flex items-center py-2 md:py-0">
                  <CheckIcon className="size-6 text-green-300 mr-2"/>
                  <span>Deposit funds</span>
                </li>
                <li className="flex items-center py-2 md:py-0 leading-normal">
                  <CheckIcon className="size-6 text-green-300 mr-2"/>
                  <span>Participate in one-year investment cycles.</span>
                </li>
                <li className="flex items-center py-2 md:py-0">
                  <CheckIcon className="size-6 text-green-300 mr-2"/>
                  <span>Submit documents for validation</span>
                </li>
                <li className="flex items-center py-2 md:py-0">
                  <CheckIcon className="size-6 text-green-300 mr-2"/>
                  <span>Complete KYC validation.</span>
                </li>
                <li className="flex items-center py-2 md:py-0">
                  <CheckIcon className="size-6 text-green-300 mr-2"/>
                  <span>Join investment campaigns</span>
                </li>
                <li className="flex items-center py-2 md:py-0">
                  <CheckIcon className="size-6 text-green-300 mr-2"/>
                  <span>Track total investments per cycle</span>
                </li>
                <li className="flex items-center py-2 md:py-0">
                  <CheckIcon className="size-6 text-green-300 mr-2"/>
                  <span>Ensure deposits meet required amounts.
                  </span>
                </li>
                <li className="flex items-center py-2 md:py-0">
                  <CheckIcon className="size-6 text-green-300 mr-2"/>
                  <span>Withdraw funds after campaign completion</span>
                </li>
                <li className="flex items-center py-2 md:py-0">
                  <CheckIcon className="size-6 text-green-300 mr-2"/>
                  <span>Receive returns plus interest.</span>
                </li>
              </ul>
              <Link 
                href='' 
                className="bg-emerald-500 shadow-md py-2 px-4 rounded-full text-center text-white font-bold text-xl hover:bg-blue-200 hover:text-cyan-950">
                  Invest on  Project
              </Link>
            </div>
          </div>
        </div>

        {/* <div
          onClick={() => {
            writeAsync();
          }}
        >
          TEST TX
        </div> */}
      </main>
    </>
  );
};

export default Home;

const stats = [
  {
    percentage: '1000+',
    description: 'active users',
    borderColor: 'border-teal-600',
    rotation: 'rotate-[324deg]',
  },
  {
    percentage: '50+',
    description: 'Current Cycle target',
    borderColor: 'border-gray-400',
    rotation: 'rotate-[252deg]',
  },
  {
    percentage: '45+',
    description: 'Current cycle invested',
    borderColor: 'border-orange-500',
    rotation: 'rotate-[270deg]',
  },
  {
    percentage: '10+',
    description: 'Total number of founded projects',
    borderColor: 'border-blue-700',
    rotation: 'rotate-[226.8deg]',
  },
];
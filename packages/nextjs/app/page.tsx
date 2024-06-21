"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { CheckIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-stark";
import { useAccount } from "@starknet-react/core";
import { Address as AddressType } from "@starknet-react/chains";
import { accountsDetails } from "./data/accountsDetails";

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
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            {accountsDetails.map((account, index) => (
              <div className="flex flex-col bg-base-100 px-4 lg:px-8 py-5 max-w-lg rounded-xl drop-shadow-2xl" key={index}>
                <h5 className="text-3xl font-bold mb-6">{account.title}</h5>
                <ul className="list lh-lg mb-6 ml-4 leading-relaxed lg:leading-[3em]">
                  {account.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-center py-2 md:py-0">
                      <CheckIcon className="size-6 text-primary mr-2"/>
                      <span>{detail}</span>
                  </li>
                  ))}
                </ul>
                {account.component && (
                  <div className="mt-4">
                    {account.component}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <section className="flex-grow w-full mt-16 px-8 py-12">
          <div className="flex items-center justify-center py-12 md:py-32">
            <div className="flex flex-wrap justify-center space-x-4">
              {stats.map((stat, index) => (
                <div key={index} className="bg-base-100 dark:bg-neutral p-6 rounded-lg shadow-lg flex flex-col items-center w-64 mb-4">
                  <div className="relative w-24 h-24 mb-4">
                    <div className={`absolute top-0 left-0 w-full h-full rounded-full border-4 ${stat.borderColor}`} style={{ clip: 'rect(0px, 120px, 120px, 60px)' }}>
                      <div className={`absolute w-full h-full rounded-full border-4 ${stat.borderColor}`} style={{ clip: 'rect(0px, 60px, 120px, 0px)', transform: stat.rotation }}></div>
                    </div>
                    <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-gray-200 dark:border-gray-600"></div>
                    <div className="flex items-center justify-center w-full h-full absolute top-0 left-0 text-3xl font-bold">{stat.percentage}</div>
                  </div>
                  <p className="text-center text-sm text-light ">{stat.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
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
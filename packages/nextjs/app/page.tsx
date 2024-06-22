"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { CheckIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-stark";
import { useAccount } from "@starknet-react/core";
import { Address as AddressType } from "@starknet-react/chains";
import { accountsDetails } from "./data/accountsDetails";
import { homepageAccountDetails } from "./data/homePageAccountsDetails";

const Home: NextPage = () => {
  const connectedAddress = useAccount();

  return (
    <>
      <main className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <ul className="list lh-lg list-inside text-1xl">
              <li className="block text-4xl font-bold mb-5">Welcome to PShare</li>
              <li className="mb-2">
                <strong>PShare</strong> is a revolutionary Web3 platform,
              </li>
              <li className="mb-2">
                designed to connect debtors seeking funding with creditors looking to invest in promising projects.
              </li>
              <li className="mb-2">
                Here’s how it works
              </li>
            </ul>
          </h1>
          {connectedAddress.address &&  
            <div className="flex justify-center items-center space-x-2">
              <p className="my-2 font-medium">Connected Address:</p>
              <Address address={connectedAddress.address as AddressType} />
            </div>
          }
        </div>

        <div className="flex-grow bg-base-100 w-full mt-16 px-8 py-12">
          <div className="container mx-auto px-4 py-8">
            <div className="rounded-xl drop-shadow-2xl bg-base-300">
              <div className="flex justify-center items-center h-full">
                <div className="flex justify-center items-center gap-12 flex-col sm:flex-row w-full max-w-6xl">
                  {homepageAccountDetails.map((account, index) => (
                    <div className="flex-1 px-4 lg:px-8 py-5 bg-base-200 rounded shadow h-96" key={index}>
                      <h5 className="text-3xl font-bold mb-6">{account.title}</h5>
                      <ul className="list-disc list-inside text-1xl mb-6">
                        {account.details.map((detail, idx) => (
                          <li className="mb-2" key={idx}><strong>{detail.title}</strong>: {detail.content}</li>
                        ))}
                      </ul>
                      <Link
                        href={account.link.url}
                        passHref
                        className="flex btn btn-primary btn-lx font-normal"
                      >
                        <strong>{account.link.text}</strong>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-center h-full">
                <div className="flex flex-col px-4 lg:px-8 py-5 max-w-lx">
                  <h5 className="text-3xl font-bold mb-6 text-center">Why Choose PShare?</h5>
                  <ul className="list-disc list-inside text-1xl mb-6">
                    <li className="mb-2"><strong>Trust and Security</strong>: Built on Stacknet, ensuring secure and transparent transactions.</li>
                    <li className="mb-2"><strong>Wide Range of Opportunities</strong>: Discover a variety of projects from different fields and industries.</li>
                    <li className="mb-2"><strong>Empowerment</strong>: Enable entrepreneurs to realize their dreams and grow your investment portfolio.</li>
                  </ul>
                  <p className="text-lg text-1xl">Join PShare today and be a part of the future of decentralized lending and investing!</p>
                </div>
              </div>
            </div>
          </div>
          
        </div>

        <section className="flex-grow w-full mt-16 px-8 py-12">
          <div className="flex items-center justify-center py-12 md:py-32">
            <div className="flex flex-wrap justify-center space-x-4">
              {stats.map((stat, index) => (
                <div key={index} className="bg-primary p-6 rounded-lg shadow-lg flex flex-col items-center w-64 mb-4">
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
      </main>
    </>
  );
};

export default Home;

const stats = [
  {
    percentage: '1000+',
    description: 'Active users',
    borderColor: 'border-teal-600',
    rotation: 'rotate-[324deg]',
  },
  {
    percentage: '50+',
    description: 'Current Cycle Target',
    borderColor: 'border-gray-400',
    rotation: 'rotate-[252deg]',
  },
  {
    percentage: '45+',
    description: 'Current Cycle Invested',
    borderColor: 'border-orange-500',
    rotation: 'rotate-[270deg]',
  },
  {
    percentage: '10+',
    description: 'Total Number of Founded Projects',
    borderColor: 'border-blue-700',
    rotation: 'rotate-[226.8deg]',
  },
];
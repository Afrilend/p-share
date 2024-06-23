"use client";

// @refresh reset
import { Balance } from "../Balance";
import { AddressInfoDropdown } from "./AddressInfoDropdown";
import { AddressQRCodeModal } from "./AddressQRCodeModal";
import { WrongNetworkDropdown } from "./WrongNetworkDropdown";
import { useAutoConnect, useNetworkColor } from "~~/hooks/scaffold-stark";
import { useTargetNetwork } from "~~/hooks/scaffold-stark/useTargetNetwork";
import { getBlockExplorerAddressLink } from "~~/utils/scaffold-stark";
import { useAccount, useNetwork } from "@starknet-react/core";
import { Address } from "@starknet-react/chains";
import { useState } from "react";
import ConnectModal from "./ConnectModal";
import { DynamicContextProvider, DynamicWidget } from '@dynamic-labs/sdk-react-core';
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { ZeroDevSmartWalletConnectors } from '@dynamic-labs/ethereum-aa';
import { useTheme } from "next-themes";

export const CustomConnectButton = () => {
  const { resolvedTheme } = useTheme();
    return (
      <DynamicContextProvider
        theme={resolvedTheme}
        settings={{
          environmentId: '2a597db7-28c5-4d84-a6cf-ec6bb3e8d330',
          walletConnectors: [ EthereumWalletConnectors, ZeroDevSmartWalletConnectors ],
      }}>
        <DynamicWidget />
      </DynamicContextProvider>
  );
};

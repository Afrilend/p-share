import React from "react";
import { SubmitProject } from "~~/components/SubmitProject";

interface AccountDetails {
  title: string;
  details: string[];
  component?: React.ReactNode;
}

type AccountsDetails = AccountDetails[];

export const accountsDetails: AccountsDetails = [
  {
    title: "For debtor",
    details: [
      "Creating an Ethereum wallet.",
      "Set up your debtor account",
      "Deposit funds",
      "Participate in one-year investment cycles.",
      "Submit documents for validation",
      "Complete KYC validation.",
      "Join investment campaigns",
      "Track total investments per cycle",
      "Ensure deposits meet required amounts.",
      "Withdraw funds after campaign completion",
      "Receive returns plus interest.",
    ],
    component: <SubmitProject />,
  },

  {
    title: "For Creditor",
    details: [
      "Creating an Ethereum wallet.",
      "Set up your debtor account",
      "Deposit funds",
      "Participate in one-year investment cycles.",
      "Submit documents for validation",
      "Complete KYC validation.",
      "Join investment campaigns",
      "Track total investments per cycle",
      "Ensure deposits meet required amounts.",
      "Withdraw funds after campaign completion",
      "Receive returns plus interest.",
    ],
    component: <SubmitProject />,
  },
];

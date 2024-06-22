interface ProjectDetails {
  title: string;
  content: string;
}

interface ButtonLink {
  url: string;
  text: string;
}

interface AccountDetails {
  title: string;
  details: ProjectDetails[];
  link: ButtonLink;
}

type AccountsDetails = AccountDetails[];

export const homepageAccountDetails: AccountsDetails = [
  {
    title: "For Debtors",
    details: [
     {
      title: "Submit Your Project",
      content: "Share your innovative idea or project on PShare."
     },
     {
      title: "Validation Phase",
      content: "Our team will thoroughly review your submission to ensure it meets all necessary criteria."
     },
     {
      title: "Receive Funding",
      content: "Once your project passes validation, it will be open for investment. Creditor investments will be transferred directly to you."
     }
    ],
    link: {
      url: "/debtor-platform",
      text: "Submit a Project"
    }
  },

  {
    title: "For Creditors",
    details: [
     {
      title: "Explore Projects",
      content: "Browse through a variety of vetted projects submitted by debtors."
     },
     {
      title: "Choose and Invest",
      content: "Select the projects you believe in and invest your funds."
     },
     {
      title: "Support Innovation",
      content: "By investing, you help bring innovative projects to life while potentially earning returns."
     }
    ],
    link: {
      url: "/creditor-platform",
      text: "Invest in Projects"
    }
  },
];

import React from "react";
import AddPlugin from "./pages/AddPlugin";
import APIURL from "./pages/APIURL";
import ConfiguringForm from "./pages/ConfiguringForm";
import CreateForm from "./pages/CreateForm";
import CreateProject from "./pages/CreateProject";
import CreateTemplate from "./pages/CreateTemplate";
import CreateWebhook from "./pages/CreateWebhook";
import ExportDataset from "./pages/ExportDatset";

import Introduction from "./pages/Introduction";
import SendEmails from "./pages/SendEmails";

type LinkType = {
  name: string;
  component: React.FC;
  type: "Header" | "Page";
  headerID?: number;
  parentID?: number;
}

export const Links: LinkType[] = [
  {
    name: 'Introduction',
    component: () => <Introduction />,
    type: 'Header',
  },
  {
    name: 'Form Setup',
    component: () => <Introduction />,
    type: 'Header',
    headerID: 1,
  },
  {
    name: 'Creating a Project',
    component: () => <CreateProject />,
    type: 'Page',
    parentID: 1,
  },
  {
    name: 'Creating a Form',
    component: () => <CreateForm />,
    type: 'Page',
    parentID: 1,
  },
  {
    name: 'Configuring a Form',
    component: () => <ConfiguringForm />,
    type: 'Page',
    parentID: 1,
  },
  {
    name: 'Creating a Webhook',
    component: () => <CreateWebhook />,
    type: 'Page',
    parentID: 1,
  },
  {
    name: 'Adding Plugin',
    component: () => <AddPlugin />,
    type: 'Page',
    parentID: 1,
  },
  {
    name: 'Creating a Template',
    component: () => <CreateTemplate />,
    type: 'Page',
    parentID: 1,
  },
  {
    name: 'Sending Emails',
    component: () => <SendEmails />,
    type: 'Page',
    parentID: 1,
  },
  {
    name: 'Exporting Dataset',
    component: () => <ExportDataset />,
    type: 'Page',
    parentID: 1,
  },
  {
    name: 'API Setup',
    component: () => <Introduction />,
    type: 'Header',
    headerID: 2,
  },
  {
    name: 'API URL & Access Token',
    component: () => <APIURL />,
    type: 'Page',
    parentID: 1,
  },
];


// <div>
//           <Text align="left" size="xl">
//             Introduction
//           </Text>
//           <Text align="left" size="xl">
//             Form Setup
//           </Text>
//           <div>
//             <Text ml={20} my={5} align="left">
//               Creating a Project
//             </Text>
//             <Text ml={20} my={5} align="left">
//               Creating a Form
//             </Text>
//             <Text ml={20} my={5} align="left">
//               Configuring a Form
//             </Text>
//             <Text ml={20} my={5} align="left">
//               Test Mode
//             </Text>
//             <Text ml={20} my={5} align="left">
//               Adding a Plugin
//             </Text>
//             <Text ml={20} my={5} align="left">
//               Restricting Domains
//             </Text>
//             <Text ml={20} my={5} align="left">
//               Creating a Webhook
//             </Text>
//             <Text ml={20} my={5} align="left">
//               Creating a Template
//             </Text>
//             <Text ml={20} my={5} align="left">
//               Submission Redirection
//             </Text>
//             <Text ml={20} my={5} align="left">
//               Sending Emails
//             </Text>
//             <Text ml={20} my={5} align="left">
//               Exporting Dataset
//             </Text>
//             <Text ml={20} my={5} align="left">
//               Exporting Email List
//             </Text>
//           </div>
//           <Text align="left" size="xl">
//             API Setup
//           </Text>
//           <div>
//             <Text ml={20} my={5} align="left">
//               API URL & KEY
//             </Text>
//             <Text ml={20} my={5} align="left">
//               Reading Data
//             </Text>
//             <Text ml={20} my={5} align="left">
//               Inserting Data
//             </Text>
//           </div>
//           <Text align="left" size="xl">
//             Code Example
//           </Text>
//           <div>
//             <Text ml={20} my={5} align="left">
//               React Setup
//             </Text>
//             <Text ml={20} my={5} align="left">
//               AJAX Setup
//             </Text>
//             <Text ml={20} my={5} align="left">
//               Axios Setup
//             </Text>
//           </div>
//           <Text align="left" size="xl">
//             Upcoming
//           </Text>
//           <div>
//             <Text ml={20} my={5} align="left">
//               Recaptcha Verification
//             </Text>
//             <Text ml={20} my={5} align="left">
//               Field Based Data Export
//             </Text>
//           </div>
//         </div>
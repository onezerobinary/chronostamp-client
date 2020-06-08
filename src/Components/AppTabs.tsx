import React from 'react';
import { Tab, Tabs } from 'react-tabs';

const AppTabs: React.FC = () => {
  return (
    <Tabs>
      <Tab label="Assets"></Tab>
      <Tab label="Wallet"></Tab>
      <Tab label="Search"></Tab>
    </Tabs>
  );
};

import { TabsType } from '../Components/AppTabs';

export type Profile = {
  chronoStampID: string;
  email: string;
  account: string;
  balance: number;
  fullName?: string;
  picture?: string;
  sub?: string;
  tab: TabsType;
};

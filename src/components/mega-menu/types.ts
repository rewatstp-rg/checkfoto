import { StackProps } from '@mui/material/Stack';
import { Theme, SxProps } from '@mui/material/styles';
import { ListItemButtonProps } from '@mui/material/ListItemButton';

import { BaseDataResponse } from 'src/api/base/types';

// ----------------------------------------------------------------------

export type SlotProps = {
  rootItem?: SxProps<Theme>;
  subItem?: SxProps<Theme>;
  subHeader?: SxProps<Theme>;
  displayProduct?: number;
};

export type NavProducts = {
  name: string;
  path: string;
  coverUrl: string;
};

export type NavLink = {
  title: string;
  path: string;
};

export type NavItemStateProps = {
  open?: boolean;
  active?: boolean;
  hasChild?: boolean;
  externalLink?: boolean;
};

export type NavItemBaseProps = {
  title: string;
  path: string;
  icon?: React.ReactElement;
  tags?: NavLink[];
  moreLink?: NavLink;
  products?: NavProducts[];
  children?: {
    subHeader: string;
    items: {
      title: string;
      path: string;
    }[];
  }[];
};

export type NavItemProps = ListItemButtonProps & NavItemBaseProps & NavItemStateProps;

export type NavListProps = {
  data: NavItemBaseProps;
  slotProps?: SlotProps;
};

export type NavSubListProps = StackProps & {
  data: {
    subHeader: string;
    items: {
      title: string;
      path: string;
    }[];
  }[];
  slotProps?: SlotProps;
  title?: string;
  onCloseMenu?: VoidFunction;
};

export type NavProps = StackProps & {
  data: NavItemBaseProps[];
  slotProps?: SlotProps;
};

export type MenuProps = {
  subHeader: string;
  items: NavItemBaseProps[];
}[];

export type MenuPropsList = {
	data: MenuProps[]
} & BaseDataResponse;


import { useState, useEffect, useCallback } from 'react';

import Collapse from '@mui/material/Collapse';

import { ROOT_ADMIN, ROOT_CUSTOMER } from 'src/routes/paths';
import { usePathname, useActiveLink } from 'src/routes/hooks';

import { ENV_NAME_ADMIN } from 'src/utils/constants';

import NavItem from './nav-item';
import { NavListProps, NavSubListProps } from '../types';

// ----------------------------------------------------------------------

const ENV = import.meta.env.VITE_HOST_NAME;

export default function NavList({ data, depth, slotProps }: NavListProps) {
  const pathname = usePathname();

  const routerPath = ENV === ENV_NAME_ADMIN ? ROOT_ADMIN : ROOT_CUSTOMER;

  const active = useActiveLink(`${routerPath}${data.path}`, !!data.children);

  const [openMenu, setOpenMenu] = useState(active);

  useEffect(() => {
    if (!active) {
      handleCloseMenu();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleToggleMenu = useCallback(() => {
    if (data.children) {
      setOpenMenu((prev) => !prev);
    }
  }, [data.children]);

  const handleCloseMenu = useCallback(() => {
    setOpenMenu(false);
  }, []);

  return (
    <>
      <NavItem
        open={openMenu}
        onClick={handleToggleMenu}
        //
        title={data.title}
        path={data.path}
        caption={data.caption}
        icon={data.icon}
        //
        depth={depth}
        hasChild={!!data.children}
        externalLink={!!data.path.includes('http')}
        //
        active={active}
        className={active ? 'active' : ''}
        sx={depth === 1 ? slotProps?.rootItem : slotProps?.subItem}
      />

      {!!data.children && (
        <Collapse in={openMenu} unmountOnExit>
          <NavSubList data={data.children} depth={depth} slotProps={slotProps} />
        </Collapse>
      )}
    </>
  );
}

// ----------------------------------------------------------------------

function NavSubList({ data, depth, slotProps }: NavSubListProps) {
  return (
    <>
      {data.map((list) => (
        <NavList key={list.title} data={list} depth={depth + 1} slotProps={slotProps} />
      ))}
    </>
  );
}

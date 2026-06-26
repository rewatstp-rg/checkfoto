import { useState, useCallback } from 'react';

import { useActiveLink } from 'src/routes/hooks/use-active-link';

import { NavItem } from './nav-item';
import { NavListProps } from '../types';

// ----------------------------------------------------------------------

export default function NavList({ data }: NavListProps) {
  const active = useActiveLink(data.path, !!data.children);

  const [openMenu, setOpenMenu] = useState(false);

  const handleToggleMenu = useCallback(() => {
    if (data.children) {
      setOpenMenu((prev) => !prev);
    }
  }, [data.children]);

  return (
    <NavItem
      open={openMenu}
      onClick={handleToggleMenu}
      //
      title={data.title}
      path={data.path}
      icon={data.icon}
      //
      hasChild={!!data.children}
      externalLink={data.path.includes('http')}
      //
      active={active}
    />
  );
}

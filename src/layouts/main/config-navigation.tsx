import Iconify from "src/components/iconify";

export function useNavData() {

  const menuRace = [
    {
      title: 'หน้าแรก',
      titleEn: 'Home',
      path: '/',
      icon: <Iconify icon="solar:home-2-bold-duotone" sx={{ width: '20px !important' }} />
    },
    {
      title: 'ประวัติการสั่งซื้อ',
      titleEn: 'Order History',
      path: '/order',
      icon: <Iconify icon="solar:history-bold-duotone" sx={{ width: '20px !important' }} />
    }
  ];

  return menuRace;
};

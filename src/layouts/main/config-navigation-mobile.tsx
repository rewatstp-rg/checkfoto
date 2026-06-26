import Iconify from "src/components/iconify";

export const HOST_API = import.meta.env.VITE_HOST_URL_FOR_RUN;

export function useNavDataMobile() {

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

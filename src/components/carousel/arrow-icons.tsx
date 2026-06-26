import Iconify, { IconifyProps } from '../iconify';

// ----------------------------------------------------------------------

type Props = {
  icon?: IconifyProps; // Right icon
  isRTL?: boolean;
};

export function LeftIcon({ icon = 'eva:arrow-ios-forward-fill', isRTL }: Props) {
  return (
    <Iconify
      tabIndex={-1}
      aria-hidden="true"
      icon={icon}
      sx={{
        transform: ' scaleX(-1)',
        ...(isRTL && {
          transform: ' scaleX(1)',
        }),
      }}
    />
  );
}

export function RightIcon({ icon = 'eva:arrow-ios-forward-fill', isRTL }: Props) {
  return (
    <Iconify
      tabIndex={-1}
      aria-hidden="true"
      icon={icon}
      sx={{
        ...(isRTL && {
          transform: ' scaleX(-1)',
        }),
      }}
    />
  );
}

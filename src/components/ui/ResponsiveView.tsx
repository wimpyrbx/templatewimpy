import { useMediaQuery } from '@mantine/hooks';
import { ReactNode } from 'react';

interface ResponsiveViewProps {
  /** Content to show on mobile screens */
  mobile: ReactNode;
  /** Content to show on desktop screens */
  desktop: ReactNode;
  /** Breakpoint width (e.g. '768px' or 'sm') */
  breakpoint?: string;
}

/**
 * A utility component that renders different content based on screen size.
 * Uses Mantine's useMediaQuery hook to determine the current viewport size.
 * 
 * @example
 * ```tsx
 * <ResponsiveView
 *   mobile={<MobileLayout />}
 *   desktop={<DesktopLayout />}
 *   breakpoint="768px"
 * />
 * ```
 */
export function ResponsiveView({ 
  mobile, 
  desktop, 
  breakpoint = 'sm' 
}: ResponsiveViewProps) {
  const isMobile = useMediaQuery(`(max-width: ${breakpoint})`);
  return isMobile ? mobile : desktop;
} 
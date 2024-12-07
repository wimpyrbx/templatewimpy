// src/hooks/useTheme.tsx
import { createContext, useContext, useState, ReactNode, FC } from 'react';
import { ThemeSettings } from './types';

const defaultThemeSettings: ThemeSettings = {
  primaryColor: '#228be6',
  primaryShade: 6,
  secondaryColor: '#7950f2',
  secondaryShade: 6,
  accentColor: '#12b886',
  backgroundColor: '#1A1B1E',
  headerBg: '#141517',
  sidebarBg: '#141517',
  paperBg: '#25262B',
  boxBg: '#25262B',
  cardBg: '#25262B',
  inputBg: '#25262B',
  inputHoverBg: '#2C2E33',
  inputFocusBg: '#25262B',
  inputDisabledBg: '#1A1B1E',
  inputBorderColor: '#373A40',
  inputPlaceholderColor: '#5C5F66',
  buttonVariants: {
    filled: {
      background: '#228be6',
      hoverBackground: '#1c7ed6',
      activeBackground: '#1971c2',
      textColor: '#ffffff'
    },
    light: {
      background: '#228be622',
      hoverBackground: '#228be633',
      activeBackground: '#228be644',
      textColor: '#228be6'
    },
    outline: {
      borderColor: '#228be6',
      hoverBackground: '#228be615',
      activeBackground: '#228be622',
      textColor: '#228be6'
    },
    subtle: {
      hoverBackground: '#228be615',
      activeBackground: '#228be622',
      textColor: '#228be6'
    }
  },
  textColor: '#C1C2C5',
  dimmedTextColor: '#909296',
  textSelectionColor: '#228be640',
  linkColor: '#228be6',
  linkHoverColor: '#339af0',
  hoverColor: '#2C2E33',
  activeColor: '#373A40',
  focusRingColor: '#228be6',
  disabledColor: '#5C5F66',
  disabledBackgroundColor: '#25262B',
  borderColor: '#373A40',
  dividerColor: '#2C2E33',
  tableStyles: {
    headerBg: '#2C2E33',
    headerColor: '#C1C2C5',
    rowHoverBg: '#2C2E33',
    stripedBg: '#25262B',
    borderColor: '#373A40',
    textColor: '#C1C2C5'
  },
  modalStyles: {
    overlayColor: 'rgba(0, 0, 0, 0.85)',
    overlayOpacity: 0.85,
    backgroundColor: '#1A1B1E',
    borderRadius: 'md',
    shadow: 'xl'
  },
  radius: 'md',
  spacing: 16,
  gridGap: 16,
  fontSize: 14,
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
  lineHeight: 1.5,
  inputVariant: 'default',
  buttonVariant: 'filled',
  cardStyles: {
    default: {
      scale: 1,
      shadow: 'md'
    },
    hover: {
      scale: 1.02,
      shadow: 'lg'
    },
    active: {
      scale: 0.98,
      shadow: 'sm'
    },
    disabled: {
      opacity: 0.6
    }
  },
  buttonStyles: {
    default: {
      scale: 1,
      shadow: 'md'
    },
    hover: {
      scale: 1.02,
      shadow: 'lg'
    },
    active: {
      scale: 0.98,
      shadow: 'sm'
    },
    disabled: {
      opacity: 0.6
    }
  },
  inputStyles: {
    default: {
      scale: 1,
      shadow: 'md'
    },
    hover: {
      scale: 1.01,
      shadow: 'sm'
    },
    active: {
      scale: 1.02,
      shadow: 'md'
    },
    disabled: {
      opacity: 0.6
    }
  },
  colorScheme: 'dark',
  defaultShadow: 'md'
};

interface ThemeContextProps {
  themeSettings: ThemeSettings;
  updateTheme: (newSettings: Partial<ThemeSettings>) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [themeSettings, setThemeSettings] = useState<ThemeSettings>(defaultThemeSettings);

  const updateTheme = (newSettings: Partial<ThemeSettings>) => {
    setThemeSettings(prev => ({
      ...prev,
      ...newSettings
    }));
  };

  return (
    <ThemeContext.Provider value={{ themeSettings, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
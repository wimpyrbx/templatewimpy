export interface ThemeSettings {
  primaryColor: string;
  primaryShade: number;
  secondaryColor: string;
  secondaryShade: number;
  accentColor: string;
  backgroundColor: string;
  headerBg: string;
  sidebarBg: string;
  paperBg: string;
  boxBg: string;
  cardBg: string;
  inputBg: string;
  inputHoverBg: string;
  inputFocusBg: string;
  inputDisabledBg: string;
  inputBorderColor: string;
  inputPlaceholderColor: string;
  buttonVariants: {
    filled: {
      background: string;
      hoverBackground: string;
      activeBackground: string;
      textColor: string;
    };
    light: {
      background: string;
      hoverBackground: string;
      activeBackground: string;
      textColor: string;
    };
    outline: {
      borderColor: string;
      hoverBackground: string;
      activeBackground: string;
      textColor: string;
    };
    subtle: {
      hoverBackground: string;
      activeBackground: string;
      textColor: string;
    };
  };
  textColor: string;
  dimmedTextColor: string;
  textSelectionColor: string;
  linkColor: string;
  linkHoverColor: string;
  hoverColor: string;
  activeColor: string;
  focusRingColor: string;
  disabledColor: string;
  disabledBackgroundColor: string;
  borderColor: string;
  dividerColor: string;
  tableStyles: {
    headerBg: string;
    headerColor: string;
    rowHoverBg: string;
    stripedBg: string;
    borderColor: string;
    textColor: string;
  };
  modalStyles: {
    overlayColor: string;
    overlayOpacity: number;
    backgroundColor: string;
    borderRadius: string;
    shadow: string;
  };
  radius: string;
  spacing: number;
  gridGap: number;
  fontSize: number;
  fontFamily: string;
  lineHeight: number;
  inputVariant: 'default' | 'filled' | 'unstyled';
  buttonVariant: 'filled' | 'light' | 'outline' | 'subtle';
  cardStyles: {
    default: {
      scale: number;
      shadow: string;
    };
    hover: {
      scale: number;
      shadow: string;
    };
    active: {
      scale: number;
      shadow: string;
    };
    disabled: {
      opacity: number;
    };
  };
  buttonStyles: {
    default: {
      scale: number;
      shadow: string;
    };
    hover: {
      scale: number;
      shadow: string;
    };
    active: {
      scale: number;
      shadow: string;
    };
    disabled: {
      opacity: number;
    };
  };
  inputStyles: {
    default: {
      scale: number;
      shadow: string;
    };
    hover: {
      scale: number;
      shadow: string;
    };
    active: {
      scale: number;
      shadow: string;
    };
    disabled: {
      opacity: number;
    };
  };
  colorScheme: 'light' | 'dark';
  defaultShadow: string;
} 
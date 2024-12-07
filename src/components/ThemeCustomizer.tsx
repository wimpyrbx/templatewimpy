// src/components/ThemeCustomizer.tsx
import { 
  ActionIcon, 
  Modal, 
  Title, 
  Stack, 
  Box, 
  Group, 
  Button,
  Text,
  Card,
  TextInput,
  Paper,
  Table,
  Badge,
  Tooltip,
  Alert,
  Tabs,
  Grid,
  ColorSwatch,
  Progress,
  Loader,
  PasswordInput,
  Select,
  Checkbox,
  Switch,
  Divider,
  ScrollArea
} from '@mantine/core';
import { IconPalette, IconAlertCircle, IconCheck, IconX } from '@tabler/icons-react';
import { useState } from 'react';
import { useTheme } from '../hooks/useTheme.tsx';
import { defaultThemeSettings } from '../hooks/defaultTheme';

const LAYOUT_PROFILES = [
  {
    label: 'Modern',
    description: 'Clean and minimal with smooth edges and ample spacing',
    settings: {
      radius: 8,
      buttonVariant: 'filled',
      inputVariant: 'filled',
      fontSize: 16,
      spacing: 16,
      lineHeight: 1.5,
    }
  },
  {
    label: 'Corporate',
    description: 'Professional look with square corners and subtle elements',
    settings: {
      radius: 4,
      buttonVariant: 'outline',
      inputVariant: 'default',
      fontSize: 14,
      spacing: 12,
      lineHeight: 1.4,
    }
  },
  {
    label: 'Playful',
    description: 'Bold and engaging with large elements and strong presence',
    settings: {
      radius: 16,
      buttonVariant: 'light',
      inputVariant: 'filled',
      fontSize: 18,
      spacing: 20,
      lineHeight: 1.6,
    }
  },
  {
    label: 'Compact',
    description: 'Space-efficient design with tight spacing and small elements',
    settings: {
      radius: 4,
      buttonVariant: 'subtle',
      inputVariant: 'default',
      fontSize: 13,
      spacing: 8,
      lineHeight: 1.3,
    }
  }
] as const;

const COLOR_THEMES = [
  {
    label: "Ocean Dark",
    description: "Deep blues and teals inspired by the ocean depths",
    colors: {
      primary: "#0ea5e9",
      secondary: "#0d9488",
      accent: "#0284c7",
      
      background: "#0f172a",
      sidebarBg: "#1a2640",
      headerBg: "#162236",
      paperBg: "#131c2e",
      boxBg: "#172033",
      cardBg: "#1e293b",
      
      inputBg: "#1e293b",
      inputHoverBg: "#234567",
      inputFocusBg: "#1e293b",
      inputDisabledBg: "#1a2233",
      inputBorderColor: "#334155",
      inputPlaceholderColor: "#64748b",
      
      buttonVariants: {
        filled: {
          background: "#0ea5e9",
          hoverBackground: "#0284c7",
          activeBackground: "#0369a1",
          textColor: "#ffffff"
        },
        light: {
          background: "#0ea5e922",
          hoverBackground: "#0ea5e933",
          activeBackground: "#0ea5e944",
          textColor: "#0ea5e9"
        },
        outline: {
          borderColor: "#0ea5e9",
          hoverBackground: "#0ea5e915",
          activeBackground: "#0ea5e922",
          textColor: "#0ea5e9"
        },
        subtle: {
          hoverBackground: "#0ea5e915",
          activeBackground: "#0ea5e922",
          textColor: "#0ea5e9"
        }
      },
      
      hover: "#1e3a5f",
      active: "#234571",
      disabled: "#64748b",
      disabledBg: "#1a2233",
      focusRing: "#38bdf8",
      
      text: "#f8fafc",
      dimmed: "#94a3b8",
      link: "#38bdf8",
      linkHover: "#7dd3fc",
      
      border: "#1e293b",
      divider: "#334155"
    }
  },
  {
    label: "Forest Dark",
    description: "Rich greens and earth tones from nature",
    colors: {
      primary: "#22c55e",
      secondary: "#84cc16",
      accent: "#15803d",
      
      background: "#1a2e1a",
      sidebarBg: "#2a402a",
      headerBg: "#243524",
      paperBg: "#162816",
      boxBg: "#1d2d1d",
      cardBg: "#243524",
      
      hover: "#2a4a2a",
      active: "#315931",
      disabled: "#6b7280",
      focusRing: "#4ade80",
      
      text: "#f8fafc",
      dimmed: "#9ca3af",
      link: "#4ade80",
      linkHover: "#86efac",
      
      border: "#2a3a2a",
      divider: "#374937"
    }
  },
  {
    label: "Royal Dark",
    description: "Elegant purples and golds for a regal look",
    colors: {
      primary: "#7c3aed",
      secondary: "#c084fc",
      accent: "#6d28d9",
      
      background: "#27142d",
      sidebarBg: "#382438",
      headerBg: "#2d1a33",
      paperBg: "#231428",
      boxBg: "#2a1930",
      cardBg: "#332037",
      
      hover: "#3d1f47",
      active: "#4a2656",
      disabled: "#6b7280",
      focusRing: "#a855f7",
      
      text: "#f8fafc",
      dimmed: "#9ca3af",
      link: "#a855f7",
      linkHover: "#c084fc",
      
      border: "#332037",
      divider: "#4a2656"
    }
  },
  {
    label: "Space Dark",
    description: "Deep space-inspired dark theme with subtle accents",
    colors: {
      primary: "#6366f1",
      secondary: "#818cf8",
      accent: "#4f46e5",
      
      background: "#0c0a1d",
      sidebarBg: "#17142f",
      headerBg: "#110e24",
      paperBg: "#0e0c22",
      boxBg: "#13112a",
      cardBg: "#1a1831",
      
      hover: "#1c1938",
      active: "#242047",
      disabled: "#6b7280",
      focusRing: "#818cf8",
      
      text: "#f8fafc",
      dimmed: "#9ca3af",
      link: "#818cf8",
      linkHover: "#a5b4fc",
      
      border: "#1a1831",
      divider: "#242047"
    }
  },
  {
    label: "Crimson Dark",
    description: "Bold reds and deep grays for a striking appearance",
    colors: {
      primary: "#dc2626",
      secondary: "#f87171",
      accent: "#b91c1c",
      
      background: "#1c1111",
      sidebarBg: "#2c1c1c",
      headerBg: "#241515",
      paperBg: "#1a1010",
      boxBg: "#211414",
      cardBg: "#2a1919",
      
      hover: "#321c1c",
      active: "#3d2222",
      disabled: "#6b7280",
      focusRing: "#f87171",
      
      text: "#f8fafc",
      dimmed: "#9ca3af",
      link: "#f87171",
      linkHover: "#fca5a5",
      
      border: "#2a1919",
      divider: "#3d2222"
    }
  }
] as const;

function ColorGuide({ colors }: { colors: typeof COLOR_THEMES[0]['colors'] }) {
  const colorGroups = [
    {
      title: "Page Structure",
      colors: [
        { name: "Background", color: colors.background, desc: "Main page background" },
        { name: "Header", color: colors.headerBg, desc: "Top navigation bar" },
        { name: "Sidebar", color: colors.sidebarBg, desc: "Side navigation" },
        { name: "Paper", color: colors.paperBg, desc: "Paper component background" },
        { name: "Box", color: colors.boxBg, desc: "Box component background" },
        { name: "Card", color: colors.cardBg, desc: "Card component background" },
      ]
    },
    {
      title: "Brand Colors",
      colors: [
        { name: "Primary", color: colors.primary, desc: "Main brand color, buttons, links" },
        { name: "Secondary", color: colors.secondary, desc: "Secondary actions, badges" },
        { name: "Accent", color: colors.accent, desc: "Highlights, special elements" },
      ]
    },
    {
      title: "Text Colors",
      colors: [
        { name: "Text", color: colors.text, desc: "Primary text color" },
        { name: "Dimmed", color: colors.dimmed, desc: "Secondary text, captions" },
        { name: "Link", color: colors.link, desc: "Link text color" },
        { name: "Link Hover", color: colors.linkHover, desc: "Link hover state" },
      ]
    },
    {
      title: "Interactive States",
      colors: [
        { name: "Hover", color: colors.hover, desc: "Element hover background" },
        { name: "Active", color: colors.active, desc: "Pressed/active state" },
        { name: "Focus Ring", color: colors.focusRing, desc: "Focus state outline" },
        { name: "Disabled", color: colors.disabled, desc: "Disabled state" },
      ]
    },
    {
      title: "Structure & Borders",
      colors: [
        { name: "Border", color: colors.border, desc: "Default border color" },
        { name: "Divider", color: colors.divider, desc: "Separator lines" },
      ]
    },
  ];

  return (
    <Paper withBorder p="md" style={{ backgroundColor: colors.paperBg }}>
      <Title order={3} mb="md">Theme Color Guide</Title>
      <ScrollArea h={400}>
        <Stack spacing="lg">
          {colorGroups.map((group) => (
            <Box key={group.title}>
              <Text weight={500} size="sm" mb="xs">{group.title}</Text>
              <Stack spacing="xs">
                {group.colors.map((item) => (
                  <Group key={item.name} position="apart" spacing="md">
                    <Group spacing="sm">
                      <ColorSwatch color={item.color} size={24} />
                      <Box>
                        <Text size="sm" weight={500}>{item.name}</Text>
                        <Text size="xs" color="dimmed">{item.desc}</Text>
                      </Box>
                    </Group>
                    <Text size="xs" ff="monospace">{item.color}</Text>
                  </Group>
                ))}
              </Stack>
            </Box>
          ))}
        </Stack>
      </ScrollArea>
    </Paper>
  );
}

interface ThemePreviewProps {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    headerBg: string;
    sidebarBg: string;
    paperBg: string;
    boxBg: string;
    cardBg: string;
    text: string;
    dimmed: string;
    border: string;
    divider: string;
  };
}

function ThemePreview({ colors }: ThemePreviewProps) {
  const { themeSettings } = useTheme();
  const buttonVariants = ['filled', 'light', 'outline', 'subtle'] as const;
  const inputVariants = ['default', 'filled', 'unstyled'] as const;

  // Use default theme settings if theme context is not ready
  const currentTheme = themeSettings || defaultThemeSettings;

  return (
    <Paper withBorder p="md" style={{ backgroundColor: colors.paperBg }}>
      <Title order={3} mb="lg" c={colors.text}>Theme Preview</Title>
      <Stack spacing="xl">
        {/* Form Elements */}
        <Box>
          <Text weight={500} size="sm" mb="md" c={colors.text}>Form Elements</Text>
          <Stack spacing="md">
            {inputVariants.map(variant => (
              <Box key={variant}>
                <Text size="xs" mb="xs" tt="capitalize" c={colors.dimmed}>{variant} Variant</Text>
                <Group grow>
                  <TextInput
                    placeholder="Regular input"
                    variant={variant}
                    styles={{
                      input: {
                        backgroundColor: colors.boxBg,
                        borderColor: colors.border,
                        color: colors.text,
                        '&::placeholder': {
                          color: colors.dimmed
                        }
                      }
                    }}
                  />
                  <TextInput
                    placeholder="Disabled input"
                    variant={variant}
                    disabled
                    styles={{
                      input: {
                        backgroundColor: colors.boxBg,
                        borderColor: colors.border,
                        color: colors.dimmed
                      }
                    }}
                  />
                </Group>
              </Box>
            ))}
          </Stack>
        </Box>

        {/* Buttons */}
        <Box>
          <Text weight={500} size="sm" mb="md" c={colors.text}>Button Variants</Text>
          <Stack spacing="md">
            {buttonVariants.map(variant => (
              <Box key={variant}>
                <Text size="xs" mb="xs" tt="capitalize" c={colors.dimmed}>{variant} Variant</Text>
                <Group>
                  <Button
                    variant={variant}
                    styles={{
                      root: {
                        backgroundColor: variant === 'filled' ? colors.primary : 'transparent',
                        borderColor: variant === 'outline' ? colors.primary : undefined,
                        color: variant === 'filled' ? '#fff' : colors.primary
                      }
                    }}
                  >
                    Regular Button
                  </Button>
                  <Button
                    variant={variant}
                    disabled
                    styles={{
                      root: {
                        backgroundColor: colors.boxBg,
                        borderColor: colors.border,
                        color: colors.dimmed
                      }
                    }}
                  >
                    Disabled Button
                  </Button>
                </Group>
              </Box>
            ))}
          </Stack>
        </Box>

        {/* Cards and Containers */}
        <Box>
          <Text weight={500} size="sm" mb="md" c={colors.text}>Cards and Containers</Text>
          <Grid>
            <Grid.Col span={4}>
              <Card 
                shadow="sm"
                style={{ backgroundColor: colors.cardBg }}
              >
                <Text c={colors.text}>Card Content</Text>
              </Card>
            </Grid.Col>
            <Grid.Col span={4}>
              <Box 
                p="md"
                style={{ 
                  backgroundColor: colors.boxBg,
                  border: `1px solid ${colors.border}`
                }}
              >
                <Text c={colors.text}>Box Content</Text>
              </Box>
            </Grid.Col>
            <Grid.Col span={4}>
              <Paper 
                shadow="sm"
                p="md"
                style={{ backgroundColor: colors.paperBg }}
              >
                <Text c={colors.text}>Paper Content</Text>
              </Paper>
            </Grid.Col>
          </Grid>
        </Box>

        {/* Data Display */}
        <Box>
          <Text weight={500} size="sm" mb="md" c={colors.text}>Data Display</Text>
          <Stack spacing="md">
            <Alert
              variant="light"
              color="blue"
              title="Information"
              styles={{
                root: {
                  backgroundColor: `${colors.primary}22`
                },
                title: { color: colors.text },
                message: { color: colors.dimmed }
              }}
            >
              Alert message with themed background
            </Alert>
            
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th style={{ 
                    backgroundColor: colors.headerBg,
                    color: colors.text
                  }}>Header</Table.Th>
                  <Table.Th style={{ 
                    backgroundColor: colors.headerBg,
                    color: colors.text
                  }}>Status</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                <Table.Tr>
                  <Table.Td style={{ color: colors.text }}>Row 1</Table.Td>
                  <Table.Td>
                    <Badge style={{ backgroundColor: colors.secondary }}>Active</Badge>
                  </Table.Td>
                </Table.Tr>
              </Table.Tbody>
            </Table>
          </Stack>
        </Box>
      </Stack>
    </Paper>
  );
}

export function ThemeCustomizer() {
  const [opened, setOpened] = useState(false);
  const { themeSettings, updateTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('layout');
  const [selectedLayout, setSelectedLayout] = useState<typeof LAYOUT_PROFILES[0]['label']>(LAYOUT_PROFILES[0].label);
  const [selectedColor, setSelectedColor] = useState<typeof COLOR_THEMES[0]>(COLOR_THEMES[0]);

  // Early return with loading state if theme settings are not ready
  if (!themeSettings) {
    return (
      <Button
        onClick={() => setOpened(true)}
        variant={defaultThemeSettings.buttonVariant}
        styles={{
          root: {
            backgroundColor: defaultThemeSettings.buttonVariants.filled.background,
            color: defaultThemeSettings.buttonVariants.filled.textColor
          }
        }}
      >
        Customize Theme
      </Button>
    );
  }

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Theme Customizer"
        size="xl"
        styles={{
          content: {
            backgroundColor: selectedColor.colors.background
          },
          header: {
            backgroundColor: selectedColor.colors.headerBg,
            color: selectedColor.colors.text
          }
        }}
      >
        <Tabs value={activeTab} onChange={(value) => setActiveTab(value as string)}>
          <Tabs.List>
            <Tabs.Tab value="layout">Layout Profiles</Tabs.Tab>
            <Tabs.Tab value="colors">Color Themes</Tabs.Tab>
            <Tabs.Tab value="preview">Theme Preview</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="layout">
            <Stack spacing="md">
              {LAYOUT_PROFILES.map((profile) => (
                <Paper
                  key={profile.label}
                  withBorder
                  p="md"
                  onClick={() => {
                    setSelectedLayout(profile.label);
                    const colorTheme = COLOR_THEMES.find(t => t.label === selectedColor.label)!;
                    updateTheme({
                      ...profile.settings,
                      ...colorTheme.colors
                    });
                  }}
                  style={{ 
                    cursor: 'pointer',
                    backgroundColor: selectedLayout === profile.label ? selectedColor.colors.cardBg : undefined,
                    borderColor: selectedLayout === profile.label ? selectedColor.colors.primary : undefined
                  }}
                >
                  <Text fw={500}>{profile.label}</Text>
                  <Text size="sm" c="dimmed">{profile.description}</Text>
                </Paper>
              ))}
            </Stack>
          </Tabs.Panel>

          <Tabs.Panel value="colors">
            <Grid gutter="md">
              <Grid.Col span={6}>
                <Stack spacing="md">
                  {COLOR_THEMES.map((theme) => (
                    <Paper
                      key={theme.label}
                      withBorder
                      p="md"
                      onClick={() => {
                        setSelectedColor(theme);
                        const layoutProfile = LAYOUT_PROFILES.find(p => p.label === selectedLayout)!;
                        updateTheme({
                          ...layoutProfile.settings,
                          ...theme.colors
                        });
                      }}
                      style={{ 
                        cursor: 'pointer',
                        backgroundColor: selectedColor.label === theme.label ? theme.colors.cardBg : undefined,
                        borderColor: selectedColor.label === theme.label ? theme.colors.primary : undefined
                      }}
                    >
                      <Group justify="space-between" mb={8}>
                        <Text fw={500} c={theme.colors.text}>{theme.label}</Text>
                        <Group gap="xs">
                          <ColorSwatch color={theme.colors.primary} size={20} />
                          <ColorSwatch color={theme.colors.secondary} size={20} />
                          <ColorSwatch color={theme.colors.accent} size={20} />
                        </Group>
                      </Group>
                      <Text size="sm" c={theme.colors.dimmed}>{theme.description}</Text>
                    </Paper>
                  ))}
                </Stack>
              </Grid.Col>
              <Grid.Col span={6}>
                <ThemePreview colors={selectedColor.colors} />
              </Grid.Col>
            </Grid>
          </Tabs.Panel>

          <Tabs.Panel value="preview">
            <ThemePreview colors={selectedColor.colors} />
          </Tabs.Panel>
        </Tabs>
      </Modal>

      <Button
        onClick={() => setOpened(true)}
        variant={themeSettings.buttonVariant}
        styles={{
          root: {
            backgroundColor: themeSettings.buttonVariants?.filled.background,
            color: themeSettings.buttonVariants?.filled.textColor
          }
        }}
      >
        Customize Theme
      </Button>
    </>
  );
}
import type {} from "@mui/x-data-grid/themeAugmentation";
import {
  Button,
  Checkbox,
  Chip,
  Container,
  createTheme,
  Fab,
  FormControl,
  Grid,
  InputLabel,
  LinearProgress,
  Paper,
  Stack,
  Tab,
  Tabs,
  TextField,
  ThemeProvider,
  Typography,
  Menu,
  MenuItem,
  OutlinedInput,
} from "@mui/material";
import * as React from "react";

const colors = {
  green: "#00AB55",
  lightGreen: "#E5F7EE",
  olive: "#51806F",
  red: "#FF0000",
  yellow: "#FFE600",
  white: "#ffffff",
  grey: "#F2F2F2",
  midGrey: "#979797",
  lightGrey: "#575757",
  darkGrey: "#2E3036",
  black: "#000000",
};

declare module "@mui/material/styles" {
  interface TypographyVariants {
    subtitle3: React.CSSProperties;
    body3: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    subtitle3?: React.CSSProperties;
    body3: React.CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    subtitle3: true;
    body3: true;
    h1: false;
    h2: false;
    h3: false;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    icon: true;
  }
}

export const theme = createTheme({
  typography: {
    fontFamily: "'Prompt', Helvetica, Arial, sans-serif",
    h5: {
      fontWeight: 600,
      letterSpacing: "-0.012em",
      lineHeight: 1.5,
      color: colors.darkGrey,
    },
    h6: {
      letterSpacing: "-0.011em",
      lineHeight: 1.4,
    },
    subtitle1: {
      fontWeight: 500,
      letterSpacing: "-0.019em",
      lineHeight: 1.2,
      color: colors.darkGrey,
    },
    body1: {
      letterSpacing: "-0.019em",
      lineHeight: 1.6,
    },
    subtitle2: {
      fontWeight: 500,
      letterSpacing: "-0.021em",
      lineHeight: 1.5,
      color: colors.darkGrey,
    },
    body2: {
      lineHeight: 1.6,
      letterSpacing: "-0.021em",
    },
    subtitle3: {
      lineHeight: 1.5,
      letterSpacing: "0.042em",
      color: colors.midGrey,
      fontSize: "0.75rem",
      fontFamily: "'Prompt', Helvetica, Arial, sans-serif",
    },
    body3: {
      lineHeight: "20px",
      letterSpacing: "-0.025em",
      fontSize: "0.75rem",
      fontFamily: "'Prompt', Helvetica, Arial, sans-serif",
    },
  },
  palette: {
    primary: {
      main: colors.green,
    },
    secondary: {
      main: colors.lightGreen,
      contrastText: colors.green,
    },
    error: {
      main: colors.red,
    },
    success: {
      main: colors.olive,
      contrastText: colors.white,
    },
    warning: {
      main: colors.yellow,
      contrastText: colors.white,
    },
    info: {
      main: colors.grey,
      light: colors.lightGrey,
    },

    text: {
      primary: colors.black,
      secondary: colors.midGrey,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiSvgIcon: {
      defaultProps: {
        color: "primary",
      },
      styleOverrides: {
        root: {
          fontSize: "1rem",
        },
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: "sm",
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          "&:last-child": {
            padding: "1.5rem",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        variant: "contained",
      },
      styleOverrides: {
        root: {
          fontWeight: 400,
          textTransform: "capitalize",
          "&.MuiButton-textInfo": {
            color: colors.midGrey,
          },
        },
      },
      variants: [
        {
          props: {
            size: "large",
          },
          style: {
            padding: "13px 22px",
          },
        },
        {
          props: {
            variant: "icon",
          },
          style: {
            padding: "10px",
            background: colors.green,
          },
        },
      ],
    },
    MuiLinearProgress: {
      styleOverrides: {
        determinate: {
          borderRadius: 200,
          height: 10,
          backgroundColor: colors.green,
        },
        bar: {
          borderRadius: 200,
        },
      },
    },
    MuiIcon: {
      defaultProps: {
        color: "primary",
        fontSize: "small",
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 5,
          fontSize: "0.875rem",
        },
      },
    },

    MuiCheckbox: {
      defaultProps: {
        size: "small",
      },
      styleOverrides: {
        root: {
          color: colors.midGrey,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          background: colors.white,
          "& fieldset": {
            borderColor: colors.grey,
          },
          "&.Mui-focused": {
            background: colors.white,
          },
          "&.Mui-focused  ": {
            borderColor: colors.green,
            borderWidth: "1px",
          },
        },
      },
    },
    MuiBadge: {
      styleOverrides: {
        standard: {
          border: "3px solid white",
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          borderRadius: "50%",
          backgroundColor: colors.grey,
          color: colors.black,
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          background: "transparent",
          textTransform: "capitalize",
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: "none",
          padding: "5px",
          "& *": {
            fontFamily: "'Prompt', Helvetica, Arial, sans-serif",
          },
          "& .MuiDataGrid-columnHeaderWrapper": {
            backgroundColor: colors.grey,
          },
          "& .MuiDataGrid-cell": {
            border: "none",
            fontSize: "0.875rem",
            fontWeight: 400,
            cursor: "pointer",
          },
          "& .MuiDataGrid-columnHeader": {
            fontSize: "0.875rem",
            fontWeight: 400,
            color: "#585A63",
          },
          "& .MuiSvgIcon-root": {
            display: "none",
          },
          "& .MuiDataGrid-cell:focus, & .MuiDataGrid-columnHeader:focus": {
            outline: "none",
          },
          "& .MuiDataGrid-columnsContainer": {
            border: "none",
            "& .MuiDataGrid-columnHeaderWrapper": {
              borderRadius: "8px",
            },
          },
        },
      },
    },
  },

  shadows: [
    "none",
    "0px 12px 24px rgba(0, 0, 0, 0.06)",
    "0px 13px 74px rgba(0, 0, 0, 0.14)",
    "0px 12px 24px rgba(0, 0, 0, 0.06)",
    "0px 12px 24px rgba(0, 0, 0, 0.06)",
    "0px 12px 24px rgba(0, 0, 0, 0.06)",
    "0px 12px 24px rgba(0, 0, 0, 0.06)",
    "0px 12px 24px rgba(0, 0, 0, 0.06)",
    "0px 12px 24px rgba(0, 0, 0, 0.06)",
    "0px 12px 24px rgba(0, 0, 0, 0.06)",
    "0px 12px 24px rgba(0, 0, 0, 0.06)",
    "0px 12px 24px rgba(0, 0, 0, 0.06)",
    "0px 12px 24px rgba(0, 0, 0, 0.06)",
    "0px 12px 24px rgba(0, 0, 0, 0.06)",
    "0px 12px 24px rgba(0, 0, 0, 0.06)",
    "0px 12px 24px rgba(0, 0, 0, 0.06)",
    "0px 12px 24px rgba(0, 0, 0, 0.06)",
    "0px 12px 24px rgba(0, 0, 0, 0.06)",
    "0px 12px 24px rgba(0, 0, 0, 0.06)",
    "0px 12px 24px rgba(0, 0, 0, 0.06)",
    "0px 12px 24px rgba(0, 0, 0, 0.06)",
    "0px 12px 24px rgba(0, 0, 0, 0.06)",
    "0px 12px 24px rgba(0, 0, 0, 0.06)",
    "0px 12px 24px rgba(0, 0, 0, 0.06)",
    "0px 12px 24px rgba(0, 0, 0, 0.06)",
  ],
  //@ts-ignore
  MuiDataGrid: {
    styleOverrides: {
      root: {
        "& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-cell:focus": {
          outline: "none",
        },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: colors.grey,
        },
        ".MuiDataGrid-columnSeparator": {
          display: "none",
        },
        ".MuiDataGrid-cell--textLeft": {
          paddingLeft: "17px",
        },
        ".MuiDataGrid-cell": {
          borderBottom: "none",
          fontWeight: "400",
          fontSize: "14px",
        },
        ".MuiDataGrid-columnHeaderWrapper": {
          color: colors.grey,
          fontWeight: "400",
          fontSize: "15px",
        },
      },
    },
  },
});

const ThemePage = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [value, setValue] = React.useState("one");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth={"md"} component={Paper} sx={{ padding: "1.5rem" }}>
        <Stack spacing={3}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="primary"
            indicatorColor="primary"
            aria-label="secondary tabs example"
          >
            <Tab value="one" label="Item One" />
            <Tab value="two" label="Item Two" />
            <Tab value="three" label="Item Three" />
          </Tabs>
          <Stack>
            <Grid container spacing={3} direction="row">
              <Grid item md={6} xs={12}>
                <Stack spacing={3}>
                  <Button size={"medium"} color="primary">
                    Some complecations
                  </Button>
                  <Button size={"medium"} color="secondary">
                    Some complecations
                  </Button>

                  <OutlinedInput placeholder={"Placeholder"} size="small" />
                </Stack>
              </Grid>
              <Grid item md={6} xs={12}>
                <Stack spacing={3}>
                  <Button
                    size={"large"}
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                    color={"info"}
                  >
                    Dropdown
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    elevation={2}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                  </Menu>

                  <Typography variant={"h5"}>
                    [h5] Hey John, Good morning!
                  </Typography>
                  <Typography variant={"h6"}>
                    [h6] Hey John, Good morning!
                  </Typography>
                  <Typography variant={"subtitle1"}>
                    [subtitle1] Hey John, Good morning!
                  </Typography>
                  <Typography variant={"body1"}>
                    [body1] Hey John, Good morning!
                  </Typography>
                  <Typography variant={"subtitle2"}>
                    [subtitle2] Hey John, Good morning!
                  </Typography>
                  <Typography variant={"body2"}>
                    [body2] Hey John, Good mornnig!
                  </Typography>
                  <Typography variant={"subtitle3"}>
                    [subtitle3] Hey John, Good morning!
                  </Typography>
                  <Typography variant={"body3"}>
                    [body3] Hey John, Good morning!
                  </Typography>
                  <Typography color={"primary"} variant={"subtitle3"}>
                    [subtitle3] Primary Color
                  </Typography>
                  <Typography color={"error"} variant={"subtitle3"}>
                    [subtitle3] Error Color
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Stack>
        </Stack>
      </Container>
    </ThemeProvider>
  );
};

export default ThemePage;

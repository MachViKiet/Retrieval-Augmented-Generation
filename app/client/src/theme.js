import { extendTheme } from '@mui/material/styles'
import { viVN } from "@mui/x-data-grid/locales";
const SIDEBAR_WIDTH = "220px";
// import { extendTheme } from "@mui/material/styles";

// Create a theme instance.
const theme = extendTheme(
  {
    app: {
      SideBar_Width: SIDEBAR_WIDTH,
      SidebarColor: "#3f78e08f",
    },
    colorSchemes: {
      light: {
        palette: {
          primary: {
            main: "#005181",
            secondary: "#eaf5ff",
            third: "#d1e3fa",
            light: "#f5f6fa",
            dark: "#1565c0",
            contrastText: "#fff",
            background: "#005181",
          },

          text: {
            primary: "#008bff",
            secondary: "#000",
            disabled: '#9f9f9f'
          },

          success: {
            main: '#0b8210'
          },

          bgColor: {
            main: '#25294a'
          },

          info: {
            main: '#005181'
          },

          warning: {
            main: '#9c9f05'
          }
        },
      },
      dark: {
        palette: {
          primary: {
            main: "#2d325a",
            secondary: "#25294c",
            third: "#4c5679",
            light: "red",
            dark: "#0e2c4f",
            contrastText: "#fff",
            background: "#415073",
          },

          text: {
            primary: "#fff",
            secondary: "#fff",
            disabled: '#9f9f9f'
          },

          success: {
            main: '#0b8210'
          },

          bgColor: {
            main: '#DDF3FC'
          },

          info: {
            main: '#005181'
          },

          warning: {
            main: '#9c9f05'
          }
        },
      }
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            "*::-webkit-scrollbar": {
              width: "4px",
              height: "4px",
              backgroundColor: "transparent",
            },
            "*::-webkit-scrollbar-thumb": {
              backgroundColor: "#666",
              borderRadius: "2px",
            },
            "*::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#888",
            },
          },
        },
      },
      MuiDataGrid: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: "10px",
            fontSize: "0.725rem",
            border: "none",
            boxShadow:
              "0px 2px 4px rgba(0, 0, 0, 0.25), 0px 1px 2px rgba(0, 0, 0, 0.1)",
          }),
          columnHeaders: ({ theme }) => ({
            "& .MuiDataGrid-filler": {
              background: theme.palette.primary.main,
            },
          }),
          columnHeader: ({ theme }) => ({
            background: theme.palette.primary.main,
            color: "#fff",
            "& .MuiButtonBase-root.MuiCheckbox-root": {
              color: "inherit",
            },
            "& .MuiDataGrid-container--top": {
              background: theme.palette.primary.main,
            },
          }),
          row: ({ theme }) => ({
            background: theme.palette.mode == "dark" ? "#1f2640" : "#f7fbff63",
            color: theme.palette.mode == "dark" ? "#fff" : "#000",
            "& .MuiButtonBase-root.MuiCheckbox-root": {
              color: "inherit",
            },
            "&.Mui-selected": {
              background:
                theme.palette.mode == "dark" ? "#1f2640d6" : "#d6d4d480",
            },
            "&:hover": {
              background:
                theme.palette.mode == "dark" ? "#1f2640d6" : "#d6d4d480",
            },
          }),
          cell: {
            // "&:focus": {
            outline: "none !important",
            textAlign: "left",
            padding: "2px 0",
            cursor: "pointer",
            // },
          },
          footerContainer: ({ theme }) => ({
            background: theme.palette.primary.main,
            color: "#fff",
            ".MuiDataGrid-selectedRowCount": {
              color: "inherit",
            },
          }),
          columnSeparator: ({ theme }) => ({
            color: theme.palette.primary.main,
          }),
        },
      },

      MuiSwitch: {
        styleOverrides: {
          root: {},
          switchBase: ({ theme }) => ({
            color: theme.palette.mode == "dark" ? "#344068" : "#aecdf5",
            "&.Mui-checked": {
              color:
                theme.palette.mode == "dark"
                  ? "#5213d9"
                  : theme.palette.primary.main,
              "& + .MuiSwitch-track": {
                background:
                  theme.palette.mode == "dark"
                    ? "#6e3dd994"
                    : theme.palette.primary.main,
                // background: theme.palette.primary.main,
              },
            },
            "& + .MuiSwitch-track": {
              backgroundColor: theme.palette.primary.third,
              opacity: 1,
            },
            "&.Mui-disabled + .MuiSwitch-track": {
              opacity: 0.5,
            },
          }),
        },
      },

      MuiBreadcrumbs: {
        styleOverrides: {
          root: ({ theme }) => ({
            color: theme.palette.text.secondary,
            cursor: "pointer",
          }),
        },
      },

      MuiButton: {
        styleOverrides: {
          root: ({theme}) => ({
            textTransform: "none",
            marginLeft: 0,
            '&:hover' : {
            }
          }),
          contained: {
            color: `#fff`
          }
        },
      },

      MuiTypography: {
        styleOverrides: {
          root: {
            "&.MuiTypography-body1": {
              fontSize: "0.875rem",
            },
          },
        },
      },

      MuiInputLabel: {
        styleOverrides: {
          root: {
            fontSize: "0.875rem",
            color: theme => theme.palette.text.secondary
          },
        },
      },

      MuiOutlinedInput: {
        styleOverrides: {
          root: ({ theme }) => ({
            color:  theme.palette.text.secondary,
            background: '#0000000d',
            '& input' : {
              background: 'transparent !important',
              'WebkitBoxShadow' : '0 0 0 100px transparent inset !important',
              'WebkitTextFillColor' : 'inherit !important'
            },
            '& fieldset': {
              borderColor: `#00000036 !important`,
            },
            '&.Mui-focused fieldset': {

            },
          })
        },
      },

      MuiFormControlLabel: {
        styleOverrides: {
          root: {
            marginLeft: 0,
            color: (theme) => theme.palette.primary.main,
          },
        },
      },

      MuiPaper: {
        styleOverrides: {
          root: ({theme}) => ({
            background: theme.palette.primary.background,
            color: '#fff',
            borderRadius: '15px'
          })
        },
      },

      MuiSkeleton: {
        styleOverrides: {
          root: ({theme}) => ({
            backgroundColor: theme.palette.mode == 'dark' ? '#b9b9bb2b' : '#131b3b2b',
          })
        },
      }
    },
    // ...other properties
  },
  viVN
);

export default theme;

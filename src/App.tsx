import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {
  Card,
  Dialog,
  DialogContent,
  Grid,
  Icon,
  Skeleton,
  Stack,
  TextField,
} from "@mui/material";
import { CenterFocusStrong, Delete, Edit } from "@mui/icons-material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import dayjs from "dayjs";
import useApps from "./api/useApps";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = ["Scan QR", "Modify Profile", "LogOut"];

export default function DrawerAppBar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { data, isLoading } = useApps();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Welcome !!!
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center", paddingLeft: 10 }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav" color={"secondary"}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Welcome !!
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ marginLeft: 1 }}>
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" style={{ flex: 1 }}>
        <Toolbar />
        <img
          style={{ width: "100%" }}
          src={
            "https://nasdkaskmde.s3.ap-south-1.amazonaws.com/jpg_20220630_163621_0000__01.jpg"
          }
          alt="banner"
        />
        <Stack padding={8} spacing={8}>
          <AppGrid title="My Apps" data={data} isLoading={isLoading} />
          <Stack spacing={2}>
            <Typography variant="h4">Logged In</Typography>
            <div style={{ height: 500 }}>
              <DataGrid rows={row1} columns={columns1} />
            </div>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
interface AppGridProps {
  title: string;
  isLoading: boolean;
  data: {
    name: string;
    webhook: string;
  }[];
}

const AppGrid = (props: AppGridProps) => {
  const [dig, setDig] = React.useState(false);
  const [form, setForm] = React.useState(false);
  const [edit, setEdit] = React.useState(false);

  return (
    <>
      <Stack spacing={2}>
        <Stack
          alignItems="center"
          flex={"1"}
          justifyContent="space-between"
          direction={"row"}
        >
          <Typography variant="h4">{props.title}</Typography>
          {props.title === "My Apps" ? (
            <Button
              color="secondary"
              size="large"
              variant="contained"
              onClick={() => setForm(true)}
            >
              Create App
            </Button>
          ) : null}
        </Stack>

        <Grid container spacing={2}>
          {props.isLoading ? (
            <Grid item xs={4}>
              <Card sx={{ padding: 4, cursor: "pointer" }}>
                <Skeleton width={"100%"} />
              </Card>
            </Grid>
          ) : (
            props.data.map((d) => (
              <Grid item xs={3}>
                <Card
                  sx={{ padding: 4, cursor: "pointer", position: "relative" }}
                >
                  <div style={{ position: "absolute", top: 0, right: 0 }}>
                    <IconButton onClick={() => setEdit(true)}>
                      <Edit color="primary" />
                    </IconButton>
                  </div>
                  <Stack flex={1} alignItems={"center"} spacing={1}>
                    <Typography variant="h6">{d.name}</Typography>
                    <Typography
                      variant="body1"
                      color="blue"
                      sx={{ textDecoration: "underline" }}
                    >
                      <div onClick={() => setDig(true)}>{d.webhook}</div>
                    </Typography>
                  </Stack>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Stack>
      <Dialog open={dig} onClose={() => setDig(false)}>
        <DialogContent>
          <Stack spacing={2}>
            <Typography variant="h6">Logged In Users</Typography>
            <div style={{ height: 450, width: 500 }}>
              <DataGrid columns={columns} rows={row} />
            </div>
          </Stack>
        </DialogContent>
      </Dialog>
      <Dialog open={form} onClose={() => setForm(false)}>
        <DialogContent>
          <Stack spacing={3}>
            <Typography variant="h6">Create App</Typography>
            <TextField label="Name" />
            <TextField label="WebHook" />
            <Button variant="contained">Create</Button>
          </Stack>
        </DialogContent>
      </Dialog>
      <Dialog open={edit} onClose={() => setEdit(false)}>
        <DialogContent>
          <Stack spacing={3}>
            <Typography variant="h6">Edit App</Typography>
            <TextField label="WebHook" />
            <Button variant="contained">reGenerate Secret</Button>

            <Button variant="contained">Save</Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};

const appList = [
  { appName: "XYZ.com" },
  { appName: "XYZ.com" },
  { appName: "XYZ.com" },
  { appName: "XYZ.com" },
  { appName: "XYZ.com" },
  { appName: "XYZ.com" },
  { appName: "XYZ.com" },
  { appName: "XYZ.com" },
  { appName: "XYZ.com" },
];

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 0.5 },
  { field: "name", headerName: "Name", flex: 1 },
  {
    field: "last_login",
    headerName: "Last Loged In",
    flex: 1,
    renderCell: (params: GridRenderCellParams<any, any, any>) => (
      <Stack
        direction="row"
        alignItems="center"
        flex={"1"}
        justifyContent="space-between"
      >
        <>{dayjs(params.row.last_login).format("DD/MM/YYYY")}</>
        <IconButton onClick={() => {}}>
          <Delete color="error" />
        </IconButton>
      </Stack>
    ),
  },
];

const row = [
  {
    id: "1",
    name: "Yuvraj Dighe",
    last_login: dayjs(new Date()),
  },
  {
    id: "2",
    name: "Soumya Zinzuwadia",
    last_login: dayjs(new Date()),
  },
  {
    id: "3",
    name: "Prakhar Chouhan",
    last_login: dayjs(new Date()),
  },
  {
    id: "4",
    name: "Sahil Jain",
    last_login: dayjs(new Date()),
  },
  {
    id: "5",
    name: "Sahil Gupta",
    last_login: dayjs(new Date()),
  },
  {
    id: "6",
    name: "Luv Jain",
    last_login: dayjs(new Date()),
  },
];

const columns1: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 0.5 },
  { field: "name", headerName: "Websites / App name", flex: 1 },
  {
    field: "last_login",
    headerName: "Last Loged In",
    flex: 1,
    renderCell: (params: GridRenderCellParams<any, any, any>) => (
      <Stack
        direction="row"
        alignItems="center"
        flex={"1"}
        justifyContent="space-between"
      >
        <>{dayjs(params.row.last_login).format("DD/MM/YYYY")}</>
        <IconButton onClick={() => {}}>
          <Delete color="error" />
        </IconButton>
      </Stack>
    ),
  },
];

const row1 = [
  {
    id: "1",
    name: "Gmail",
    last_login: dayjs(new Date()),
  },
  {
    id: "2",
    name: "Meta",
    last_login: dayjs(new Date()),
  },
  {
    id: "3",
    name: "Instagram",
    last_login: dayjs(new Date()),
  },
  {
    id: "4",
    name: "Youtube",
    last_login: dayjs(new Date()),
  },
  {
    id: "5",
    name: "Geeks for Geeks",
    last_login: dayjs(new Date()),
  },
  {
    id: "6",
    name: "GitHub",
    last_login: dayjs(new Date()),
  },
];

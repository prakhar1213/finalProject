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
import { QrReader } from "react-qr-reader";
import { useForm } from "react-hook-form";

import {
  Card,
  CircularProgress,
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
import useCreateApp from "./api/useCreateApp";
import useCustLogin from "./api/useCustLogin";

const navItems = ["Scan QR", "Modify Profile", "LogOut"];

const App = (props) => {
  let isFirst = true;
  const { data, isLoading } = useApps();
  const [scanner, setScanner] = React.useState(false);
  const [scanResultWebCam, setScanResultWebCam] = React.useState(false);
  const qrRef = React.useRef(null);
  const { mutateAsync, isLoading: loading } = useCustLogin();
  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar color={"secondary"}>
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Welcome !!
          </Typography>
          <Box>
            {navItems.map((item) =>
              item == "Scan QR" ? (
                <>
                  <Button
                    key={item}
                    sx={{ marginLeft: 1 }}
                    onClick={() => {
                      setScanner(true);
                      //onScanFile();
                    }}
                  >
                    {item}
                  </Button>
                </>
              ) : (
                <Button key={item} sx={{ marginLeft: 1 }}>
                  {item}
                </Button>
              )
            )}
          </Box>
          <Dialog
            open={scanner}
            onClose={() => {
              setScanner(false);
              window.location.reload();
            }}
          >
            <DialogContent>
              <Stack spacing={2}>
                <Typography variant="body1">Scan Your QR Code</Typography>
                {!loading ? (
                  <QrReader
                    ref={qrRef}
                    style={{
                      width: 1000,
                      height: 700,
                      display: "flex",
                      justifyContent: "center",
                    }}
                    //onError={handleErrorWebCam}
                    //onScan={handleScanWebCam}

                    onResult={async (r) => {
                      if (r && isFirst) {
                        isFirst = false;
                        mutateAsync({
                          transaction_id: JSON.parse(r.text).transaction_id,
                          is_approved: true,
                        });
                        await timeout(4000);
                        //setScanner(false);
                      }

                      // if (r != undefined) {

                      // }
                    }}
                  />
                ) : (
                  <Stack alignItems={"center"}>
                    <CircularProgress />
                  </Stack>
                )}
              </Stack>
            </DialogContent>
          </Dialog>
        </Toolbar>
      </AppBar>

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
};

const AppGrid = (props) => {
  const [dig, setDig] = React.useState(false);
  const [form, setForm] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const ar = [1, 2, 3, 4];
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { mutateAsync, isLoading } = useCreateApp();

  const onSubmit = (d) => {
    mutateAsync(d);
    setForm(false);
  };

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
          {props.isLoading || isLoading
            ? ar.map((e) => (
                <Grid item xs={3}>
                  <Card sx={{ padding: 4, cursor: "pointer" }}>
                    <Skeleton width={"100%"} />
                  </Card>
                </Grid>
              ))
            : props.data.map((d) => (
                <Grid item xs={"auto"}>
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
              ))}
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <Typography variant="h6">Create App</Typography>
              <Stack>
                <TextField
                  label="Name"
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <Typography variant="caption" color="red">
                    This field is required
                  </Typography>
                )}
              </Stack>
              <Stack>
                <TextField
                  label="Webhook"
                  {...register("webhook", { required: true })}
                />
                {errors.webHook && (
                  <Typography variant="caption" color="red">
                    This field is required
                  </Typography>
                )}
              </Stack>
              <Button variant="contained" type="submit">
                Create
              </Button>
            </Stack>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog open={edit} onClose={() => setEdit(false)}>
        <DialogContent>
          <Stack spacing={3}>
            <Typography variant="h6">Edit App</Typography>
            <TextField label="WebHook" />
            <Button variant="contained">Regenerate Secret</Button>

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

const columns = [
  { field: "id", headerName: "ID", flex: 0.5 },
  { field: "name", headerName: "Name", flex: 1 },
  {
    field: "last_login",
    headerName: "Last Loged In",
    flex: 1,
    renderCell: (params) => (
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

const columns1 = [
  { field: "id", headerName: "ID", flex: 0.5 },
  { field: "name", headerName: "Websites / App name", flex: 1 },
  {
    field: "last_login",
    headerName: "Last Loged In",
    flex: 1,
    renderCell: (params) => (
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

export default App;

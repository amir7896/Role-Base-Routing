import { makeStyles } from "@mui/styles";

const dynamicStyle = makeStyles((theme) => ({
  main: {
    flex: 1,
  },
  root: {
    padding: "10px",
  },
  titelGrid: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "70px",
  },
  title: {
    color: "blue",
    fontSize: "30",
    fontWeight: 20,
  },
}));

export default dynamicStyle;

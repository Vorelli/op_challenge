import app from "./server";
const port = 8004;

app.listen(port, () => {
  console.log("server is listening at port:", port);
});

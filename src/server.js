import app from "./app.js";
const PORT = process.env.PORT;
if (!PORT) {
  console.log("Missing PORT on .env");
}
app.listen(PORT, () => {
  console.log(`Server Run on localhost:${PORT}`);
});

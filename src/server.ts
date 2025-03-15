import app from "./app";
import startup from "./startup";

const PORT = process.env.PORT || 3001;

app.listen(PORT, async () => {
  console.log(`🚀 Server running at: http://localhost:${PORT}`);
  await startup();
});

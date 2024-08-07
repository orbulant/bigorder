const path = require("path");
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 6000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/publicmenu", require("./routes/publicMenuRoutes"));
app.use("/api/menus", require("./routes/menuRoutes"));
app.use("/api/publicorders", require("./routes/publicOrderRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/salesreports", require("./routes/salesRoutes"));

//Serve Frontend
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/build")));

    app.get("*", (req, res) =>
        res.sendFile(
            path.resolve(__dirname, "../frontend", "build", "index.html")
        )
    );
} else {
    app.get("/", (req, res) => res.send("Not in production!"));
}

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server Started on port ${port}`);
});

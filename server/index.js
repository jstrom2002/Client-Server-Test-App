// Setup expressjs server.
const PORT = 3001;
const express = require("express");
const app = express();
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
app.use(express.json());

// Import https requests for server (necessary for NNPES endpoint).
const https = require("https");

/* Setup SQLite db and seed data.
Db Schema
---------
Appointments: id, patient_id, clinician_id, start_time, end_time 
Clinician: id, first_name, last_name, NPI number
Patient: id, first_name, last_name
*/
const initSqlJs = require("sql.js");
let db = undefined;
initSqlJs().then(function (SQL) {
  db = new SQL.Database();
  db.run(
    "CREATE TABLE appointments (id int PRIMARY KEY, patientId int, clinicianId int, startTime int, endTime int); \
    CREATE TABLE clinician (id int PRIMARY KEY, firstName char, lastName char, NPInumber int); \
    CREATE TABLE patient (id int PRIMARY KEY, firstName char, lastName char); \
    INSERT INTO patient VALUES (1, 'Judy', 'Graves'); \
    INSERT INTO patient VALUES (2, 'Arthur', 'Baldwin'); \
    INSERT INTO patient VALUES (3, 'Michael', 'Masterson'); \
    INSERT INTO clinician VALUES (1, 'Thomas', 'McIndoe', 1558467555); \
    INSERT INTO appointments VALUES (1, 1, 1, '2024-1-11 13:23:44', '2024-1-11 13:53:44');"
  );
});

// Setup all API endpoints for CRUD ops.
app.get("/api/appointments", (req, res) => {
  try {
    res.json({
      message: db.exec("SELECT * FROM appointments"),
    });
  } catch (e) {
    res.status(500);
    res.send(e);
  }
});
app.post("/api/appointments", (req, res) => {
  try {
    return res.json({
      message: db.exec(
        `UPDATE appointments SET b = ${req.body.b}, c = ${req.body.c}, d = ${req.body.d}, e = ${req.body.e} WHERE id == ${req.body.a};`
      ),
    });
  } catch (e) {
    res.status(500);
    res.send(e);
  }
});
app.put("/api/appointments", (req, res) => {
  try {
    return res.json({
      message: db.exec(`INSERT INTO appointments VALUES (${req.body});`),
    });
  } catch (e) {
    res.status(500);
    res.send(e);
  }
});
app.delete("/api/appointments", (req, res) => {
  try {
    const bdy = req.body;
    return res.json({
      message: db.exec(
        `DELETE FROM appointments WHERE id == ${bdy.message.id};`
      ),
    });
  } catch (e) {
    res.status(500);
    res.send(e);
  }
});

// Setup API endpoints for clinicians.
app.get("/api/clinician", (req, res) => {
  try {
    return res.json({
      message: db.exec(`SELECT * FROM clinician`),
    });
  } catch (e) {
    res.status(500);
    res.send(e);
  }
});
app.post("/api/clinician", (req, res) => {
  try {
    return res.json({
      message: db.exec(
        `UPDATE clinician SET b = ${req.body.b}, c = ${req.body.c}, d = ${req.body.d} WHERE id == ${req.body.a};`
      ),
    });
  } catch (e) {
    res.status(500);
    res.send(e);
  }
});
app.put("/api/clinician", (req, res) => {
  try {
    return res.json({
      message: db.exec(`INSERT INTO clinician VALUES (${req.body});`),
    });
  } catch (e) {
    res.status(500);
    res.send(e);
  }
});
app.delete("/api/clinician", (req, res) => {
  try {
    const bdy = req.body;
    return res.json({
      message: db.exec(`DELETE FROM clinician WHERE id == ${bdy.message.id};`),
    });
  } catch (e) {
    res.status(500);
    res.send(e);
  }
});

// Setup API endpoints for patients.
app.get("/api/patient", (req, res) => {
  try {
    return res.json({
      message: db.exec("SELECT * FROM patient"),
    });
  } catch (e) {
    res.status(500);
    res.send(e);
  }
});
app.post("/api/patient", (req, res) => {
  try {
    const bdy = req.body;
    if (typeof bdy.a !== "number") {
      res.status(400);
      res.send({ message: "Invalid patient data." });
    }
    db.exec(
      `INSERT INTO patient (firstName,lastName) VALUES ({'${bdy["b"]}', '${bdy["c"]}');`
    );
    res.status(200);
    return res.json({ message: JSON.stringify(bdy) });
  } catch (e) {
    res.status(500);
    res.send(e);
  }
});
app.put("/api/patient", (req, res) => {
  try {
    const bdy = req.body;
    if (typeof bdy.a !== "number") {
      res.status(400);
      res.send({ message: "Invalid patient data." });
    }
    db.exec(
      `UPDATE patient SET firstName = ${req.body.b}, firstName = ${req.body.c} WHERE id == ${req.body.a};`
    );
    res.status(200);
    return res.json({ message: JSON.stringify(bdy) });
  } catch (e) {
    res.status(500);
    res.send(e);
  }
});
app.delete("/api/patient", (req, res) => {
  try {
    const bdy = req.body;
    return res.json({
      message: db.exec(`DELETE FROM patient WHERE id == ${bdy.message.id};`),
    });
  } catch (e) {
    res.status(500);
    res.send(e);
  }
});

// Unique GET endpoint for getting doctor data from the public NNPES API.
app.get("/api/nnpes", (req, res) => {
  try {
    const number = req.url.split("?")[1].split("=")[1];
    let bdy = null;
    https.get(
      `https://npiregistry.cms.hhs.gov/api/?version=2.1&number=${number}`,
      (resp) => {
        let data = "";
        resp.on("data", (chunk) => {
          data += chunk;
        });
        resp.on("end", () => {
          res.status(200);
          res.send(JSON.parse(data));
        });
      }
    );
  } catch (e) {
    res.status(500);
    console.log(e);
    res.send(e);
  }
});

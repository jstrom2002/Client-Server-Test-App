import { Button, Flex, Paper, Table, Text, TextInput } from "@mantine/core";
import React from "react";

const PatientTable = () => {
  const [rows, setRows] = React.useState(null);
  const [newFirstName, setNewFirstName] = React.useState("");
  const [newLastName, setNewLastName] = React.useState("");

  function getPatientData() {
    fetch("api/patient")
      .then((res) => res.json())
      .then((resp) => {
        const returnedData = resp.message;
        if (!returnedData || !returnedData[0]?.values) {
          return;
        }
        setRows(
          returnedData[0]?.values.map((e) => (
            <tr key={e[0]}>
              {e.map((n) => (
                <td>{n}</td>
              ))}
            </tr>
          ))
        );
      });
  }

  function addPatient(patient) {
    console.log("sending patient = ", JSON.stringify(patient));
    fetch("api/patient", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patient),
    })
      .then((res) => res.json())
      .then((resp) => {
        console.log(resp);
        getPatientData();
      });
  }

  React.useEffect(() => {
    getPatientData();
  }, []);

  return (
    <Paper style={{ border: "1px solid" }}>
      <Text fw={700}>Patients</Text>
      <Table
        id="patientTable"
        striped
        highlightOnHover
        style={{ tableLayout: "fixed", columnGap: "1rem" }}
      >
        <thead>
          <tr>
            <th>id</th>
            <th>First name</th>
            <th>Second name</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
      <Flex
        direction={"row"}
        style={{
          placeContent: "center",
          placeItems: "center",
          width: "18rem",
        }}
      >
        <TextInput
          label={"First Name"}
          value={newFirstName}
          onChange={(e) => setNewFirstName(e.currentTarget.value)}
        />
        <TextInput
          label={"Last Name"}
          value={newLastName}
          onChange={(e) => setNewLastName(e.currentTarget.value)}
        />
        <Button
          onClick={() =>
            addPatient({
              a: rows.length,
              b: newFirstName,
              c: newLastName,
            })
          }
          style={{ width: "8rem" }}
        >
          Add
        </Button>
      </Flex>
    </Paper>
  );
};

export default PatientTable;

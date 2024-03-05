import { Button, Flex, Paper, Table, Text, TextInput } from "@mantine/core";
import React from "react";

const ClinicianTable = () => {
  const [rows, setRows] = React.useState(null);
  const [newFirstName, setNewFirstName] = React.useState("");
  const [newLastName, setNewLastName] = React.useState("");

  function getClinicianData() {
    fetch("api/clinician")
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

  React.useEffect(() => {
    getClinicianData();
  }, []);

  return (
    <Paper style={{ border: "1px solid" }}>
      <Text fw={700}>Clinicians</Text>
      <Table
        id="clinicianTable"
        style={{ tableLayout: "fixed", columnGap: "1rem" }}
      >
        <thead>
          <tr>
            <th>id</th>
            <th>First name</th>
            <th>Second name</th>
            <th>NPI number</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
      <Flex
        direction={"row"}
        style={{ placeContent: "center", placeItems: "center", width: "18rem" }}
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
        <Button onClick={null} style={{ width: "8rem" }}>
          Add
        </Button>
      </Flex>
    </Paper>
  );
};

export default ClinicianTable;

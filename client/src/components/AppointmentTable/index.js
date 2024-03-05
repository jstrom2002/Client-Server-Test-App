import { Button, Flex, Paper, Table, Text, TextInput } from "@mantine/core";
import React from "react";

const AppointmentTable = () => {
  const [rows, setRows] = React.useState(null);
  const [newPatientId, setNewPatientId] = React.useState(0);
  const [newClinicianId, setNewClinicianId] = React.useState(0);

  function getAppointmentData() {
    fetch("api/appointments")
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
    getAppointmentData();
  }, []);

  return (
    <Paper style={{ border: "1px solid" }}>
      <Text fw={700}>Patients</Text>
      <Table
        id="appointmentTable"
        striped
        highlightOnHover
        style={{ tableLayout: "fixed", columnGap: "1rem" }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Patient ID</th>
            <th>Clinician ID</th>
            <th>Start Time</th>
            <th>End Time</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
      <Flex
        direction={"row"}
        style={{ placeContent: "center", placeItems: "center", width: "18rem" }}
      >
        <TextInput
          label={"Patient Id"}
          value={newPatientId}
          onChange={(e) => setNewPatientId(e.currentTarget.value)}
        />
        <TextInput
          label={"Clinician Id"}
          value={newClinicianId}
          onChange={(e) => setNewClinicianId(e.currentTarget.value)}
        />
        <Button onClick={null} style={{ width: "8rem" }}>
          Add
        </Button>
      </Flex>
    </Paper>
  );
};

export default AppointmentTable;

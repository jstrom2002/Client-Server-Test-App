import React, { useEffect, useState } from "react";
import { Button, Paper, Table, Text } from "@mantine/core";

export default function DataTable({ title, url, ...props }) {
  const [tableData, setTableData] = useState([]);
  const [tableHeaders, setTableHeaders] = useState([]);

  function getData() {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response error");
        }
        return response.json();
      })
      .then((data) => {
        if (data.message.length > 0) {
          setTableHeaders(data.message[0].columns);
          setTableData(data.message[0].values);
        }
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      });
  }

  function addData(data) {
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((resp) => {
        getData();
      });
  }

  function updateData(data) {
    fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((resp) => {
        console.log("PUT called");
      });
  }

  function deleteData(id) {
    fetch(url + `?id=${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: { id: id } }),
    })
      .then((res) => res.json())
      .then((resp) => {
        getData();
      });
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <Paper
      style={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid",
      }}
    >
      <Text size={"xl"} fw={700} style={{ marginBottom: "30px" }}>
        {title}
      </Text>
      {tableData.length >= 1 ? (
        <Table
          {...props}
          striped
          highlightOnHover
          style={{
            tableLayout: "fixed",
            columnGap: "1rem",
          }}
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th> </Table.Th>
              {tableHeaders.map((n) => (
                <Table.Th>{n}</Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {tableData.map((n) => (
              <Table.Tr key={n[0]}>
                <Table.Td>
                  <Button onClick={() => deleteData(n[0])}>X</Button>
                </Table.Td>
                {n.map((m) => (
                  <Table.Td>{m}</Table.Td>
                ))}
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      ) : (
        <Text>No data to display.</Text>
      )}
    </Paper>
  );
}

import React from "react";
import "@mantine/core/styles.css";
import { Button, Flex, Paper, Text, TextInput } from "@mantine/core";
import MainScreen from "./screens/MainScreen/index.js";

export default function App() {
  const [NNPESstr, setNNPESstr] = React.useState("1558467555");
  const [doctorData, setDoctorData] = React.useState(undefined);

  function QueryNNPES(number) {
    try {
      setDoctorData(undefined);
      fetch(`/api/nnpes?number=${number}`)
        .then((res) => res.json())
        .then((data) => {
          const str = JSON.stringify(data["results"][0]["basic"]);
          console.log(str);
          setDoctorData(str);
        });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div
      className="App"
      style={{
        display: "flex",
        flexDirection: "column",
        columnGap: "2rem",
        rowGap: "1rem",
        placeContent: "center",
        placeItems: "center",
        padding: "2rem",
      }}
    >
      <header className="App-header"></header>
      <Paper
        style={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          placeContent: "center",
          placeItems: "center",
        }}
      >
        <Text fw={700} size={"xl"}>
          Client-Server test app
        </Text>
        <Flex
          direction={"row"}
          style={{
            placeSelf: "center",
            margin: "2rem",
          }}
        >
          <TextInput
            label={"Find Physician by NPI Number"}
            plaeholder={"NPI Number"}
            value={NNPESstr}
            onChange={(e) => setNNPESstr(e.currentTarget.value)}
          />
          <Button onClick={() => QueryNNPES(NNPESstr)}>Search</Button>
        </Flex>
        <Text>{doctorData ? doctorData : "No doctor data retrieved."}</Text>
        <Flex
          direction={"column"}
          style={{ marginTop: "2rem", rowGap: "2rem" }}
        >
          <MainScreen />
        </Flex>
      </Paper>
    </div>
  );
}

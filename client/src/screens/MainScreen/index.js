import DataTable from "../../components/DataTable/index.js";

export default function MainScreen({ ...props }) {
  return (
    <>
      <DataTable title="Patients" url={"api/patient"} />
      <DataTable title="Clinician" url={"api/clinician"} />
      <DataTable title="Appointments" url={"api/appointments"} />
    </>
  );
}

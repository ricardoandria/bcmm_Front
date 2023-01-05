import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { Button } from "@mui/material";
import { useDeleteEntretien } from "../../Network/Entretien";

const EntretienTableRow = ({ entretien }) => {
  const { mutate: deleteEntretien } = useDeleteEntretien();
  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell component="th" scope="row">
        {entretien.voiture.numeroImma}
      </TableCell>
      <TableCell>{entretien.reparation}</TableCell>
      <TableCell>
        <Button onClick={() => deleteEntretien(entretien._id)}>Supprime</Button>
        <Button>Modifier</Button>
      </TableCell>
    </TableRow>
  );
};

export default EntretienTableRow;

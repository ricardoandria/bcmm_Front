import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { GrAddCircle } from "react-icons/gr";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";
import { useForm } from "react-hook-form";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useGetVoiture } from "../Network/Voiture";
import { useAddEntretiens, useGetEntretien } from "../Network/Entretien";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import EntretienTableRow from "../components/TableMui/EntretienTableRow";
import { useGetMoto } from "../Network/Moto/hooks";
import { FormControl, MenuItem, Select } from "@mui/material";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Entretien = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openConfirme, setOpenConfirme] = React.useState(false);
  const [id, setId] = useState("");
  const { register, handleSubmit, setValue } = useForm();
  const { mutate: addEntretien } = useAddEntretiens();
  const { data: Entretiens } = useGetEntretien();
  const [choice, setChoice] = useState(false);
  const { data: voitures } = useGetVoiture();
  const { data: motos } = useGetMoto();

  console.log(voitures.getVoitures);
  const handleSubmitData = (values) => {
    addEntretien(values, {
      onSuccess() {
        setOpen(false);
      },
    });
  };

  const handleVoiture = () => {
    setChoice(false);
    setOpen(true);
    setOpenConfirme(false);
  };
  const handleMoto = () => {
    setChoice(true);
    setOpen(true);
    setOpenConfirme(false);
  };

  return (
    <div className="px-6 w-full ">
      <div className="flex w-full  items-center justify-between">
        <Search sx={{ backgroundColor: "white", width: { xs: 200, md: 300 } }}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria placeholder": "search" }}
          />
        </Search>
        <div>
          <button
            onClick={() => setOpenConfirme(true)}
            className="hidden  md:block bg-blue-900 p-2 text-white font-semibold rounded-full "
          >
            Ajouter un Entretien
          </button>
          <button onClick={handleOpen} className=" md:hidden">
            <GrAddCircle size={30} />
          </button>
          <Modal
            open={openConfirme}
            onClose={() => setOpenConfirme(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div className="flex justify-center gap-4">
                <Button
                  onClick={handleVoiture}
                  className="bg-blue-900 text-white py-2"
                >
                  Voiture
                </Button>
                <Button
                  onClick={handleMoto}
                  className="bg-blue-900 text-white py-2"
                >
                  Moto
                </Button>
              </div>
            </Box>
          </Modal>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <form onSubmit={handleSubmit((data) => handleSubmitData(data))}>
                <div className="w-100">
                  <TextField
                    id="outlined-multiline-static"
                    label="Type de Reparation"
                    multiline
                    rows={4}
                    sx={{ width: "100%" }}
                    defaultValue="Default Value"
                    className="mb-4"
                    {...register("reparation", { required: true })}
                  />
                  <FormControl sx={{ m: 1, minWidth: 120, width: "45%" }}>
                    <InputLabel id="demo-simple-select-helper-label">
                      {choice ? "Moto" : "Voiture"}
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      {...register(choice == true ? "Moto" : "voiture")}
                      label="Age"
                    >
                      {choice
                        ? motos?.getMotos.map((moto) => (
                            <MenuItem value={moto._id}>
                              {moto.numeroImma}
                            </MenuItem>
                          ))
                        : voitures?.getVoitures.map((voiture) => (
                            <MenuItem value={voiture._id}>
                              {voiture.numeroImma}
                            </MenuItem>
                          ))}
                    </Select>
                  </FormControl>
                </div>

                <button
                  type="submit"
                  className=" px-6 py-2 bg-blue-900 text-white"
                >
                  {id == "" ? "Ajouter" : "Modifier"}
                </button>
              </form>
            </Box>
          </Modal>
        </div>
      </div>
      <div className="mt-4">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead className=" bg-blue-900">
              <TableRow>
                <TableCell
                  sx={{ width: "20%" }}
                  className="font-semibold text-white"
                >
                  Numero Immatriculation
                </TableCell>

                <TableCell
                  sx={{ width: "60%" }}
                  className="font-semibold text-white"
                >
                  Reparation
                </TableCell>
                <TableCell
                  sx={{ width: "20%" }}
                  className="font-semibold text-white"
                >
                  option
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Entretiens?.getEntretiens.length == 0 ? (
                <p className="pl-2 py-4 font-semibold ">Pas de donnee</p>
              ) : (
                Entretiens?.getEntretiens.map((entretien) => (
                  <EntretienTableRow
                    key={entretien._id}
                    entretien={entretien}
                  />
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

const listeReparation = [
  { title: "pneu" },
  { title: "far" },
  { title: "moteur" },
  { title: "pneu" },
];

export default Entretien;

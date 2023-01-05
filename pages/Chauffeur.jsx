import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import { GrAddCircle } from "react-icons/gr";
import { DataGrid } from "@mui/x-data-grid";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { motosHooks } from "../Network";
import { Skeleton } from "@mui/material";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import { useForm } from "react-hook-form";
import {
  updateChauffeur,
  useAddChauffeurs,
  useDeleteChauffeur,
  useGetChauffeur,
  useGetChauffeurById,
} from "../Network/Chauffeur";

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

const columns = [
  { field: "_id", headerName: "ID", width: 200, hide: true },
  { field: "nom", headerName: "nom", width: 150 },
  { field: "prenom", headerName: "prenom", width: 200 },
  { field: "numeroMatricule", headerName: "Numero Matricule", width: 200 },
  { field: "numeroTelephone", headerName: "Numero Telephone", width: 130 },
];

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

const Chauffeur = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [id, setId] = useState("");

  const { register, handleSubmit, setValue } = useForm();

  const { data: chauffeurs } = useGetChauffeur();
  const { mutate: addChauffeur } = useAddChauffeurs();
  const { mutate: deleteChauffeur, isLoading: deleting } = useDeleteChauffeur();
  const { mutate: updateChauffeurs } = updateChauffeur(id);
  const { data: chauffeur } = useGetChauffeurById(id);

  useEffect(() => {
    setValue("nom", chauffeur?.data.getChauffeur?.nom);
    setValue("prenom", chauffeur?.data.getChauffeur?.prenom);
    setValue("numeroMatricule", chauffeur?.data.getChauffeur?.numeroMatricule);
    setValue("numeroTelephone", chauffeur?.data.getChauffeur?.numeroTelephone);
  }, [id, chauffeur]);

  const handleSubmitData = (values) => {
    addChauffeur(values, {
      onSuccess() {
        setOpen(false);
      },
    });
  };

  const handleUpdateData = (values) => {
    updateChauffeurs(values, {
      onSuccess() {
        setOpen(false);
      },
    });
  };

  const passeId = (id) => {
    setId(id);
    setOpen(true);
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
            onClick={handleOpen}
            className="hidden  md:block bg-blue-900 p-2 text-white font-semibold rounded-full "
          >
            Ajouter un Moto
          </button>
          <button onClick={handleOpen} className=" md:hidden">
            <GrAddCircle size={30} />
          </button>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <form
                onSubmit={
                  id == ""
                    ? handleSubmit((data) => handleSubmitData(data))
                    : handleSubmit((data) => handleUpdateData(data))
                }
              >
                <div className=" flex justify-between mb-4">
                  <TextField
                    id="outlined-basic"
                    placeholder="Nom"
                    name="nom"
                    variant="outlined"
                    sx={{ width: "45%" }}
                    {...register("nom")}
                    autoFocus={true}
                  />
                  <TextField
                    id="outlined-basic"
                    placeholder="prenom"
                    variant="outlined"
                    sx={{ width: "45%" }}
                    {...register("prenom")}
                  />
                </div>
                <div className=" flex justify-between mb-4">
                  <TextField
                    id="outlined-basic"
                    placeholder="Numero de Matricule"
                    variant="outlined"
                    sx={{ width: "45%" }}
                    {...register("numeroMatricule")}
                  />
                  <TextField
                    id="outlined-basic"
                    placeholder="Numero Telephone"
                    variant="outlined"
                    sx={{ width: "45%" }}
                    {...register("numeroTelephone")}
                  />
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

      <div
        className="mt-4 flex flex-wrap justify-between gap-2"
        style={{ height: 800, width: "100%" }}
      >
        {chauffeurs?.getChauffeurs.map((chauffeur) => (
          <Card sx={{ minWidth: "30%", height: 250 }}>
            <CardContent>
              <Typography
                color="text.secondary"
                gutterBottom
                sx={{ marginBottom: 2 }}
              >
                <span className="p-2 mr-2 text-sm text-white font-semibold bg-blue-900">
                  Nom
                </span>
                {chauffeur.nom}
              </Typography>
              <Typography sx={{ marginBottom: 2 }} color="text.secondary">
                <span className="p-2 mr-2 text-sm text-white font-semibold bg-blue-900">
                  Prenom
                </span>
                {chauffeur.prenom}
              </Typography>
              <Typography sx={{ marginBottom: 2 }} color="text.secondary">
                <span className="p-2 mr-2 text-sm text-white font-semibold bg-blue-900">
                  Numero Matriculation
                </span>
                {chauffeur.numeroMatricule}
              </Typography>
              <Typography sx={{ marginBottom: 2 }} color="text.secondary">
                <span className="p-2 mr-2 text-sm text-white font-semibold bg-blue-900">
                  Numero Telephone
                </span>
                {chauffeur.numeroTelephone}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                onClick={() => deleteChauffeur(chauffeur._id)}
                size="small"
              >
                {deleting ? "chargement..." : "Supprime"}
              </Button>
              <Button onClick={() => passeId(chauffeur._id)} size="small">
                Modifier
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Chauffeur;

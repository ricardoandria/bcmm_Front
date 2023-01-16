import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import { GrAddCircle } from "react-icons/gr";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { VoituresHooks } from "../Network";
import { Skeleton } from "@mui/material";
import {
  updateVoiture,
  useAddVoitures,
  useDeleteVoiture,
  useGetVoiture,
  useGetVoitureById,
} from "../Network/Voiture";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import { parseISO, format } from "date-fns";
import Backdrop from "@mui/material/Backdrop";
import NativeSelect from "@mui/material/NativeSelect";
import { useForm } from "react-hook-form";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useGetMoto } from "../Network/Moto/hooks";
import { useGetChauffeur } from "../Network/Chauffeur";
import {
  updateParcours,
  useAddParcours,
  useDeleteParcours,
  useGetParcours,
  useGetParcoursById,
} from "../Network/Parcours";

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

const Parcours = () => {
  const [open, setOpen] = React.useState(false);
  const [id, setId] = useState("");
  const [openMore, setOpenMore] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { register, handleSubmit, setValue, reset } = useForm();
  const [openConfirme, setOpenConfirme] = React.useState(false);
  const [openConfirmeUpdate, setOpenConfirmeUpdate] = React.useState(false);
  const [choice, setChoice] = useState(false);
  const { data: voitures } = useGetVoiture();

  const { data: motos } = useGetMoto();
  const { data: Chauffeur } = useGetChauffeur();
  const { mutate: addParcours } = useAddParcours();
  const { mutate: deleteParcour, isLoading: deleting } = useDeleteParcours();
  const { data: Parcours, isLoading } = useGetParcours();
  const { data: parcour } = useGetParcoursById(id);
  const { mutate: updateParcour } = updateParcours(id);
  //   const { data: voiture } = useGetVoitureById(
  //     parcour?.data?.getVoyage?.voiture
  //   );
  console.log(parcour);
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
  const handleChoice = (id) => {
    setOpenConfirme(true);
  };

  const handleVoitureUpdate = (id) => {
    setChoice(false);
    setOpen(true);
    setOpenConfirme(false);
    setId(id);
  };
  const handleMotoUpdate = (id) => {
    setChoice(true);
    setOpen(true);
    setOpenConfirme(false);
    setId(id);
  };

  const handleSubmitData = (values) => {
    addParcours(values, {
      onSuccess() {
        setOpen(false);
      },
    });
  };
  const hanleCloseMore = () => {
    setOpenMore(false);
    setId("");
  };

  const passeId = (id) => {
    setId(id);
    setOpen(true);
  };

  const passeMoreId = (id) => {
    setOpenMore(true);
    setId(id);
  };

  const handleUpdateData = (values) => {
    updateParcour(values, {
      onSuccess() {
        setOpen(false);
      },
    });
  };

  useEffect(() => {
    setValue("voiture", parcour?.data.getVoyage?.voiture);
    setValue("chauffeur", parcour?.data.getVoyage?.chauffeur);
    setValue("Moto", parcour?.data.getVoyage?.Moto);
    setValue("kilometrage", parcour?.data.getVoyage?.kilometrage);
    setValue("consommationJour", parcour?.data.getVoyage?.consommationJour);
  }, [id, parcour]);

  // const [filtre, setFiltre] = useState([]);
  // const filterChauffeur = (event) => {
  //   let value = event.target.value.toLowerCase();
  //   let result = [];
  //   console.log("toto");
  //   result = Parcours?.getVoyages.filter((data) => {
  //     return Parcours.nom.toLowerCase().search(value) != -1;
  //   });
  //   setFiltre(result);
  // };

  // useEffect(() => {
  //   setFiltre(chauffeurs?.getChauffeurs);
  // }, [chauffeurs]);

  console.log(Parcours, "ggggggggggggg");

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
            Ajout Parcours
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
              <form
                onSubmit={
                  id == ""
                    ? handleSubmit((data) => handleSubmitData(data))
                    : handleSubmit((data) => handleUpdateData(data))
                }
              >
                <div className=" flex justify-between mb-4">
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
                  <FormControl sx={{ m: 1, minWidth: 120, width: "45%" }}>
                    <InputLabel id="demo-simple-select-helper-label">
                      Chauffeur
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      {...register("chauffeur")}
                      label="Chauffeur"
                    >
                      {Chauffeur?.getChauffeurs.map((chauffeur) => (
                        <MenuItem value={chauffeur._id}>
                          {chauffeur.numeroMatricule}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div className=" flex justify-between mb-4">
                  <TextField
                    id="outlined-basic"
                    placeholder="Kilometre par jour"
                    variant="outlined"
                    sx={{ width: "45%" }}
                    {...register("kilometrage")}
                  />
                  <TextField
                    id="outlined-basic"
                    placeholder="Consommation par jour"
                    variant="outlined"
                    sx={{ width: "45%" }}
                    {...register("consommationJour")}
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
        {isLoading ? (
          <Skeleton />
        ) : (
          Parcours?.getVoyages.map((Parcour) => (
            <Card key={Parcour._id} sx={{ minWidth: "30%", height: 250 }}>
              <CardContent>
                <Typography sx={{ marginBottom: 2 }} color="text.secondary">
                  <span className="p-2 mr-2 text-sm text-white font-semibold bg-blue-900">
                    Kilometrage par jour
                  </span>
                  {Parcour.kilometrage}
                </Typography>
                <Typography sx={{ marginBottom: 2 }} color="text.secondary">
                  <span className="p-2 mr-2 text-sm text-white font-semibold bg-blue-900">
                    Consommation du jour
                  </span>
                  {Parcour.consommationJour}
                </Typography>
                {Parcour.voiture ? (
                  <Typography sx={{ marginBottom: 2 }} color="text.secondary">
                    <span className="p-2 mr-2 text-sm text-white font-semibold bg-blue-900">
                      Numero Immatriculation Voiture
                    </span>
                    {Parcour?.voiture?.numeroImma}
                  </Typography>
                ) : (
                  <Typography sx={{ marginBottom: 2 }} color="text.secondary">
                    <span className="p-2 mr-2 text-sm text-white font-semibold bg-blue-900">
                      Numero Immatriculation Moto
                    </span>
                    {Parcour?.Moto?.numeroImma}
                  </Typography>
                )}
                <Typography sx={{ marginBottom: 2 }} color="text.secondary">
                  <span className="p-2 mr-2 text-sm text-white font-semibold bg-blue-900">
                    Numero Matricule Chauffeur
                  </span>
                  {Parcour.chauffeur.numeroMatricule}
                </Typography>
              </CardContent>
              <CardActions className="flex justify-between">
                <div>
                  <Button
                    onClick={() => deleteParcour(Parcour._id)}
                    size="small"
                  >
                    {deleting ? "Chargement" : "Supprimer"}
                  </Button>
                  <Button onClick={() => passeId(Parcour._id)} size="small">
                    Modifier
                  </Button>
                </div>
                <Button onClick={() => passeMoreId(Parcour._id)} size="small">
                  Voir plus
                </Button>
              </CardActions>
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openMore}
                onClose={hanleCloseMore}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={openMore}>
                  <Box sx={style}>
                    <div>
                      <h2 className="text-2xl font-semibold border-b-2 border-solid border-stone-400 mb-4 pb-2">
                        A propos du Parcours
                      </h2>
                      <div>
                        <div className="flex gap-2 justify-between mb-4">
                          <Typography
                            color="text.secondary"
                            gutterBottom
                            sx={{ marginBottom: 2 }}
                          >
                            <span className="p-2 mr-2 text-sm text-white font-semibold bg-blue-900">
                              Consommation du jour
                            </span>
                            {parcour?.data?.getVoyage?.consommationJour}
                          </Typography>
                          <Typography
                            color="text.secondary"
                            gutterBottom
                            sx={{ marginBottom: 2 }}
                          >
                            <span className="p-2 mr-2 text-sm text-white font-semibold bg-blue-900">
                              Kilometrage du jour
                            </span>
                            {parcour?.data?.getVoyage?.kilometrage}
                          </Typography>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h2 className="text-2xl font-semibold border-b-2 border-solid border-stone-400 mb-4 pb-2">
                        {parcour?.data?.getVoyage?.voiture
                          ? "A propos du Voiture"
                          : "A propos du Moto"}
                      </h2>
                      <div>
                        <div className="flex gap-2 justify-between mb-4">
                          <Typography
                            color="text.secondary"
                            gutterBottom
                            sx={{ marginBottom: 2 }}
                          >
                            <span className="p-2 mr-2 text-sm text-white font-semibold bg-blue-900">
                              Numero Immatriculation
                            </span>
                            {parcour?.data?.getVoyage?.voiture
                              ? parcour?.data?.getVoyage?.voiture?.numeroImma
                              : parcour?.data?.getVoyage?.Moto?.numeroImma}
                          </Typography>
                          <Typography
                            color="text.secondary"
                            gutterBottom
                            sx={{ marginBottom: 2 }}
                          >
                            <span className="p-2 mr-2 text-sm text-white font-semibold bg-blue-900">
                              Numero de serie
                            </span>
                            {parcour?.data?.getVoyage?.voiture
                              ? parcour?.data?.getVoyage?.voiture?.numeroSerie
                              : parcour?.data?.getVoyage?.Moto?.numeroSerie}
                          </Typography>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h2 className="text-2xl font-semibold border-b-2 border-solid border-stone-400 mb-4 pb-2">
                        A propos du Chauffeur
                      </h2>
                      <div>
                        <div className="flex gap-2 justify-between mb-4">
                          <Typography
                            color="text.secondary"
                            gutterBottom
                            sx={{ marginBottom: 2 }}
                          >
                            <span className="p-2 mr-2 text-sm text-white font-semibold bg-blue-900">
                              Nom et prenom
                            </span>
                            {parcour?.data?.getVoyage?.chauffeur?.nom}
                            {parcour?.data?.getVoyage?.chauffeur?.prenom}
                          </Typography>
                          <Typography
                            color="text.secondary"
                            gutterBottom
                            sx={{ marginBottom: 2 }}
                          >
                            <span className="p-2 mr-2 text-sm text-white font-semibold bg-blue-900">
                              Numero Matricule
                            </span>
                            {
                              parcour?.data?.getVoyage?.chauffeur
                                ?.numeroMatricule
                            }
                          </Typography>
                        </div>
                      </div>
                    </div>
                  </Box>
                </Fade>
              </Modal>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Parcours;

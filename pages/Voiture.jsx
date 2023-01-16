import { useEffect, useState } from "react";
import React from "react";
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
import dayjs from "dayjs";

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

const Voiture = () => {
  const [open, setOpen] = React.useState(false);
  const [openMore, setOpenMore] = useState(false);
  const [id, setId] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setId("");
  };
  const { data: voitureById } = useGetVoitureById(id);

  const { data, isLoading } = useGetVoiture();
  const { mutate: deleteAuto, isLoading: deleting } = useDeleteVoiture();
  const { mutate: updateAuto, isLoading: updating } = updateVoiture(id);
  const { mutate: addAuto } = useAddVoitures();
  const { register, handleSubmit, setValue, reset } = useForm();

  const [dateNow, setDateNow] = useState(new Date());

  useEffect(() => {
    setValue("marque", voitureById?.data.getVoiture?.marque);
    setValue("anneeAcqui", voitureById?.data.getVoiture?.anneeAcqui);
    setValue("numeroImma", voitureById?.data.getVoiture?.numeroImma);
    setValue("numeroSerie", voitureById?.data.getVoiture?.numeroSerie);
    setValue("typeCarburant", voitureById?.data.getVoiture?.typeCarburant);
    setValue("consommation", voitureById?.data.getVoiture?.consommation);
    setValue("emplacement", voitureById?.data.getVoiture?.emplacement);
    setValue("status", voitureById?.data.getVoiture?.status);
    setValue("NumeroAssurence", voitureById?.data.getVoiture?.NumeroAssurence);
    setValue("NomAgence", voitureById?.data.getVoiture?.NomAgence);
    setValue(
      "dateDebutAssurence",
      dayjs(voitureById?.data.getVoiture?.dateDebutAssurence).format(
        "YYYY-MM-DD"
      )
    );
    setValue(
      "dateFinAssurence",
      dayjs(voitureById?.data.getVoiture?.dateFinAssurence).format("YYYY-MM-DD")
    );
    setValue("NumeroVisite", voitureById?.data.getVoiture?.NumeroVisite);
    setValue("lieuVisite", voitureById?.data.getVoiture?.lieuVisite);
    setValue(
      "dateDebutVisite",
      dayjs(voitureById?.data.getVoiture?.dateFinAssurence).format("YYYY-MM-DD")
    );
    setValue(
      "dateFinVisite",
      dayjs(voitureById?.data.getVoiture?.dateFinAssurence).format("YYYY-MM-DD")
    );
  }, [id, voitureById]);

  const handleSubmitData = (values) => {
    addAuto(values, {
      onSuccess() {
        setOpen(false);
      },
    });
  };

  const handleUpdateData = (values) => {
    updateAuto(values, {
      onSuccess() {
        setOpen(false);
      },
    });
  };

  const passeId = (id) => {
    setOpen(true);
    return setId(id);
  };

  const passeMoreId = (id) => {
    setOpenMore(true);

    return setId(id);
  };

  const hanleCloseMore = () => {
    setOpenMore(false);
    setId("");
  };

  function getDayDiff(startDate, endDate) {
    const msInDay = 24 * 60 * 60 * 1000;

    return Math.round(Math.abs(endDate - startDate) / msInDay);
  }
  const [filtre, setFiltre] = useState([]);
  const filterVoiture = (event) => {
    let value = event.target.value.toLowerCase();
    let result = [data?.getVoitures];
    console.log(data?.getVoitures);
    result = data?.getVoitures.filter((data) => {
      return data.numeroImma.search(value) != -1;
    });
    setFiltre(result);
  };

  useEffect(() => {
    setFiltre(data?.getVoitures);
  }, [data]);

  return (
    <div className="px-6 w-full ">
      <div className="flex w-full  items-center justify-between">
        <Search
          sx={{ backgroundColor: "white", width: { xs: 200, md: 300 } }}
          onChange={filterVoiture}
        >
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
            Ajouter un voiture
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
                    placeholder="Marque"
                    variant="outlined"
                    sx={{ width: "45%" }}
                    {...register("marque")}
                    autoFocus={true}
                    required
                  />
                  <TextField
                    id="outlined-basic"
                    placeholder="Annee Acquisition"
                    variant="outlined"
                    sx={{ width: "45%" }}
                    {...register("anneeAcqui")}
                    required
                  />
                </div>
                <div className=" flex justify-between mb-4">
                  <TextField
                    id="outlined-basic"
                    placeholder="Numero de Immatriculation"
                    variant="outlined"
                    sx={{ width: "45%" }}
                    {...register("numeroImma")}
                    required
                  />
                  <TextField
                    id="outlined-basic"
                    placeholder="Numero de serie"
                    variant="outlined"
                    sx={{ width: "45%" }}
                    {...register("numeroSerie")}
                    required
                  />
                </div>
                <div className=" flex justify-between mb-4">
                  <TextField
                    id="outlined-basic"
                    placeholder="Type de carburant"
                    variant="outlined"
                    sx={{ width: "45%" }}
                    {...register("typeCarburant")}
                    required
                  />
                  <TextField
                    id="outlined-basic"
                    placeholder="Consommation"
                    variant="outlined"
                    sx={{ width: "45%" }}
                    {...register("consommation")}
                    required
                  />
                </div>
                <div className=" flex justify-between mb-4">
                  <TextField
                    id="outlined-basic"
                    placeholder="Emplacement"
                    variant="outlined"
                    sx={{ width: "45%" }}
                    {...register("emplacement")}
                    required
                  />
                  <div style={{ width: "45%" }} fullWidth>
                    <InputLabel
                      variant="standard"
                      htmlFor="uncontrolled-native"
                    >
                      Status
                    </InputLabel>
                    <NativeSelect
                      {...register("status", { required: true })}
                      defaultValue={30}
                      inputProps={{
                        name: "status",
                        id: "uncontrolled-native",
                      }}
                    >
                      <option value="En panne">En panne</option>
                      <option value="Accident">Accident</option>
                      <option value="En bonne etat">En bonne etat</option>
                      <option value="En cours de Reparation">
                        En cours de Reparation
                      </option>
                    </NativeSelect>
                  </div>
                </div>
                <div>
                  <h3 className=" border-b-2 border-solid mb-4 font-semibold text-xl">
                    Assurence
                  </h3>

                  <div className="flex justify-between mb-4">
                    <TextField
                      id="outlined-basic"
                      placeholder="Numero Assurence"
                      variant="outlined"
                      sx={{ width: "45%" }}
                      {...register("NumeroAssurence")}
                      required
                    />
                    <TextField
                      id="outlined-basic"
                      placeholder="Nom Agence"
                      variant="outlined"
                      sx={{ width: "45%" }}
                      {...register("NomAgence")}
                      required
                    />
                  </div>

                  <div className="flex justify-between mb-4">
                    <input
                      className="px-4 py-2 border-solid border-stone-200 border-2 w-[45%]"
                      type="date"
                      {...register("dateDebutAssurence")}
                      required
                    />
                    <input
                      className="px-4 py-2 border-solid border-stone-200 border-2 w-[45%]"
                      type="date"
                      {...register("dateFinAssurence")}
                      required
                    />
                  </div>
                </div>
                <div>
                  <h3 className=" font-semibold text-xl border-b-2 border-solid mb-4">
                    Visite Technique
                  </h3>

                  <div className="flex justify-between mb-4">
                    <TextField
                      id="outlined-basic"
                      placeholder="Numero Visite"
                      variant="outlined"
                      sx={{ width: "45%" }}
                      {...register("NumeroVisite")}
                      required
                    />
                    <TextField
                      id="outlined-basic"
                      placeholder="Lieu visite"
                      variant="outlined"
                      sx={{ width: "45%" }}
                      {...register("lieuVisite")}
                      required
                    />
                  </div>

                  <div className="flex justify-between mb-4">
                    <input
                      className="px-4 py-2 border-solid border-stone-200 border-2 w-[45%]"
                      type="date"
                      {...register("dateDebutVisite")}
                      required
                    />
                    <input
                      className="px-4 py-2 border-solid border-stone-200 border-2 w-[45%]"
                      type="date"
                      {...register("dateFinVisite")}
                      required
                    />
                  </div>
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
          filtre?.map((voiture) => (
            <Card
              className={`${
                getDayDiff(
                  new Date(dayjs(voiture?.dateFinVisite).format("YYYY-MM-DD")),
                  new Date(dayjs(dateNow).format("YYYY-MM-DD"))
                ) <= 10
                  ? " shadow-2xl shadow-red-300"
                  : " bg-white"
              }`}
              key={voiture._id}
              sx={{ minWidth: "30%", height: 320 }}
            >
              <CardContent>
                <div className="flex justify-between">
                  <Typography
                    color="text.secondary"
                    gutterBottom
                    sx={{ marginBottom: 2 }}
                  >
                    <span className="p-2 mr-2 text-sm text-white font-semibold bg-blue-900">
                      Marque
                    </span>
                    {voiture.marque}
                  </Typography>
                  <Typography sx={{ marginBottom: 2 }} color="text.secondary">
                    <span className="p-2 mr-2 text-sm text-white font-semibold bg-blue-900">
                      Status
                    </span>
                    {voiture.status}
                  </Typography>
                </div>

                <Typography sx={{ marginBottom: 2 }} color="text.secondary">
                  <span className="p-2 mr-2 text-sm text-white font-semibold bg-blue-900">
                    Numero Immatriculation
                  </span>
                  {voiture.numeroImma}
                </Typography>
                <Typography sx={{ marginBottom: 2 }} color="text.secondary">
                  <span className="p-2 mr-2 text-sm text-white font-semibold bg-blue-900">
                    Numero Assurence
                  </span>
                  {voiture.NumeroAssurence}
                </Typography>
                <Typography sx={{ marginBottom: 2 }} color="text.secondary">
                  <span className="p-2 mr-2 text-sm text-white font-semibold bg-blue-900">
                    Date Fin Assurence
                  </span>
                  <time>
                    {dayjs(voiture.dateFinAssurence).format("DD-MM-YYYY")}
                  </time>
                </Typography>
                <Typography sx={{ marginBottom: 2 }} color="text.secondary">
                  <span className="p-2 mr-2 text-sm text-white font-semibold bg-blue-900">
                    Numero Visite
                  </span>
                  {voiture.NumeroVisite}
                </Typography>
                <Typography sx={{ marginBottom: 2 }} color="text.secondary">
                  <span className="p-2 mr-2 text-sm text-white font-semibold bg-blue-900">
                    Date Fin Visite
                  </span>
                  <time>
                    {dayjs(voiture.dateFinVisite).format("DD-MM-YYYY")}
                  </time>
                </Typography>
              </CardContent>
              <CardActions className="flex justify-between">
                <div>
                  <Button onClick={() => deleteAuto(voiture._id)} size="small">
                    {deleting ? "Chargement" : "Supprimer"}
                  </Button>
                  <Button onClick={() => passeId(voiture._id)} size="small">
                    Modifier
                  </Button>
                </div>
                <Button onClick={() => passeMoreId(voiture._id)} size="small">
                  Voir plus
                </Button>
              </CardActions>
              {voitureById ? (
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
                          A propos voitures
                        </h2>
                        <div>
                          <div className="flex gap-2 justify-between mb-4">
                            <Typography
                              color="text.secondary"
                              gutterBottom
                              sx={{ marginBottom: 2 }}
                            >
                              <span className="p-2 mr-2 text-sm text-white font-semibold bg-blue-900">
                                Marque
                              </span>
                              {voitureById?.data?.getVoiture?.marque}
                            </Typography>
                            <Typography
                              color="text.secondary"
                              gutterBottom
                              sx={{ marginBottom: 2 }}
                            >
                              <span className="p-2 mr-2 text-sm text-white font-semibold bg-blue-900">
                                Annee Acquisition
                              </span>
                              {voitureById?.data?.getVoiture?.anneeAcqui}
                            </Typography>
                            <Typography
                              color="text.secondary"
                              gutterBottom
                              sx={{ marginBottom: 2 }}
                            >
                              <span className="p-2 mr-2 text-sm text-white font-semibold bg-blue-900">
                                Numero Matriculation
                              </span>
                              {voitureById?.data?.getVoiture?.numeroImma}
                            </Typography>
                          </div>

                          <div className="flex gap-2 justify-between mb-4">
                            <Typography
                              color="text.secondary"
                              gutterBottom
                              sx={{ marginBottom: 2 }}
                            >
                              <span className="p-2 mr-2 text-sm text-white font-semibold bg-blue-900">
                                Numero Serie
                              </span>
                              {voitureById?.data?.getVoiture?.numeroSerie}
                            </Typography>
                            <Typography
                              color="text.secondary"
                              gutterBottom
                              sx={{ marginBottom: 2 }}
                            >
                              <span className="p-2 mr-2 text-sm text-white font-semibold bg-blue-900">
                                Type de Carburant
                              </span>
                              {voitureById?.data?.getVoiture?.typeCarburant}
                            </Typography>
                            <Typography
                              color="text.secondary"
                              gutterBottom
                              sx={{ marginBottom: 2 }}
                            >
                              <span className="p-2 mr-2 text-sm text-white font-semibold bg-blue-900">
                                Consommation
                              </span>
                              {voitureById?.data?.getVoiture?.consommation}L/100
                            </Typography>
                          </div>
                          <Typography
                            color="text.secondary"
                            gutterBottom
                            sx={{ marginBottom: 2 }}
                          >
                            <span className="p-2 mr-2 text-sm text-white font-semibold bg-blue-900">
                              Emplacement
                            </span>
                            {voitureById?.data?.getVoiture?.emplacement}
                          </Typography>
                        </div>
                      </div>
                      <div>
                        <h2 className="text-2xl font-semibold border-b-2 border-solid border-stone-400 mb-4 pb-2">
                          Assurence
                        </h2>
                        <div>
                          <div className="flex gap-2 justify-between">
                            <Typography
                              color="text.secondary"
                              gutterBottom
                              sx={{ marginBottom: 2 }}
                            >
                              <span className="p-2 mr-2 text-sm text-white font-semibold bg-blue-900">
                                Numero Assurence
                              </span>
                              {voitureById?.data?.getVoiture?.NumeroAssurence}
                            </Typography>
                            <Typography
                              color="text.secondary"
                              gutterBottom
                              sx={{ marginBottom: 2 }}
                            >
                              <span className="p-2 mr-2 text-sm text-white font-semibold bg-blue-900">
                                Nom Agence
                              </span>
                              {voitureById?.data?.getVoiture?.NomAgence}
                            </Typography>
                          </div>
                          <div className="flex gap-2 justify-between">
                            <Typography
                              sx={{ marginBottom: 2 }}
                              color="text.secondary"
                            >
                              <span className="p-2 mr-2 text-sm text-white font-semibold bg-blue-900">
                                Date Debut Assurence
                              </span>
                              <time>
                                {dayjs(
                                  voitureById?.data?.getVoiture
                                    ?.dateDebutAssurence
                                ).format("DD-MM-YYYY")}
                              </time>
                            </Typography>
                            <Typography
                              sx={{ marginBottom: 2 }}
                              color="text.secondary"
                            >
                              <span className="p-2 mr-2 text-sm text-white font-semibold bg-blue-900">
                                Date Fin Assurence
                              </span>
                              <time>
                                {dayjs(
                                  voitureById?.data?.getVoiture
                                    ?.dateFinAssurence
                                ).format("DD-MM-YYYY")}
                              </time>
                            </Typography>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h2 className="text-2xl font-semibold border-b-2 border-solid border-stone-400 mb-4 pb-2">
                          Visite Technique
                        </h2>
                        <div>
                          <div className="flex gap-2 justify-between">
                            <Typography
                              color="text.secondary"
                              gutterBottom
                              sx={{ marginBottom: 2 }}
                            >
                              <span className="p-2 mr-2 text-sm text-white font-semibold bg-blue-900">
                                Numero Visite
                              </span>
                              {voitureById?.data?.getVoiture?.NumeroVisite}
                            </Typography>
                            <Typography
                              color="text.secondary"
                              gutterBottom
                              sx={{ marginBottom: 2 }}
                            >
                              <span className="p-2 mr-2 text-sm text-white font-semibold bg-blue-900">
                                Lieu de visite
                              </span>
                              {voitureById?.data?.getVoiture?.lieuVisite}
                            </Typography>
                          </div>
                          <div className="flex gap-2 justify-between">
                            <Typography
                              sx={{ marginBottom: 2 }}
                              color="text.secondary"
                            >
                              <span className="p-2 mr-2 text-sm text-white font-semibold bg-blue-900">
                                Date Debut Visite
                              </span>
                              <time>
                                {dayjs(
                                  voitureById?.data?.getVoiture?.dateDebutVisite
                                ).format("DD-MM-YYYY")}
                              </time>
                            </Typography>
                            <Typography
                              sx={{ marginBottom: 2 }}
                              color="text.secondary"
                            >
                              <span
                                className={`${
                                  getDayDiff(
                                    new Date(
                                      dayjs(
                                        voitureById?.data?.getVoiture
                                          ?.dateFinVisite
                                      ).format("YYYY-MM-DD")
                                    ),
                                    new Date(
                                      dayjs(dateNow).format("YYYY-MM-DD")
                                    )
                                  ) == 1
                                    ? "p-2 mr-2 text-sm text-white font-semibold bg-red-500"
                                    : "p-2 mr-2 text-sm text-white font-semibold bg-blue-900"
                                }  `}
                              >
                                Date Fin Visite
                              </span>
                              <time>
                                {dayjs(
                                  voitureById?.data?.getVoiture?.dateFinVisite
                                ).format("DD-MM-YYYY")}
                              </time>
                            </Typography>
                          </div>
                        </div>
                      </div>
                    </Box>
                  </Fade>
                </Modal>
              ) : null}
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Voiture;

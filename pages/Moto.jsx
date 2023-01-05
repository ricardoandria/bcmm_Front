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
import { parseISO, format } from "date-fns";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import NativeSelect from "@mui/material/NativeSelect";
import { useForm } from "react-hook-form";
import {
  updateMoto,
  useAddMotos,
  useDeleteMoto,
  useGetMoto,
  useGetMotoById,
} from "../Network/Moto/hooks";

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

const Moto = () => {
  const [open, setOpen] = React.useState(false);
  const [id, setId] = useState("");
  const [openMore, setOpenMore] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { mutate: addMoto } = useAddMotos();
  const { mutate: deleteMoto, isLoading: deleting } = useDeleteMoto();
  const { mutate: updateMotos, isLoading: updating } = updateMoto(id);
  const { data, isLoading } = useGetMoto();
  const { data: moto } = useGetMotoById(id);

  const { register, handleSubmit, setValue } = useForm();

  const [dateNow, setDateNow] = useState(new Date());

  useEffect(() => {
    setValue("marque", moto?.data.getMoto?.marque);
    setValue("anneeAcqui", moto?.data.getMoto?.anneeAcqui);
    setValue("numeroImma", moto?.data.getMoto?.numeroImma);
    setValue("numeroSerie", moto?.data.getMoto?.numeroSerie);
    setValue("typeCarburant", moto?.data.getMoto?.typeCarburant);
    setValue("consommation", moto?.data.getMoto?.consommation);
    setValue("emplacement", moto?.data.getMoto?.emplacement);
    setValue("status", moto?.data.getMoto?.status);
    setValue("NumeroAssurence", moto?.data.getMoto?.NumeroAssurence);
    setValue("NomAgence", moto?.data.getMoto?.NomAgence);
    setValue("dateDebutAssurence", moto?.data.getMoto?.dateDebutAssurence);
    setValue("dateFinAssurence", moto?.data.getMoto?.dateFinAssurence);
    setValue("NumeroVisite", moto?.data.getMoto?.dateFinAssurence);
    setValue("lieuVisite", moto?.data.getMoto?.dateFinAssurence);
    setValue("dateDebutVisite", moto?.data.getMoto?.dateFinAssurence);
    setValue("dateFinVisite", moto?.data.getMoto?.dateFinAssurence);
  }, [id, moto]);

  const handleSubmitData = (values) => {
    addMoto(values, {
      onSuccess() {
        setOpen(false);
      },
    });
  };
  const handleUpdateData = (values) => {
    updateMotos(values, {
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
    setOpenMore(id);

    return setId(id);
  };

  const hanleCloseMore = () => {
    setOpenMore(false);
    setId("");
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
                    placeholder="Marque"
                    name="marque"
                    variant="outlined"
                    sx={{ width: "45%" }}
                    {...register("marque")}
                  />
                  <TextField
                    id="outlined-basic"
                    placeholder="Annee Acquisition"
                    variant="outlined"
                    sx={{ width: "45%" }}
                    {...register("anneeAcqui")}
                  />
                </div>
                <div className=" flex justify-between mb-4">
                  <TextField
                    id="outlined-basic"
                    placeholder="Numero de Immatriculation"
                    variant="outlined"
                    sx={{ width: "45%" }}
                    {...register("numeroImma")}
                  />
                  <TextField
                    id="outlined-basic"
                    placeholder="Numero de serie"
                    variant="outlined"
                    sx={{ width: "45%" }}
                    {...register("numeroSerie")}
                  />
                </div>
                <div className=" flex justify-between mb-4">
                  <TextField
                    id="outlined-basic"
                    placeholder="Type de carburant"
                    variant="outlined"
                    sx={{ width: "45%" }}
                    {...register("typeCarburant")}
                  />
                  <TextField
                    id="outlined-basic"
                    placeholder="Consommation"
                    variant="outlined"
                    sx={{ width: "45%" }}
                    {...register("consommation")}
                  />
                </div>
                <div className=" flex justify-between mb-4">
                  <TextField
                    id="outlined-basic"
                    placeholder="Emplacement"
                    variant="outlined"
                    sx={{ width: "45%" }}
                    {...register("emplacement")}
                  />
                  <div style={{ width: "45%" }}>
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
                    />
                    <TextField
                      id="outlined-basic"
                      placeholder="Nom Agence"
                      variant="outlined"
                      sx={{ width: "45%" }}
                      {...register("NomAgence")}
                    />
                  </div>

                  <div className="flex justify-between mb-4">
                    <input
                      className="px-4 py-2 border-solid border-stone-200 border-2 w-[45%]"
                      type="date"
                      {...register("dateDebutAssurence")}
                    />
                    <input
                      className="px-4 py-2 border-solid border-stone-200 border-2 w-[45%]"
                      type="date"
                      {...register("dateFinAssurence")}
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
                    />
                    <TextField
                      id="outlined-basic"
                      placeholder="Lieu visite"
                      variant="outlined"
                      sx={{ width: "45%" }}
                      {...register("lieuVisite")}
                    />
                  </div>

                  <div className="flex justify-between mb-4">
                    <input
                      className="px-4 py-2 border-solid border-stone-200 border-2 w-[45%]"
                      type="date"
                      {...register("dateDebutVisite")}
                    />
                    <input
                      className="px-4 py-2 border-solid border-stone-200 border-2 w-[45%]"
                      type="date"
                      {...register("dateFinVisite")}
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
          data?.getMotos.map((moto) => (
            <Card key={moto._id} sx={{ minWidth: "30%", height: 320 }}>
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
                    {moto.marque}
                  </Typography>
                  <Typography sx={{ marginBottom: 2 }} color="text.secondary">
                    <span className="p-2 mr-2 text-sm text-white font-semibold bg-blue-900">
                      Status
                    </span>
                    {moto.status}
                  </Typography>
                </div>

                <Typography sx={{ marginBottom: 2 }} color="text.secondary">
                  <span className="p-2 mr-2 text-sm text-white font-semibold bg-blue-900">
                    Numero Immatriculation
                  </span>
                  {moto.numeroImma}
                </Typography>
                <Typography sx={{ marginBottom: 2 }} color="text.secondary">
                  <span className="p-2 mr-2 text-sm text-white font-semibold bg-blue-900">
                    Numero Assurence
                  </span>
                  {moto.NumeroAssurence}
                </Typography>
                <Typography sx={{ marginBottom: 2 }} color="text.secondary">
                  <span className="p-2 mr-2 text-sm text-white font-semibold bg-blue-900">
                    Date Fin Assurence
                  </span>
                  <time>
                    {format(parseISO(moto.dateFinAssurence), "LLLL d, yyyy")}
                  </time>
                </Typography>
                <Typography sx={{ marginBottom: 2 }} color="text.secondary">
                  <span className="p-2 mr-2 text-sm text-white font-semibold bg-blue-900">
                    Numero Visite
                  </span>
                  {moto.NumeroVisite}
                </Typography>
                <Typography sx={{ marginBottom: 2 }} color="text.secondary">
                  <span className="p-2 mr-2 text-sm text-white font-semibold bg-blue-900">
                    Date Fin Visite
                  </span>
                  <time>
                    {format(parseISO(moto.dateFinVisite), "LLLL d, yyyy")}
                  </time>
                </Typography>
              </CardContent>
              <CardActions className="flex justify-between ">
                <div>
                  <Button onClick={() => deleteMoto(moto._id)} size="small">
                    {deleting ? "Chargement" : "Supprimer"}
                  </Button>
                  <Button onClick={() => passeId(moto._id)} size="small">
                    Modifier
                  </Button>
                </div>

                <Button onClick={() => passeMoreId(moto._id)} size="small">
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
                        A propos Moto
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
                            {moto.marque}
                          </Typography>
                          <Typography
                            color="text.secondary"
                            gutterBottom
                            sx={{ marginBottom: 2 }}
                          >
                            <span className="p-2 mr-2 text-sm text-white font-semibold bg-blue-900">
                              Annee Acquisition
                            </span>
                            {moto.anneeAcqui}
                          </Typography>
                          <Typography
                            color="text.secondary"
                            gutterBottom
                            sx={{ marginBottom: 2 }}
                          >
                            <span className="p-2 mr-2 text-sm text-white font-semibold bg-blue-900">
                              Numero Matriculation
                            </span>
                            {moto.numeroImma}
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
                            {moto.numeroSerie}
                          </Typography>
                          <Typography
                            color="text.secondary"
                            gutterBottom
                            sx={{ marginBottom: 2 }}
                          >
                            <span className="p-2 mr-2 text-sm text-white font-semibold bg-blue-900">
                              Type de Carburant
                            </span>
                            {moto.typeCarburant}
                          </Typography>
                          <Typography
                            color="text.secondary"
                            gutterBottom
                            sx={{ marginBottom: 2 }}
                          >
                            <span className="p-2 mr-2 text-sm text-white font-semibold bg-blue-900">
                              Consommation
                            </span>
                            {moto.consommation}L/100
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
                          {moto.emplacement}
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
                            {moto.NumeroAssurence}
                          </Typography>
                          <Typography
                            color="text.secondary"
                            gutterBottom
                            sx={{ marginBottom: 2 }}
                          >
                            <span className="p-2 mr-2 text-sm text-white font-semibold bg-blue-900">
                              Nom Agence
                            </span>
                            {moto.NomAgence}
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
                              {format(
                                parseISO(moto.dateDebutAssurence),
                                "LLLL d, yyyy"
                              )}
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
                              {format(
                                parseISO(moto.dateFinAssurence),
                                "LLLL d, yyyy"
                              )}
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
                            {moto.NumeroVisite}
                          </Typography>
                          <Typography
                            color="text.secondary"
                            gutterBottom
                            sx={{ marginBottom: 2 }}
                          >
                            <span className="p-2 mr-2 text-sm text-white font-semibold bg-blue-900">
                              Lieu de visite
                            </span>
                            {moto.lieuVisite}
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
                              {format(
                                parseISO(moto.dateDebutVisite),
                                "LLLL d, yyyy"
                              )}
                            </time>
                          </Typography>
                          <Typography
                            sx={{ marginBottom: 2 }}
                            color="text.secondary"
                          >
                            <span
                              className={`
                                ${
                                  format(
                                    parseISO(moto.dateFinVisite),
                                    "LLLL d, yyyy"
                                  ) > dateNow.getTime()
                                    ? "p-2 mr-2 text-sm text-white font-semibold bg-red-500"
                                    : "p-2 mr-2 text-sm text-white font-semibold bg-blue-900"
                                } 
                                  
                              `}
                            >
                              Date Fin Visite
                            </span>
                            <time>
                              {format(
                                parseISO(moto.dateFinVisite),
                                "LLLL d, yyyy"
                              )}
                            </time>
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

export default Moto;

import React, { useState } from "react";
import {
  Button,
  FormControl,
  IconButton,
  MenuItem,
  Popover,
  Select,
} from "@material-ui/core";
import Overlay from "./Overlay";
import Image from "./img_svg/upload.svg";
import { Alert } from "@material-ui/lab";
import AssignmentIcon from "@material-ui/icons/Assignment";
import CloseIcon from "@material-ui/icons/Close";
import InfoIcon from "@material-ui/icons/Info";

const CallUpPopUp = ({
  overlayNumber,
  overlayClick,
  closeModal,
  successRedirection,
}) => {
  const [firstTargets, setFirstTargets] = useState({
    first_last: "",
    phonenumber: "",
  });

  const [anchorEl, setAnchorEl] = useState(null);
  const [secondAnchorEl, setSecondAnchorEl] = useState(null);

  const [imageUpload, setImageUploader] = useState([]);
  const [secondImageUpload, setSecondImageUploader] = useState([]);
  const [successMessage, setSuccessMessage] = useState({
    first_message: "",
    last_message: "",
  });

  const [secondTargets, setSecondTargets] = useState({
    first_last: "",
    email: "",
    address: "",
    textarea: "",
  });

  const [thirdTargets, setThirdtargets] = useState({
    first_last: "",
    email: "",
    address: "",
    textarea: "",
  });

  const [options, setOptions] = useState("Hus");

  const [errorMessages, setErrorMessages] = useState({
    firstError: "",
    secondError: "",
    thirdError: "",
  });

  const firstTargetsOnchange = (e) => {
    setFirstTargets({ ...firstTargets, [e.target.name]: e.target.value });
  };

  const firstFormSubmit = (e) => {
    e.preventDefault();
    if (!firstTargets.first_last || !firstTargets.phonenumber) {
      setErrorMessages({
        ...errorMessages,
        firstError: "Feltet må ikke være tomt",
      });
    } else {
      setFirstTargets({
        ...firstTargets,
        first_last: "",
        phonenumber: "",
      });
      setErrorMessages({
        ...errorMessages,
        firstError: "",
        secondError: "",
        thirdError: "",
      });
      successRedirection();
    }
  };

  const formSubmitTwo = (e) => {
    e.preventDefault();

    if (
      !secondTargets.first_last ||
      !secondTargets.email ||
      !secondTargets.address ||
      !secondTargets.textarea
    ) {
      setErrorMessages({
        ...errorMessages,
        firstError: "",
        secondError: "Feltet må ikke være tomt",
        thirdError: "",
      });
    } else {
      setImageUploader([]);
      setSecondTargets({
        ...secondTargets,
        first_last: "",
        email: "",
        address: "",
        textarea: "",
      });
      setErrorMessages({
        ...errorMessages,
        firstError: "",
        secondError: "",
        thirdError: "",
      });
      setSuccessMessage({
        ...successMessage,
        first_message: "Tak! - Vi vil vende tilbage hurtigst muligt!",
        last_message: "",
      });
    }
  };

  const onChangeSecondValue = (e) => {
    setSecondTargets({ ...secondTargets, [e.target.name]: e.target.value });
  };

  const fileChanger = (e) => {
    const size = Array.from(e.target.files).map((item) => item.size);
    const names = Array.from(e.target.files).map((item) => ({
      id: Math.random() + 1,
      name: item.name,
    }));

    for (let i = 0; i < e.target.files.length; i++) {
      const file = e.target.files[i];
      if (!file?.name.match(/\.(jpg|jpeg|png|pptx|pdf|docx|)$/)) {
        setErrorMessages({
          ...errorMessages,
          firstError: "",
          secondError: "Upload venligst kun ‘.pdf, .png, .jpg, .pptx’ filer",
          thirdError: "",
        });
        setImageUploader([]);
      } else {
        const sizeOfFiles = size?.reduce((accumulator, currentValue) => {
          return accumulator + currentValue;
        }, 0);
        if (sizeOfFiles > 50097152) {
          setErrorMessages({
            ...errorMessages,
            firstError: "",
            secondError:
              "Filen fylder for meget. Prøv evt. send en direkte mail",
            thirdError: "",
          });
        } else {
          setErrorMessages({
            ...errorMessages,
            firstError: "",
            secondError: "",
            thirdError: "",
          });
          setImageUploader(names);
        }
      }
    }
  };

  const deleteArrayId = (id) => {
    setImageUploader(imageUpload.filter((item) => item.id !== id));
  };

  const deleteArrayIdSecond = (id) => {
    setSecondImageUploader(secondImageUpload.filter((item) => item.id !== id));
  };

  const targetValueDropDown = (e) => {
    setOptions(e.target.value);
  };

  const onChangeThirdTargets = (e) => {
    setThirdtargets({ ...thirdTargets, [e.target.name]: e.target.value });
  };

  const onFormSubmitThird = (e) => {
    e.preventDefault();
    if (
      !thirdTargets.first_last ||
      !thirdTargets.email ||
      !thirdTargets.address ||
      !thirdTargets.textarea
    ) {
      setErrorMessages({
        ...errorMessages,
        firstError: "",
        secondError: "",
        thirdError: "Feltet må ikke være tomt",
      });
    } else {
      setSecondImageUploader([]);
      setThirdtargets({
        ...thirdTargets,
        first_last: "",
        email: "",
        address: "",
        textarea: "",
      });
      setErrorMessages({
        ...errorMessages,
        firstError: "",
        secondError: "",
        thirdError: "",
      });
      setSuccessMessage({
        ...successMessage,
        first_message: "",
        last_message: "Tak! - Vi vil vende tilbage hurtigst muligt!",
      });
    }
  };

  const fileChangerSecond = (e) => {
    const size = Array.from(e.target.files).map((item) => item.size);
    const names = Array.from(e.target.files).map((item) => ({
      id: Math.random() + 1,
      name: item.name,
    }));

    for (let i = 0; i < e.target.files.length; i++) {
      const file = e.target.files[i];
      if (!file?.name.match(/\.(jpg|jpeg|png|pptx|pdf|docx|)$/)) {
        setErrorMessages({
          ...errorMessages,
          firstError: "",
          secondError: "",
          thirdError: "Upload venligst kun ‘.pdf, .png, .jpg, .pptx’ filer",
        });
        setSecondImageUploader([]);
      } else {
        const sizeOfFiles = size?.reduce((accumulator, currentValue) => {
          return accumulator + currentValue;
        }, 0);
        if (sizeOfFiles > 50097152) {
          setErrorMessages({
            ...errorMessages,
            firstError: "",
            secondError: "",
            thirdError:
              "Filen fylder for meget. Prøv evt. send en direkte mail",
          });
        } else {
          setErrorMessages({
            ...errorMessages,
            firstError: "",
            secondError: "",
            thirdError: "",
          });
          setSecondImageUploader(names);
        }
      }
    }
  };

  const handlePopOverFirst = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handlePopOverClose = () => {
    setAnchorEl(null);
  };

  const handlePopOverSecond = (e) => {
    setSecondAnchorEl(e.currentTarget);
  };

  const handlePopOverSecondClose = () => {
    setSecondAnchorEl(null);
  };

  const open_first = Boolean(anchorEl);
  const open_second = Boolean(secondAnchorEl);

  return (
    <div className="CallUpPopUp">
      <Overlay overlayClick={overlayClick} />
      {overlayNumber === 1 && (
        <div className="CallUpPopUp__Contain">
          <form onSubmit={firstFormSubmit}>
            <p>
              Udfyld felterne forneden så bliver du ringet op inden for 24
              timer.
            </p>
            <input
              type="name"
              name="first_last"
              placeholder="For- og efternavn"
              value={firstTargets.first_last}
              onChange={firstTargetsOnchange}
            />
            <input
              value={firstTargets.phonenumber}
              onChange={firstTargetsOnchange}
              type="phone"
              name="phonenumber"
              placeholder="Telefonnummer"
            />
            {errorMessages.firstError && (
              <Alert
                severity="error"
                style={{ width: "100%", margin: "10px 0" }}
              >
                {errorMessages.firstError}
              </Alert>
            )}
            <Button type="submit">Ring mig opp</Button>
          </form>
        </div>
      )}

      {overlayNumber === 2 && (
        <div className="CallUpPopUp__Tilbud">
          <form onSubmit={formSubmitTwo}>
            <div className="CallUpPop__InputsParagraph">
              <p className="TilbudParagraph">
                Anmod om tilbud - Nedrivning af væg
              </p>
              <input
                type="first_last"
                name="first_last"
                placeholder="For- og efternavn"
                value={secondTargets.first_last}
                onChange={onChangeSecondValue}
              />
              <input
                type="email"
                name="email"
                placeholder="E-mail adresse"
                value={secondTargets.email}
                onChange={onChangeSecondValue}
              />
              <input
                type="Address"
                name="address"
                placeholder="Adresse, (vej, nr, evt. etage, postnr., by)"
                value={secondTargets.address}
                onChange={onChangeSecondValue}
              />
              <textarea
                name="textarea"
                placeholder="Beskrivelse af projekt"
                value={secondTargets.textarea}
                onChange={onChangeSecondValue}
              />
            </div>

            <div className="CallUpPop__Image">
              <input type="file" onChange={fileChanger} multiple />
              <p>Upload dine filer her! Klik her</p>
              <img src={Image} alt="upload" />
            </div>

            <div className="CallUpPop__ImageCheckBoxes">
              <div className="Label">
                <input type="checkbox" id="one" name="one" />
                <label htmlFor="one">
                  Byggesagsansøgning&nbsp;
                  <b>(+850 kr.)</b>
                </label>

                <InfoIcon
                  onClick={handlePopOverFirst}
                  aria-owns={open_first ? "mouse-over-popover" : undefined}
                />
                <Popover
                  id="mouse-over-popover"
                  open={open_first}
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  onClose={handlePopOverClose}
                  style={{
                    textAlign: "center",
                    padding: "0 25px",
                  }}
                >
                  <div style={{ background: "#1a0f37", maxWidth: "250px" }}>
                    <p
                      style={{
                        padding: "10px",
                        fontFamily: "Titillium Web",
                        color: "#fff",
                        fontWeight: 500,
                        fontSize: "13px",
                      }}
                      className="PopOverText"
                    >
                      Vi hjelper med i opprettelse og afslutning af byggesag
                      stilladelsen hos kommunen.
                    </p>
                  </div>
                </Popover>
              </div>
              <div className="Label two">
                <input type="checkbox" id="two" name="two" />
                <label htmlFor="two">
                  Hasteopgave&nbsp; <b>(+1200 kr.)</b>
                </label>
                <InfoIcon
                  onClick={handlePopOverSecond}
                  aria-owns={open_first ? "mouse-over-popover" : undefined}
                />

                <Popover
                  id="mouse-over-popover"
                  open={open_second}
                  anchorEl={secondAnchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  onClose={handlePopOverSecondClose}
                  style={{
                    textAlign: "center",
                    padding: "0 25px",
                  }}
                >
                  <div style={{ background: "#1a0f37" }}>
                    <p
                      style={{
                        padding: "10px",
                        fontFamily: "Titillium Web",
                        color: "#fff",
                        fontWeight: 500,
                        fontSize: "13px",
                        maxWidth: "250px",
                      }}
                      className="PopOverText"
                    >
                      Leveringen inden for 48 timer
                    </p>
                  </div>
                </Popover>
              </div>
            </div>

            <div className="CallUpPop__Dropdown">
              <FormControl className="FormControl">
                <Select
                  labelId="demo-customized-select-label"
                  id="demo-customized-select"
                  variant="outlined"
                  value={options}
                  onChange={targetValueDropDown}
                >
                  <MenuItem value="Hus">Hus</MenuItem>
                  <MenuItem value="Lejlighed (Pakke 1)">
                    Lejlighed (Pakke 1)
                  </MenuItem>
                  <MenuItem value="Lejlighed (Pakke 2)">
                    Lejlighed (Pakke 2)
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
            {errorMessages?.secondError && (
              <Alert
                severity="error"
                style={{ width: "100%", margin: "10px 0" }}
              >
                {errorMessages?.secondError}
              </Alert>
            )}

            {successMessage.first_message && (
              <Alert
                severity="success"
                style={{ width: "100%", margin: "10px 0" }}
              >
                {successMessage.first_message}
              </Alert>
            )}

            {imageUpload.map(({ id, name }) => (
              <div key={id} className="imageUploader">
                <div className="ImageUploader__Result">
                  <AssignmentIcon className="Assignment" />
                  <p>{name}</p>
                  <IconButton onClick={() => deleteArrayId(id)}>
                    <CloseIcon />
                  </IconButton>
                </div>
              </div>
            ))}

            <div className="CallUpPopUp__Buttons">
              <Button type="submit">Anmod om gratis tilbud</Button>
              <Button className="Annuller" onClick={closeModal}>
                Annuller
              </Button>
            </div>
          </form>
        </div>
      )}

      {overlayNumber === 3 && (
        <div className="CallUpPopUp__AnmodTilbudTwo">
          <form onSubmit={onFormSubmitThird}>
            <div className="CallUpPop__InputsParagraph">
              <p className="TilbudParagraph">
                Anmod om tilbud - Nedrivning af væg
              </p>
              <input
                value={thirdTargets.first_last}
                onChange={onChangeThirdTargets}
                type="first_last"
                name="first_last"
                placeholder="For- og efternavn"
              />
              <input
                value={thirdTargets.email}
                onChange={onChangeThirdTargets}
                type="email"
                name="email"
                placeholder="E-mail adresse"
              />
              <input
                value={thirdTargets.address}
                type="Address"
                name="address"
                onChange={onChangeThirdTargets}
                placeholder="Adresse, (vej, nr, evt. etage, postnr., by)"
              />
              <textarea
                name="textarea"
                value={thirdTargets.textarea}
                onChange={onChangeThirdTargets}
                placeholder="Beskrivelse af projekt"
              />
            </div>

            {secondImageUpload.map(({ id, name }) => (
              <div key={id} className="imageUploader">
                <div className="ImageUploader__Result">
                  <AssignmentIcon className="Assignment" />
                  <p>{name}</p>
                  <IconButton onClick={() => deleteArrayIdSecond(id)}>
                    <CloseIcon />
                  </IconButton>
                </div>
              </div>
            ))}

            <div className="CallUpPop__Image">
              <input
                type="file"
                multiple
                id="file"
                onChange={fileChangerSecond}
              />
              <p>Upload dine filer her! Klik her</p>
              <img src={Image} alt="upload" />
            </div>
            {errorMessages?.thirdError && (
              <Alert
                severity="error"
                style={{ width: "100%", marginTop: "20px" }}
              >
                {errorMessages?.thirdError}
              </Alert>
            )}

            {successMessage.last_message && (
              <Alert
                severity="success"
                style={{ width: "100%", marginTop: "25px" }}
              >
                {successMessage.last_message}
              </Alert>
            )}
            <div className="CallUpPopUp__Buttons">
              <Button type="submit">Anmod om gratis tilbud</Button>
              <Button className="Annuller" onClick={closeModal}>
                Annuller
              </Button>
            </div>
          </form>
        </div>
      )}

      {overlayNumber === 4 && (
        <div className="CallUpPopUp__ThanksMessage">
          <p>Tak for din registrering - vi ringer dig op hurtigst muligt!</p>
          <Button onClick={closeModal}>OK! - Gå tibage</Button>
        </div>
      )}
    </div>
  );
};

export default CallUpPopUp;

import React, { Fragment, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Container,
  Grid,
  IconButton,
  Step,
  StepLabel,
  Stepper,
  useMediaQuery,
} from "@material-ui/core";
import tpStar from "./img_svg/tp-stars.png";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import CheckSharpIcon from "@material-ui/icons/CheckSharp";
import emailImage from "./img_svg/mail.svg";
import moneyHand from "./img_svg/savemoney.png";
import saveTime from "./img_svg/clock.svg";
import fileImage from "./img_svg/upload.svg";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { Link } from "react-scroll";
import { Alert } from "@material-ui/lab";
import AssignmentIcon from "@material-ui/icons/Assignment";
import CancelIcon from "@material-ui/icons/Cancel";
import CallUpPopUp from "./CallUpPopUp";

const HomePage = () => {
  const [expanded, setExpanded] = useState(false);
  const [targets, setTargets] = useState({
    name: "",
    email: "",
    textarea: "",
  });
  const [imageFile, setImageFile] = useState([]);
  const [fileLoader, setFileLoader] = useState(false);
  const [failed, setFailed] = useState("");
  const [success, setSuccess] = useState("");
  const [modal, setModal] = useState(false);
  const [overlayNumber, setOverlayNumber] = useState(0);

  const thousandPixels = useMediaQuery("(max-width:959px)");

  const handleChange = (panel) => {
    setExpanded(panel === expanded ? false : panel);
  };

  const onChangeTargets = (e) => {
    setTargets({ ...targets, [e.target.name]: e.target.value });
    setFailed("");
    setSuccess("");
  };

  const onChangeImageFile = (e) => {
    setFileLoader(true);

    const size = Array.from(e.target.files).map((item) => item.size);
    const names = Array.from(e.target.files).map((item) => ({
      id: Math.random() + 1,
      name: item.name,
    }));

    for (let i = 0; i < e.target.files.length; i++) {
      const file = e.target.files[i];
      if (!file?.name.match(/\.(jpg|jpeg|png|pptx|pdf|docx|)$/)) {
        setFailed("Upload venligst kun ‘.pdf, .png, .jpg, .pptx’ filer");
        setImageFile([]);
        setFileLoader(false);
      } else {
        const sizeOfFiles = size?.reduce((accumulator, currentValue) => {
          return accumulator + currentValue;
        }, 0);
        if (sizeOfFiles > 50097152) {
          setFailed("Filen fylder for meget. Prøv evt. send en direkte mail");
          setFileLoader(false);
        } else {
          setFailed("");
          setImageFile(names);
          setFileLoader(false);
        }
      }
    }
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.files);
    if (!targets.name || !targets.email || !targets.textarea) {
      setFailed("Feltet må ikke være tomt");
    } else {
      setFailed("");
      setImageFile(null);
      setSuccess("Tak! Vi vil vende tilbage hurtigst muligt");
    }
  };

  const deleteFile = (id_document) => {
    setImageFile(imageFile.filter((file) => file.id !== id_document));
  };

  const functionOverlayNumberOne = () => {
    setModal(true);
    setOverlayNumber(1);
  };

  const overlayPakke = () => {
    setModal(true);
    setOverlayNumber(2);
  };

  const registerPakke = () => {
    setModal(true);
    setOverlayNumber(3);
  };

  const closeModal = () => {
    setModal(false);
    setOverlayNumber(0);
  };

  const successModal = () => {
    setModal(true);
    setOverlayNumber(4);
  };

  return (
    <div className="HomePage">
      {modal && (
        <CallUpPopUp
          overlayNumber={overlayNumber}
          overlayClick={() => setModal(false)}
          closeModal={closeModal}
          successRedirection={successModal}
        />
      )}
      <div className="HomePage__Header" id="Home">
        <Container>
          <Grid
            container
            direction="row"
            justify={thousandPixels ? "center" : "flex-start"}
            alignItems={thousandPixels ? "center" : "flex-start"}
            spacing={0}
          >
            <Grid
              item
              container
              justify={thousandPixels ? "center" : "flex-start"}
              alignItems={thousandPixels ? "center" : "flex-start"}
              sm={12}
              md={8}
              lg={7}
            >
              <div className="HomePage_HelpSection">
                <h3>Vi hjælper dit byggeprojekt med Statiske beregninger</h3>
                <p>
                  Ønsker du at lave ændringer i de bærende konstruktioner i din
                  lejlighed eller dit hus kan vi tilbyde et ingeniørprojekt, der
                  indebærer statiske beregninger til kommunen og tilhørende
                  arbejdstegninger til din håndværker.
                </p>
              </div>
            </Grid>
            <Grid
              item
              container
              justify={thousandPixels ? "center" : "flex-end"}
              alignItems={thousandPixels ? "center" : "flex-start"}
              sm={12}
              md={4}
              lg={5}
            >
              <div
                className="HomePage__ButtonSection"
                style={
                  thousandPixels
                    ? { flexDirection: "column", width: "100%" }
                    : {}
                }
              >
                <Link
                  activeClass="true"
                  to="Home"
                  spy={true}
                  offset={-100}
                  smooth={true}
                  duration={1250}
                  style={{ background: "100%", padding: "0", margin: "0" }}
                >
                  <Button
                    className="HomePage__CallUpButton"
                    style={
                      thousandPixels ? { marginTop: "35px", width: "100%" } : {}
                    }
                    onClick={functionOverlayNumberOne}
                  >
                    Bliv ringet op
                  </Button>
                </Link>

                <Link
                  activeClass="true"
                  to="Contact"
                  spy={true}
                  offset={-275}
                  smooth={true}
                  duration={1250}
                  style={{ background: "100%", padding: "0", margin: "0" }}
                >
                  <Button
                    className="HomePage__ContactButton"
                    style={
                      thousandPixels ? { width: "100%", marginTop: "25px" } : {}
                    }
                  >
                    Kontakt os
                  </Button>
                </Link>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
      <Container className="HomePage__Container">
        <div className="HomePage__Stars">
          <p>
            Vi har hjulpet hundredvis af boligejere med statiske beregninger til
            deres renoveringsprojekter, herunder nedrivning af bærende vægge,
            tilbygninger til eksisterende hus, etablering af badeværelser eller
            tagkviste mv.
          </p>
        </div>
        <div className="HomePage__StarsIcon">
          <img src={tpStar} alt="tpStar" />
        </div>
        <div className="HomePage__Anmeldelser">
          <a href="https://dk.trustpilot.com/review/www.engarch.dk">
            Se vores anmeldelser på
          </a>
        </div>
      </Container>
      <div className="HomePage__Ytelser">
        <Container className="HomePage__ContainerYtelse">
          <div className="HomePage__YtelserTitle" id="Ydelser">
            <h1>YDELSER</h1>
          </div>
          <div className="HomePage__YtelserContainers">
            <Grid
              container
              justify="flex-start"
              alignItems="center"
              spacing={4}
            >
              <Grid item lg={6} md={12} sm={12} xs={12}>
                <Link
                  activeClass="true"
                  to="Nedrivning"
                  spy={true}
                  offset={-100}
                  smooth={true}
                  duration={1250}
                >
                  <div className="HomePage__YtelseDiv active">
                    <h2>NEDRIVNING AF BÆRENDE VÆG</h2>
                  </div>
                </Link>
              </Grid>
              <Grid item lg={6} md={12} sm={12} xs={12}>
                <Link
                  activeClass="true"
                  to="Tilbygning"
                  spy={true}
                  offset={-100}
                  smooth={true}
                  duration={1250}
                >
                  <div className="HomePage__YtelseDiv">
                    <h2>TILBYGNING TIL EKSISTERENDE HUS</h2>
                    <ArrowForwardIosIcon />
                  </div>
                </Link>
              </Grid>
              <Grid item lg={6} md={12} sm={12} xs={12}>
                <Link
                  activeClass="true"
                  to="badeværelse"
                  spy={true}
                  offset={-100}
                  smooth={true}
                  duration={1250}
                >
                  <div className="HomePage__YtelseDiv">
                    <h2>ETABLERING AF BADEVÆRELSE</h2>
                    <ArrowForwardIosIcon />
                  </div>
                </Link>
              </Grid>
              <Grid item lg={6} md={12} sm={12} xs={12}>
                <Link
                  activeClass="true"
                  to="Nythus"
                  spy={true}
                  offset={-100}
                  smooth={true}
                  duration={1250}
                >
                  <div className="HomePage__YtelseDiv">
                    <h2>NYT HUS</h2>
                    <ArrowForwardIosIcon />
                  </div>
                </Link>
              </Grid>
              <Grid item lg={6} md={12} sm={12} xs={12}>
                <Link
                  activeClass="true"
                  to="AndreYdelser"
                  spy={true}
                  offset={-150}
                  smooth={true}
                  duration={1250}
                >
                  <div className="HomePage__YtelseDiv">
                    <h2>ANDRE YDELSER</h2>
                    <ArrowForwardIosIcon />
                  </div>
                </Link>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
      <div className="HomePage__Prices" id="Nedrivning">
        <div className="HomePage__PricesTitleBackground">
          <Container>
            <div className="HomePage__PricesTitle">
              <div className="HomePage__TitlePrice">
                <h2>Statiske beregninger - Nedrivning af bærende væg</h2>
              </div>
              <p>
                Ønsker du at udvide et dørhul eller fjerne en bærende væg, så
                kræver det, at der udarbejdes statiske beregninger inden
                arbejdet kan gå igang. De statiske beregninger er samtidig også
                en del af dokumentation til en evt.
                <a href="*">byggetilladelse</a> hos kommunen. Vi kan også hjælpe
                med at søge om byggetilladelsen for dig. Du skal blot markere
                dette når du anmoder om et tilbud. Læs mere om
                <a href="*">bærende vægge.</a>
              </p>
            </div>
          </Container>
        </div>

        <Container>
          <div className="HomePage__PricesChoices">
            <Grid container justify="center" alignItems="stretch" spacing={5}>
              <Grid item lg={4} md={4} sm={12}>
                <div className="HomePage__PricesDiv">
                  <h2>HUS</h2>
                  <h1>4900</h1>
                  <p className="HomePage__moms">kr.inkl.moms</p>
                  <Button onClick={overlayPakke}>Anmod om tilbud</Button>
                  <div className="HomePage__Checks">
                    <CheckSharpIcon />
                    <p>
                      Statiske beregninger af overligger, herunder
                      dimensionering af stålbjælke og evt. søjler.
                    </p>
                  </div>
                  <div className="HomePage__Checks">
                    <CheckSharpIcon />
                    <p>
                      Statiske beregninger af eksisterende konstruktioner
                      herunder vederlagsforhold for bjælke.
                    </p>
                  </div>
                  <div className="HomePage__Checks">
                    <CheckSharpIcon />
                    <p>Arbejdstegninger til udførende håndværker</p>
                  </div>
                </div>
              </Grid>
              <Grid item lg={4} md={4} sm={12}>
                <div className="HomePage__PricesDiv">
                  <h2>Lejlighed - Pakke 1</h2>
                  <h1>6250</h1>
                  <p className="HomePage__moms">kr.inkl.moms</p>
                  <Button onClick={overlayPakke}>Anmod om tilbud</Button>
                  <div className="HomePage__Checks">
                    <CheckSharpIcon />
                    <p>
                      Statiske beregninger af overligger, herunder
                      dimensionering af stålbjælke og evt. søjler.
                    </p>
                  </div>
                  <div className="HomePage__Checks">
                    <CheckSharpIcon />
                    <p>
                      Statiske beregninger af eksisterende konstruktioner
                      herunder vederlagsforhold for bjælke.
                    </p>
                  </div>
                  <div className="HomePage__Checks">
                    <CheckSharpIcon />
                    <p>Arbejdstegninger til udførende håndværker</p>
                  </div>
                  <div className="HomePage__Checks">
                    <CheckSharpIcon />
                    <p>Midlertidig afstivningsprojekt</p>
                  </div>
                  <div className="HomePage__Checks">
                    <CheckSharpIcon />
                    <p>
                      Evt. opfølgning og rettelser med certificeret statiker
                    </p>
                  </div>
                </div>
              </Grid>
              <Grid item lg={4} md={4} sm={12}>
                <div className="HomePage__PricesDiv">
                  <h2>Lejlighed - Pakke 2</h2>
                  <h1>19900</h1>
                  <p className="HomePage__moms">kr.inkl.moms</p>
                  <Button onClick={overlayPakke}>Anmod om tilbud</Button>
                  <div className="HomePage__Checks">
                    <CheckSharpIcon />
                    <p>Komplet statisk dokumentation iht. SBI-271</p>
                  </div>
                  <ul>
                    <li>A1. Konstruktionsgrundlag</li>
                    <li>A2. Statiske beregninger</li>
                    <li>A3. Konstruktionstegninger</li>
                    <li>B1. Statisk projektredegørelse</li>
                    <li>B2. Statisk kontrolplan</li>
                    <li>B3. Statisk kontrolrapport</li>
                  </ul>
                  <div className="HomePage__Checks">
                    <CheckSharpIcon />
                    <p>
                      Statiske beregninger af overligger, herunder
                      dimensionering af stålbjælke og evt. søjler.
                    </p>
                  </div>
                  <div className="HomePage__Checks">
                    <CheckSharpIcon />
                    <p>
                      Statiske beregninger af overligger, herunder
                      dimensionering af stålbjælke og evt. søjler.
                    </p>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
      <div className="HomePage__ExtraVegge">
        <Container>
          <div className="HomePage__DivExtraMoney">
            <Grid container justify="center" alignItems="center">
              <Grid item lg={6} md={6} sm={12}>
                <div className="HomePage__textName">
                  <h3>Nedrivning af ikke-bærende vægge</h3>
                  <p>
                    Ved nedrivning af ikke bærende vægge skal der ikke laves
                    nogle statiske beregninger. Dog kan ejerforeningen eller
                    forsikringen kræve, at der skal laves et notat der redegører
                    for konstruktionerne.
                  </p>
                  <p style={{ marginTop: "25px" }}>
                    Vi kan udarbejde et ansvarstagende notat der indeholder en
                    vurdering af væggens bærende- og stabiliserende funktion.
                  </p>
                </div>
              </Grid>
              <Grid item container justify="flex-end" lg={6} md={6} sm={12}>
                <div className="HomePage__PriceButton">
                  <div className="HomePage__ParagraphPrice">
                    <p>
                      fra <span>3500</span> kr.inkl.moms
                    </p>
                  </div>
                  <Button onClick={registerPakke}>Anmod om tilbud</Button>
                </div>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
      <div className="HomePage__SaleParagraph">
        <Container>
          <p>
            Bemærk, at tilbuddene er vejledende og kan derfor variere afhængig
            af ejendommens eksisterende forhold. Vurderes tegningsmaterialet
            utilstrækkeligt eller hvis der har været tidligere omfattende
            ændringer kan dette ændre prisen. Ved flere ændringer i samme
            ejendom gives der mængderabat.
          </p>
        </Container>
      </div>
      <div className="HomePage__Shower" id="badeværelse">
        <div className="HomePage__ShowerStatisticText">
          <Container>
            <h1>Statiske beregninger - Etablering af badeværelse</h1>
            <p>
              Ønsker du at udvide eksisterende badeværelse eller etablere et
              helt nyt skal du have statiske beregninger, der efterviser
              bæreevnen af de eksisterende bjælker i etagedækket.{" "}
            </p>
          </Container>
        </div>
        <Container className="HomePage__ContainerShower">
          <div className="HomePage__DivSelling">
            <Grid container justify="center" alignItems="flex-start">
              <Grid item lg={6}>
                <h2>Etablering af badeværelse</h2>
                <div className="HomePage__Ehstablished">
                  <h1>4000</h1>
                  <p>kr.inkl.moms</p>
                  <Button onClick={registerPakke}>Anmod om tilbud</Button>
                </div>
              </Grid>
              <Grid item lg={6}>
                <div className="HomePage__DivSellingCart">
                  <CheckSharpIcon />
                  <p>
                    Vurdering af eksisterende træ-/stålbjælker i etagedækket
                  </p>
                </div>
                <div className="HomePage__DivSellingCart">
                  <CheckSharpIcon />
                  <p>
                    Statiske beregninger, der efterviser bæreevnen af
                    etagedækket ifm. merbelastning fra betonstøbning.
                  </p>
                </div>
                <div className="HomePage__DivSellingCart">
                  <CheckSharpIcon />
                  <p>Foreslag til evt. forstærkning af eksisterende bjælker</p>
                </div>
                <div className="HomePage__DivSellingCart">
                  <CheckSharpIcon />
                  <p>
                    Såfremt bjælkelaget ikke viser tilstrækkelige bæreevne
                    udarbejdes beregninger til forstærkninger og
                    tegningsmateriale til udførende håndværker til 3500 kr.
                  </p>
                </div>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
      <div className="HomePage__Statistic" id="Tilbygning">
        <div className="HomePage__StatisticContainer">
          <Container>
            <h1>Statiske beregninger - Tilbygning</h1>
            <p>
              Ønsker du at udvide boligen med en tilbygning så kontakt os og få
              hjælp til ingeniørprojektet. Ingeniørprojektet omfatter
              rådgivning, statiske beregninger og tilhørende tegninger til din
              håndværker.
            </p>
          </Container>
        </div>
        <Container className="HomePage__StatisticContainerTwo">
          <div className="HomePage__StatisticPrice">
            <Grid
              container
              justify="center"
              alignItems="flex-start"
              spacing={thousandPixels ? 10 : 5}
            >
              <Grid item lg={6}>
                <h2>Ny tilbygning</h2>
                <div className="HomePage__StatisticPriceView">
                  <h1>
                    <p>fra</p>8500 kr.
                  </h1>
                  <p className="HomePage__StatisticMoms">kr.inkl.moms</p>
                  <Button onClick={registerPakke}>Anmod om tilbud</Button>
                </div>
              </Grid>
              <Grid item lg={6}>
                <div className="HomePage__StatisticParagraph">
                  <p>
                    En tilbygning eller en større ombygning af eksisterende hus
                    vil i de fleste tilfælde indebærer, at man berører de
                    bærende konstruktioner.
                  </p>
                  <p>
                    Det kan være, at man skal nedlægge en væg for at etablere en
                    ny bygning i forlængelse af eksisterende hus.
                  </p>
                  <p>
                    Vi hjælper med alle nødvendige beregninger til disse typer
                    af opgaver. Kontakt os gerne for at få et tilbud på netop
                    dit projekt.
                  </p>
                </div>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
      <div className="HomePage__NewHous">
        <div className="HomePage__NewHousTitel" id="Nythus">
          <Container>
            <h1>Statiske beregninger - Nyt hus</h1>
            <p>
              Ønsker du at bygge nyt hus tilbyder vi at udarbejde de statiske
              beregninger til de bærende konstruktioner. Vi samarbejder med
              jeres arkitekt og håndværker så vi sammen kan komme frem til de
              mest fordelagtige løsninger. Et nyt hus kan indeholde mange ting,
              som gør det vanskeligt at give en fast pris. Derfor er du
              velkommen til at kontakte os for at få et fast tilbud på
              rådgivningen.
            </p>
          </Container>
          <Link
            activeClass="true"
            to="Contact"
            spy={true}
            offset={-275}
            smooth={true}
            duration={1250}
          >
            <div className="HomePage__NewHoursButton">
              <Button>Kontak Os</Button>
            </div>
          </Link>
        </div>
      </div>

      <div className="HomePage__Ydelser" id="AndreYdelser">
        <Container>
          <h1>Andre ydelser</h1>
          <p>
            Har du andre spørgsmål til dit byggeprojekt, eller ønsker du hjælp
            til beregninger/tegninger til projekter, der ikke er nævnt foroven
            så kontakt os endelig.
          </p>
        </Container>
      </div>

      <div className="HomePage__PriceTime">
        <div className="HomePage__PriceTimeContainer">
          <Container>
            <Grid
              container
              justify="center"
              alignItems="flex-start"
              spacing={10}
            >
              <Grid item lg={6} md={6} sm={12} className="Grid__SaveTime">
                <div className="HomePage__PriceTime__SaveTime">
                  <img src={saveTime} alt="saveTime" />
                  <div className="HomePage__PriceTime__Text">
                    <h2>Tilbud med fast pris inden for 24 timer</h2>
                    <p>
                      Vi giver altid et fast tilbud inkl. moms. Tilbuddet bliver
                      sendt skriftligt inden for 24 timer.
                    </p>
                  </div>
                </div>
              </Grid>
              <Grid
                item
                lg={6}
                md={6}
                sm={12}
                className="PriceTimeGrid"
                style={{ background: "#f1f1f1" }}
              >
                <div className="HomePage__PriceTime__SaveMoney">
                  <img src={moneyHand} alt="saveTime" />
                  <div className="HomePage__PriceTime__Text">
                    <h2>Tilbud med fast pris inden for 24 timer</h2>
                    <p>
                      Vi giver altid et fast tilbud inkl. moms. Tilbuddet bliver
                      sendt skriftligt inden for 24 timer.
                    </p>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Container>
        </div>
      </div>
      <div className="HomePage__AnswerNogle" id="Info">
        <Container>
          <h1 className="HomePage__InfoText">
            Info - Vi har svaret på nogle af de mest ofte stillede spørgsmål
          </h1>
        </Container>
        <Container>
          <div className="HomePage__AnswerAccordion">
            <Accordion
              expanded={expanded === "panel1"}
              onChange={() => handleChange("panel1")}
              className="Accordion"
            >
              <AccordionSummary className="AccordionSummary">
                <h1>
                  {expanded === "panel1" ? <RemoveIcon /> : <AddIcon />}Hvad er
                  bærende/stabiliserende vægge?
                </h1>
              </AccordionSummary>
              <AccordionDetails className="AccordionDetails">
                <p className="Text__P">
                  En væg kan være bærende hvis den er placeret under et tagspær
                  eller en ovenliggende tung væg. En bærende væg er typisk af
                  mursten eller beton. Fjernes en bærende væg uden
                  forstærkning/afstivning kan der opstå revner og sætningsskader
                  og i værste tilfælde medføre nedstyrtning af tagkonstruktion
                  eller etageadskillelse.
                </p>
                <p className="Text__P">
                  facadevæggene kan antages for at være bærende. Derudover er
                  vægge, som bærer evt. andre ovenliggende vægge fra øvrige
                  etager, også bærende.
                </p>
                <p className="Text__P">
                  som er med til at stabiliserende bl.a. ydermurerne.
                </p>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel2"}
              onChange={() => handleChange("panel2")}
              className="Accordion"
            >
              <AccordionSummary className="AccordionSummary">
                <h1>
                  {expanded === "panel2" ? <RemoveIcon /> : <AddIcon />}
                  Hvordan fungerer det?
                </h1>
              </AccordionSummary>
              <AccordionDetails className="AccordionDetails">
                <p className="Text__P">
                  som er med til at stabiliserende bl.a. ydermurerne.
                </p>
                <ul>
                  <li>Beskrivelse af opgaven</li>
                  <li> Adresse (og evt. etage)</li>
                  <li>Boligens plan- og snittegninger</li>
                </ul>
                <p className="Text__P">
                  Boligens tegninger kan findes på:&nbsp;
                  <a href="www.public.filarkiv.dk">www.public.filarkiv.dk</a>
                  &nbsp; eller <a href="www.weblager.dk">www.weblager.dk</a>
                </p>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel3"}
              onChange={() => handleChange("panel3")}
              className="Accordion"
            >
              <AccordionSummary className="AccordionSummary">
                <h1>
                  {expanded === "panel3" ? <RemoveIcon /> : <AddIcon />}Hvor
                  lang tid tager det?
                </h1>
              </AccordionSummary>
              <AccordionDetails className="AccordionDetails">
                <p className="Text__P">
                  Vi udarbejder og afleverer den statiske dokumentationen inden
                  for 7 hverdage. Derudover skal der påberegnes håndværkerens
                  tid på udførelsen, som typisk tager 3-6 dage. I nogle
                  byggesager kræves der en byggesagstilladelse, og her skal
                  kommunens sagsbehandlingstid også påberegnes.
                  Sagsbehandslingstiden afhænger af de forskellige kommuner og
                  opgavens karakter.
                </p>
              </AccordionDetails>
            </Accordion>

            <Accordion
              expanded={expanded === "panel5"}
              onChange={() => handleChange("panel5")}
              className="Accordion"
            >
              <AccordionSummary className="AccordionSummary">
                <h1>
                  {expanded === "panel5" ? <RemoveIcon /> : <AddIcon />}
                  Skal jeg søge om byggetilladelse til at få fjernet min væg?
                </h1>
              </AccordionSummary>
              <AccordionDetails className="AccordionDetails">
                <p className="Text__P">
                  is du bor i en etageejendom og laver ændringer i bygningens
                  bærende konstruktioner skal du søge om byggetilladelse. Du
                  skal altså søge om byggetilladelse til bl.a. at fjerne en væg,
                  udvidelse af dørhul, etablering af badeværelse mv.
                </p>
                <p className="Text__P">
                  Der er enkelte tilfælde, hvor du ikke behøver at søge om
                  byggetilladelse til dit byggeprojekt.&nbsp;
                  <Link
                    activeClass="true"
                    to="Contact"
                    spy={true}
                    offset={-275}
                    smooth={true}
                    duration={1250}
                    style={{ background: "100%", padding: "0", margin: "0" }}
                  >
                    <span style={{ color: "#02ADD7", cursor: "pointer" }}>
                      Kontakt oss&nbsp;
                    </span>
                  </Link>
                  hvis du er i tvivl.
                </p>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel6"}
              onChange={() => handleChange("panel6")}
              className="Accordion"
            >
              <AccordionSummary className="AccordionSummary">
                <h1>
                  {expanded === "panel6" ? <RemoveIcon /> : <AddIcon />}
                  Hvad er certificeringsordningen?
                </h1>
              </AccordionSummary>
              <AccordionDetails className="AccordionDetails">
                <p className="Text__P">
                  statiker. Den certificerede statiker kan hjælpe med at
                  udarbejde eller kontrollere de statiske beregninger.
                </p>
                <p className="Text__P">
                  Efter den statiske dokumentation er lavet og kontrolleret
                  bliver der udstedt en startererklæring, som kan vedhæftes
                  byggesagsansøgningen til kommunen. Når arbejdet er udført og
                  godkendt vil den certificerede statiker hjælpe med en
                  sluterklæring, som kan vedhæftes byggesagsansøgningen, når
                  arbejdet skal meldes færdigt.
                </p>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel7"}
              onChange={() => handleChange("panel7")}
              className="Accordion"
            >
              <AccordionSummary className="AccordionSummary">
                <h1>
                  {expanded === "panel7" ? <RemoveIcon /> : <AddIcon />}
                  Skal jeg have en certificeret statiker til mit projekt?
                </h1>
              </AccordionSummary>
              <AccordionDetails className="AccordionDetails">
                <p className="Text__P">
                  Skal der laves ændringer i en etageejendoms bærende
                  konstruktioner skal der inddrages en certificeret statiker.
                  Den certificerede statiker kan hjælpe med at udarbejde eller
                  kontrollere de statiske beregninger.
                </p>
                <p className="Text__P">
                  Efter den statiske dokumentation er lavet og kontrolleret
                  bliver der udstedt en startererklæring, som kan vedhæftes
                  byggesagsansøgningen til kommunen. Når arbejdet er udført og
                  godkendt vil den certificerede statiker hjælpe med en
                  sluterklæring, som kan vedhæftes byggesagsansøgningen, når
                  arbejdet skal meldes færdigt.
                </p>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel8"}
              onChange={() => handleChange("panel8")}
              className="Accordion"
            >
              <AccordionSummary className="AccordionSummary">
                <h1>
                  {expanded === "panel8" ? <RemoveIcon /> : <AddIcon />}
                  Hvor finder jeg certificerede statikere- eller brandrådgivere?
                </h1>
              </AccordionSummary>
              <AccordionDetails className="AccordionDetails">
                <p className="Text__P">
                  Du kan finde en oversigt over certificerede brandrådgivere og
                  statikere samt anerkendte statikere inde på
                  bygningsreglementets hjemmesidet{" "}
                  <a
                    style={{ color: "#02ADD7", cursor: "pointer" }}
                    href="https://bygningsreglementet.dk/Vejledninger/Andre_vejledninger/Vejledning/Oversigt-over-certificerede-brandraadgivere-og-statikere/Oversigt-over-certificerede-brandraadgivere-og-statikere"
                  >
                    Se mere her.
                  </a>
                </p>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel9"}
              onChange={() => handleChange("panel9")}
              className="Accordion"
            >
              <AccordionSummary className="AccordionSummary">
                <h1>
                  {expanded === "panel10" ? <RemoveIcon /> : <AddIcon />}
                  Er vores rådgivning dækket af en forsikring?
                </h1>
              </AccordionSummary>
              <AccordionDetails className="AccordionDetails">
                <p className="Text__P">
                  Forsikringscertifikat kan fremsendes ved forespørgsel.
                </p>
              </AccordionDetails>
            </Accordion>
          </div>
        </Container>
      </div>

      <div className="HomePage__ContactHeader">
        <Container>
          <h1>Kontak os</h1>
        </Container>
      </div>

      <div className="HomePage__FormSubmit" id="Contact">
        <Container>
          <Grid container justify="center" alignItems="flex-start" spacing={10}>
            <Grid item lg={6} md={6} sm={12}>
              <h1>Hvad er processen?</h1>
              <div className="HomePage__Steps">
                <Stepper
                  orientation={!thousandPixels ? "vertical" : "horizontal"}
                >
                  <Step className="First_Step">
                    <StepLabel className="Step">
                      1. Du kontakter os med relevante oplysninger
                      <p>(Kontaktoplysninger, adresse og plantegning)</p>
                    </StepLabel>
                  </Step>
                  <Step>
                    <StepLabel>
                      2. Vi sender et tilbud som kan accepteres over mail
                    </StepLabel>
                  </Step>
                  <Step>
                    <StepLabel>
                      3. Ved accept går vi igang med beregninger.
                    </StepLabel>
                  </Step>
                  <Step>
                    <StepLabel className="Last_Step">
                      4. Beregninger og dokumenter fremsendes som pdf.
                      <br /> Faktura bliver sendt sammen med det færdige
                      ingeniørprojekt
                    </StepLabel>
                  </Step>
                </Stepper>
              </div>

              <div className="Contact__Email">
                <img src={emailImage} alt="email" />
                <div className="Contact__EmailInfo">
                  <p>E-mail adresse: kontakt@engarch.dk</p>
                  <p>Tlf. nr.: 5335 2200</p>
                </div>
              </div>
            </Grid>
            <Grid item lg={6} md={6} sm={12}>
              <form onSubmit={onFormSubmit}>
                <h3>
                  Send os en besked med en beskrivelse af dit bygge-projekt og
                  vedhæft gerne nogle tegninger af ejendommen.
                </h3>
                <h3 className="HomePage__FormLastH3">
                  Så vender vi tilbage inden for 24 timer!
                </h3>

                {fileLoader ? (
                  <h1 style={{ textAlign: "center", margin: "20px 0" }}>
                    Loading...
                  </h1>
                ) : (
                  <Fragment>
                    <input
                      type="text"
                      placeholder="Navn"
                      value={targets.name}
                      onChange={onChangeTargets}
                      name="name"
                    />
                    <input
                      type="text"
                      placeholder="E-mail addresse"
                      value={targets.email}
                      name="email"
                      onChange={onChangeTargets}
                    />
                    <textarea
                      placeholder="Beskrivelse af projekt - Skriv gerne adressen"
                      value={targets.textarea}
                      onChange={onChangeTargets}
                      name="textarea"
                    />
                    {imageFile &&
                      imageFile.map(({ name, id }, index) => (
                        <div key={id} className="ImageFile">
                          <AssignmentIcon className="DocumentIcon" />
                          {name}
                          <IconButton onClick={() => deleteFile(id)}>
                            <CancelIcon className="CancelIcon" />
                          </IconButton>
                        </div>
                      ))}
                    <div className="HomePage__UploadFileDiv">
                      <input
                        type="file"
                        multiple
                        id="file"
                        onChange={onChangeImageFile}
                      />
                      <p>Upload dine filer her</p>
                      <img src={fileImage} alt="file" />
                    </div>
                    <Button type="submit" className="IndSend">
                      INDSEND
                    </Button>
                    {failed && (
                      <Alert severity="error" className="ErrorField">
                        {failed}
                      </Alert>
                    )}

                    {success && (
                      <Alert severity="success" className="SuccessField">
                        {success}
                      </Alert>
                    )}
                    <p className="HomePage__WelcomeText">
                      Du er også velkommen til at sende direkte til vores mail
                      på&nbsp;
                      <a href="*">kontakt@engarch.dk</a>
                    </p>
                  </Fragment>
                )}
              </form>
            </Grid>
          </Grid>
        </Container>
      </div>

      <footer>
        <h1>engarch Aps</h1>
        <div className="Footer__TextParagraph">
          <p>
            engarch ApS Ring 53352200 eller send os en mail på
            kontakt@engarch.dk
          </p>
          <p>
            © 2020 Engarch Aps CVR. 41824131 - Rævehøjvej 36, 01, 1306, 2800
            Kgs. Lyngby
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;

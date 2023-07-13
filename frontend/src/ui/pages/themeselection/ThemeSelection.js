import React, { useEffect, useState } from "react";
import theme1 from "../../../assets/themeselection/Theme1.png";
import theme2 from "../../../assets/themeselection/Theme2.png";
import theme3 from "../../../assets/themeselection/Theme3.png";
import "./ThemeSelection.css";
import FilterCard from "../../components/filtercard/FilterCard";
 
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useUserContext } from "../../../context/MemorialContext";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ThemeSelection = () => {
  const [open, setOpen] = React.useState(false);
  const [created, setCreated] = React.useState(false);
  const [loading, setLoading] = React.useState(false)
  const [currentTheme, setCurrentTheme] = React.useState();
  const [width, setWidth] = React.useState("lg");
  const {
    themes,
    newThemes,
    setNewThemes,
    setSelectedTheme,
    formData,
    user,
    setCurrentMemorial,
  } = useUserContext();

  const [allThemes, setAllThemes] = React.useState(themes);
  const[memorialID, setMemorialID] = React.useState()
  useEffect(() => {
    setNewThemes(themes);
  }, [themes.length > 0]);
  const navigate = useNavigate();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const addMemorial = async () => {
    const { meta } = user;
    console.log("user", meta);
    setLoading(true)

    const userId = meta._id;

    const data = {
      ...formData,
      theme: currentTheme._id,
      user: userId,
      owner: user.email || user.meta.email
    };
    try {
      const response = await fetch(
        `http://localhost:5000/api/users/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Memorial added:", data.memorial._id);
        // Handle the successful response
        setCurrentMemorial(data.memorial);
        setMemorialID(data.memorial._id)
        setLoading(false)
      } else {
        // Handle the error response
        console.error("Error adding memorial:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding memorial:", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCreated = () => {
    setCreated(true);
    setSelectedTheme(currentTheme);
    addMemorial();
    sessionStorage.removeItem("formData")
    // navigate('/profile')
  };

  const handleContinue = () => {
    if(memorialID){
      navigate(`/profile/${memorialID}`);
    }
  };
  return (
    <div className={`theme-selection-container`}>
      <div className="filter-bar">
        <FilterCard />
      </div>
      <div className="theme-cards-container">
        {/* Render your theme cards here */}
        {/* Example: */}

        {newThemes?.map((theme) => (
          <div
            className="theme-card"
            onClick={() => {
              setCurrentTheme(theme);
              handleClickOpen();
            }}
          >
            <img src={theme.thumbnail} alt="Theme 1" />
          </div>
        ))}

        {/* Repeat the above card structure for each theme */}
      </div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        maxWidth={width}
        onClose={handleClose}
        sx={{
          backdropFilter: "blur(5px) sepia(5%)",
        }}
        // 👇 Props passed to Paper (modal content)
        PaperProps={{ sx: { borderRadius: "15px" } }}
        aria-describedby="alert-dialog-slide-description"
      >
       {
        created &&  <div className="d-content">
        <p className="dialog-content">
          {created &&
            `${formData.firstName}’s online memorial successfully created.":"Continue with the selected template?`}{" "}
        </p>
      </div>
       }
        <div className="actions">
          {created ? (
            
            <Button isLoading={loading} onClick={handleContinue} text="Continue"/>
          ) : (
            <div style={{display:'flex',gap:'15px',padding:'30px'}}>
              <button className="chooseBtn" onClick={handleClose}>
                Choose another
              </button>
              <button className="continueBtn" onClick={handleCreated}>
                Continue
              </button>
            </div>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default ThemeSelection;

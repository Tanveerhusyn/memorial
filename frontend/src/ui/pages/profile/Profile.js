import React, { useState, useEffect, useRef } from "react";
import ProfileBackground from "../../../assets/profilebackground.svg";
import Profilepicture from "../../../assets/profilepicture.svg";
import Quote from "../../../assets/quote.svg";
import speaker from "../../../assets/speaker.svg";
import "./Profile.css";
import Card from "../../components/card/Card";
import Button from "../../components/button/Button";
import dummy from "../../../assets/dummy.jpg";
import story from "../../../assets/story.svg";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import Dialog from "@mui/material/Dialog";
import axios from "axios";

import { toast } from "react-toastify";
import Slide from "@mui/material/Slide";
import UploadBox from "../../components/uploadbox/UploadBox";
import { useUserContext } from "../../../context/MemorialContext";
import { TiLeaf } from "react-icons/ti";
import { BsChatLeftHeart } from "react-icons/bs";
import { HiOutlineCake } from "react-icons/hi";
import { ProgressBar, ThreeDots } from "react-loader-spinner";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const backendUrl = process.env.REACT_APP_BACKEND_URL;

const Profile = () => {
  const parse = require("html-react-parser");

  const [currentTab, setCurrentTab] = useState("about");
  const [value, setValue] = useState();
  const [owner, setOwner] = useState();
  const [currentMusic, setCurrentMusic] = useState();
  const {
    formData,
    selectedTheme,
    user,
    currentMemorial,
    handleChange,
    setSelectedTheme,
  } = useUserContext();
  const [open, setOpen] = React.useState(false);
  const [memorial, setMemorial] = useState();
  const [isEditLoading, setIsEditLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nloading, setNLoading] = useState(false);
  const [loadingMusic, setMusicLoading] = useState(false);
  const [mainLoader, setMainLoader] = useState(false);
  const [error, setError] = useState("");
  const [subMenu, setSubMenu] = useState("photo");
  const [trigger, setTrigger] = useState(false);
  const [tributeText, setTributeText] = useState("");
  const [tributes, setTributes] = useState([]);
  const [isImgLoading, setIsImageLoading] = useState(false);
  const [isTributeLoading, setIsTributeLoading] = useState(false);
  const [editData, setEditData] = useState({});
  const [storyTitle, setStoryTitle] = useState("");
  const [storyTitle1, setStoryTitle1] = useState("");
  const [storyDesc, setStoryDesc] = useState("");
  const [storyDesc1, setStoryDesc1] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [selectedFile2, setSelectedFile2] = useState();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mainError, setMainError] = useState(false);
  const audioRef = useRef(null);
  const dropdownRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isChecked3, setIsChecked3] = useState(false);
  const [privacyLoading, setPrivacyLoading] = useState(false);

  const handleSavePreferences = () => {
    setNLoading(true);
    const updatedNotification = !isChecked3
      ? {
          post: isChecked,
          birthday: isChecked1,
          passed: isChecked2,
          emailSent: false,
        }
      : {
          post: false,
          birthday: false,
          passed: false,
          emailSent: false,
        };

    fetch(`${backendUrl}/api/memorials/notifications/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedNotification),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Notification preferences updated successfully:", data);
        setNLoading(false);
        handleClose();
      })
      .catch((error) => {
        setNLoading(false);
        handleClose();

        console.error("Error updating notification preferences:", error);
      });
  };

  const handleSvgClick = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((error) => {
        if (error.name === "NotAllowedError") {
          console.log(
            "Playback was prevented by the browser. Please interact with the page first."
          );
        } else {
          console.error("Error playing audio:", error);
        }
      });
    }
    setIsPlaying(!isPlaying);
  };

  audioRef.current?.addEventListener("ended", () => {
    setIsPlaying(false);
  });

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const [dp, setDP] = useState("");
  const paragraphStyle = {
    color: selectedTheme?.textColor || "#5c5470",
  };

  const { id } = useParams();

  function isAdmin() {
    if (user && owner) {
      return (user.email || user.meta.email) == owner;
    }

    return false;
  }
  const fetchMemorial = async () => {
    setMainLoader(true);

    try {
      const response = await fetch(`${backendUrl}/api/memorials/${id}`);
      if (response.ok) {
        const data = await response.json();
        console.log("Result", data.memorial);
        const { theme, owner } = data.memorial;

        setSelectedTheme(theme);
        setMemorial(data.memorial);
        setIsChecked(data.memorial.notification.post);
        setIsChecked1(data.memorial.notification.birthday);
        setIsChecked2(data.memorial.notification.passed);
        setEditData(data.memorial);
        setCurrentMusic(data.memorial.backgroundMusic[0]);
        setMainLoader(false);

        setOwner(owner);

        const fragment = window.location.hash.substring(1); // Removes the '#' from the fragment
        const fragmentSplit = fragment?.split("-");
        console.log("Fragmented", fragmentSplit.length);
        if (fragmentSplit.length > 1) {
          setCurrentTab(fragmentSplit[0]);
          setTimeout(() => {
            const targetElement = document.getElementById(fragmentSplit[1]);
            if (targetElement) {
              targetElement.scrollIntoView({ behavior: "smooth" });
            }
          }, 1000);
        }
      } else {
        console.error("Error fetching memorial:", response.statusText);
        setMainLoader(false);
        setMainError(response.statusText);
      }
    } catch (error) {
      console.error("Error fetching memorial:", error);
      setMainLoader(false);
      setMainError("Not Found");
    }
  };

  const updateVisitor = async () => {
    try {
      // Make a request to the backend endpoint based on the subMenu value
      let endpoint = `${backendUrl}/api/memorials/visitors/${id}`;

      const formData = new FormData();
      formData.append(
        "visitorName",
        user ? user.email || user.meta.email : "anonymous"
      );
      const data = {
        visitorName: user ? user.email || user.meta.email : "anonymous",
      };
      const response = await axios.put(endpoint, data, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("RESPONSE", response);
      // Handle the response, such as updating the component state with the updated memorial data

      setError(false);
    } catch (error) {
      console.error(error);

      setError(true);
    }
  };

  useEffect(() => {
    fetchMemorial();
    updateVisitor();
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const UpdatePrivacy = async () => {
    setPrivacyLoading(true);

    try {
      // Make a request to the backend endpoint based on the subMenu value
      let endpoint = `${backendUrl}/api/memorials/${id}`;

      const response = await axios.put(endpoint, memorial, {
        headers: { "Content-Type": "application/json" },
      });
      setPrivacyLoading(false);

      // Handle the response, such as updating the component state with the updated memorial data
      fetchMemorial();

      setError(false);
    } catch (error) {
      console.error(error);

      setError(true);
    }
  };

  const handlePrivacyUpdate = async (value) => {
    console.log("PASSED", value);

    const data = {
      publicVisibility: value,
    };

    try {
      // Make a request to the backend endpoint based on the subMenu value
      let endpoint = `${backendUrl}/api/memorials/${id}`;

      const response = await axios.put(endpoint, data, {
        headers: { "Content-Type": "application/json" },
      });

      setError(false);
    } catch (error) {
      console.error(error);

      setError(true);
    }
  };

  useEffect(() => {
    if (memorial) {
      const birthDate = new Date(memorial.birthDate);
      const currentDate = new Date();

      if (
        memorial?.privacy.birthday &&
        birthDate.getMonth() === currentDate.getMonth() &&
        birthDate.getDate() === currentDate.getDate()
      ) {
        console.log("Birthday Update");
        handlePrivacyUpdate(memorial.privacy.birthday);
      }

      // Check if it's the passed date
      const passedDate = new Date(memorial.passedDate);
      if (
        memorial?.privacy.passed &&
        passedDate.getMonth() === currentDate.getMonth() &&
        passedDate.getDate() === currentDate.getDate()
      ) {
        handlePrivacyUpdate(memorial.privacy.passed);
      }
    }
  }, [memorial]);

  useEffect(() => {
    const currentDate = new Date();

    if (user) {
      // Fetch the memorials owned by the user
      fetch(
        `${backendUrl}/api/memorials/user/${user.meta._id}/memorials`
      )
        .then((response) => response.json())
        .then((data) => {
          const { memorials } = data;

          // Iterate over the memorials
          memorials.forEach((memorial) => {
            const { birthday, passed, emailSent } = memorial.notification;

            // Check if it's the birthday
            const birthDate = new Date(memorial.birthDate);
            if (
              !emailSent &&
              birthday &&
              birthDate.getMonth() === currentDate.getMonth() &&
              birthDate.getDate() === currentDate.getDate()
            ) {
              sendEmail("birthday", memorial);
            }

            // Check if it's the passed date
            const passedDate = new Date(memorial.passedDate);
            if (
              !emailSent &&
              passed &&
              passedDate.getMonth() === currentDate.getMonth() &&
              passedDate.getDate() === currentDate.getDate()
            ) {
              sendEmail("passed", memorial);
            }
          });
        })
        .catch((error) => {
          console.error("Error retrieving memorials:", error);
        });
    }
  }, [memorial, user]);

  const sendEmail = (event, memo) => {
    const from = "WillAlwaysLoveUTech@gmail.com";
    // Create an object with the email details
    const { firstName, _id, owner } = memo;
    const emailData =
      event == "birthday"
        ? {
            from: from,
            to: owner, // Change this to your backend endpoint
            text: `Today is ${firstName}'s Birthday. Wish hime here <a>https://willalwaysloveu.com/profile/${_id}`,
            subject: `${firstName}'s Birthday`,
          }
        : event == "passed"
        ? {
            from: from,
            to: owner, // Change this to your backend endpoint
            text: `Today is ${firstName}'s death anniversary. Leave a tribute here <a>https://willalwaysloveu.com/profile/${id}`,
            subject: `${firstName}'s Death anniversary`,
          }
        : {
            from: from,
            to: owner, // Change this to your backend endpoint
            text: `New Post created on the ${firstName}'s memorial  <a>https://willalwaysloveu.com/profile/${id}`,
            subject: `New post on ${firstName}'s Memorial`,
          };

    // Make an HTTP POST request to your backend endpoint
    fetch(`${backendUrl}/api/memorials/${id}/sendEmail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        if (event != "post") {
          updateMemorialEmailSent(_id, true);
        }

        // Handle success or error response from the backend
      })
      .catch((error) => {
        console.error(error);
        // Handle error
      });
  };

  const updateMemorialEmailSent = (eid, emailSent) => {
    fetch(`${backendUrl}/api/memorials/${eid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ notification: { emailSent } }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Memorial emailSent updated successfully");
        } else {
          console.log("Failed to update memorial emailSent");
        }
      })
      .catch((error) => {
        console.error("Error updating memorial emailSent:", error);
      });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleMemorialSubmit = async () => {
    try {
      setIsEditLoading(true);
      const response = await fetch(
        `${backendUrl}/api/memorials/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Edited Successfully:", data);
        setIsEditLoading(false);

        fetchMemorial();
      } else {
        console.error("Failed to add tribute:", response.statusText);
        // Handle the error case
      }
    } catch (error) {
      console.error("Error adding tribute:", error);
      // Handle the error case
    }
  };

  const handleStorySubmit = async (e) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("attachment", selectedFile);
    formData.append("title", storyTitle);
    formData.append("description", storyDesc);
    formData.append("author", user?.email || "guest");
    formData.append("date", Date.now());

    try {
      // Make a request to the backend endpoint to upload the display picture
      const response = await fetch(
        `${backendUrl}/api/memorials/${id}/stories`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (response.ok) {
        // Display picture uploaded successfully, you can handle the response as needed
        console.log("Display picture uploaded successfully", response);
        setLoading(false);
        fetchMemorial();
        setCurrentTab("stories");
        setStoryDesc("");
        setStoryTitle("");
        if (memorial.notification.post) {
          sendEmail("post", memorial);
        }
      } else {
        // Error uploading display picture, handle the error
        console.error("Error uploading story:", response.statusText);
      }
    } catch (error) {
      console.error("Error uploading story:", error);
      setLoading(false);
    }
  };

  const handleStoryFile = async (e,value) => {
    const selectedFile = e.target.files?e.target.files[0]:value

    console.log("Selected", selectedFile);

    setSelectedFile(selectedFile);
    // Handle the selected file here
  };
  const handleLifeSubmit = async (e) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("attachment", selectedFile2);
    formData.append("title", storyTitle1);
    formData.append("description", storyDesc1);
    formData.append("author", user.email);
    formData.append("date", Date.now());

    try {
      // Make a request to the backend endpoint to upload the display picture
      const response = await fetch(
        `${backendUrl}/api/memorials/${id}/life`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (response.ok) {
        // Display picture uploaded successfully, you can handle the response as needed
        console.log("Story", response);
        setLoading(false);
        fetchMemorial();
        setStoryDesc("");
        setStoryTitle("");
      } else {
        // Error uploading display picture, handle the error
        console.error("Error uploading story:", response.statusText);
      }
    } catch (error) {
      console.error("Error uploading story:", error);
      setLoading(false);
    }
  };

  const handleLifeFile = async (e) => {
    const selectedFile = e.target.files[0];
    console.log("Selected", selectedFile);

    setSelectedFile2(selectedFile);
    // Handle the selected file here
  };

  const handleFileInputChange = async (e,value) => {
    const selectedFile = e.target.files?e.target.files[0]:value
    console.log("Selected", selectedFile);
    

    // Handle the selected file here
    setLoading(true);

    const formData = new FormData();
    formData.append(subMenu, selectedFile); // Append the subMenu value as the form field name

    try {
      // Make a request to the backend endpoint based on the subMenu value
      let endpoint = "";
      if (subMenu === "photo") {
        endpoint = `${backendUrl}/api/memorials/${id}/photos`;
      } else if (subMenu === "video") {
        endpoint = `${backendUrl}/api/memorials/${id}/videos`;
      } else if (subMenu === "audio") {
        endpoint = `${backendUrl}/api/memorials/${id}/audios`;
      }

      const response = await axios.post(endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Handle the response, such as updating the component state with the updated memorial data
      fetchMemorial();
      setLoading(false);
      setError(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setError(true);
    }
  };

  const handleCopyClick = (link) => {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        toast("Link copied to clipboard");
      })
      .catch((error) => {
        console.error("Failed to copy text:", error);
      });
  };

  const addTribute = async () => {
    let userId = "";
    if (user) {
      const { meta } = user;
      userId = meta?._id || "";
    }
    setIsTributeLoading(true);
    const tribute = {
      user: userId,
      date: new Date(Date.now()),
      description: tributeText,
    };
    try {
      const response = await fetch(
        `${backendUrl}/api/memorials/${id}/tributes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(tribute),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Tribute added successfully:", data);
        setTributes(data.tributes);
        setIsTributeLoading(false);
        if (memorial.notification.post) {
          sendEmail("post", memorial);
        }
        fetchMemorial();

        // Handle any necessary updates or notifications
      } else {
        console.error("Failed to add tribute:", response.statusText);
        // Handle the error case
      }
    } catch (error) {
      console.error("Error adding tribute:", error);
      // Handle the error case
    }
  };

  const relationships = [
    "Spouse",
    "Parent",
    "Sibling",
    "Child",
    "Friend",
    "Colleague",
    "Relative",
    "Partner",
  ]; // Example relationships

  const countries = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czechia",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "East Timor",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Korea, North",
    "Korea, South",
    "Kosovo",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Macedonia",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Vatican City",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe",
  ];
  const memorialDestinations = [
    "Mountain",
    "Forest",
    "City",
    "Park",
    "Lake",
    "Island",
    "Countryside",
    "Desert",
    "Historical Site",
    "Landmark",
    "Garden",
    "Resort",
    "Waterfall",
    "Cave",
    "Village",
    "Museum",
    "Monument",
  ];

  const handleDisplayPictureChange = async (event) => {
    const selectedFile = event.target.files[0];
    setIsImageLoading(true);
    // Create a new FormData object to store the selected file
    const formData = new FormData();
    formData.append("displayPicture", selectedFile);
    setDP(selectedFile);
    try {
      // Make a request to the backend endpoint to upload the display picture
      const response = await fetch(
        `${backendUrl}/api/memorials/${id}/display-picture`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        // Display picture uploaded successfully, you can handle the response as needed
        console.log("Display picture uploaded successfully", response);
        setIsImageLoading(false);
        fetchMemorial();
      } else {
        // Error uploading display picture, handle the error
        console.error("Error uploading display picture:", response.statusText);
      }
    } catch (error) {
      console.error("Error uploading display picture:", error);
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const handleCheckboxChange1 = () => {
    setIsChecked1(!isChecked1);
  };
  const handleCheckboxChange2 = () => {
    setIsChecked2(!isChecked2);
  };
  const handleCheckboxChange3 = () => {
    setIsChecked3(!isChecked3);
  };

  const handleOnlyMeChange = (e) => {
    const checked = e.target.checked;
    setMemorial((prevMemorial) => ({
      ...prevMemorial,
      publicVisibility: !checked,
      privacy: {
        ...prevMemorial.privacy,
        onlyme: checked,
      },
    }));
  };

  const handleBirthdayChange = (e) => {
    const checked = e.target.checked;
    setMemorial((prevMemorial) => ({
      ...prevMemorial,
      privacy: {
        ...prevMemorial.privacy,
        birthday: checked,
      },
    }));
  };

  const handlePassedChange = (e) => {
    const checked = e.target.checked;
    setMemorial((prevMemorial) => ({
      ...prevMemorial,
      privacy: {
        ...prevMemorial.privacy,
        passed: checked,
      },
    }));
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const musicInputRef = useRef(null);

  const handleMusicSelect = () => {
    musicInputRef.current.click();
  };

  const handleMusicUpload = async (e) => {
    const selectedMusic = e.target.files[0];
    setMusicLoading(true);

    const formData = new FormData();
    formData.append("backgroundMusic", selectedMusic); // Append the subMenu value as the form field name

    try {
      // Make a request to the backend endpoint based on the subMenu value
      let endpoint = `${backendUrl}/api/memorials/${id}`;

      const response = await axios.put(endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Handle the response, such as updating the component state with the updated memorial data
      fetchMemorial();
      setMusicLoading(false);
      setError(false);
    } catch (error) {
      console.error(error);
      setMusicLoading(false);
      setError(true);
    }
  };

  
  const galleryMenu = selectedTheme && {
    photo: (
      <>
        <p className="section-text">Add a Photo</p>
        <UploadBox
          device={true}
          facebook={true}
          handleFileInputChange={handleFileInputChange}
        />
        <div className="gallery">
          {memorial?.gallery.videos.length == 0 && (
            <div className="gallery-item"></div>
          )}
          {!loading ? (
            memorial?.gallery.photos.map((vid) => (
              <div className="gallery-item">
                <img src={vid} height="200" width="300" />
              </div>
            ))
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ProgressBar
                height="80"
                width="80"
                ariaLabel="progress-bar-loading"
                wrapperStyle={{}}
                wrapperClass="progress-bar-wrapper"
                borderColor={selectedTheme?.textColor || "#5c5470"}
                barColor={selectedTheme?.textColor || "#5c5470"}
              />
              <p
                style={{
                  color: selectedTheme?.textColor || "#5c5470",
                  fontSize: "10px",
                }}
              >
                Uploading ...
              </p>
            </div>
          )}
        </div>
      </>
    ),
    video: (
      <>
        <p className="section-text">Add a Video</p>
        <UploadBox
          device={true}
          facebook={true}
          handleFileInputChange={handleFileInputChange}
        />
        <div className="gallery">
          {memorial?.gallery.videos.length == 0 && (
            <div className="gallery-item"></div>
          )}
          {!loading ? (
            memorial?.gallery.videos.map((vid) => (
              <div className="gallery-item">
                <iframe src={vid} sandbox width="300" height="200"  frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowFullScreen="true"></iframe>
                {/* <video src={vid} controls height="200" width="300" /> */}
              </div>
            ))
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ProgressBar
                height="80"
                width="80"
                ariaLabel="progress-bar-loading"
                wrapperStyle={{}}
                wrapperClass="progress-bar-wrapper"
                borderColor={selectedTheme?.textColor || "#5c5470"}
                barColor={selectedTheme?.textColor || "#5c5470"}
              />
              <p
                style={{
                  color: selectedTheme?.textColor || "#5c5470",
                  fontSize: "10px",
                }}
              >
                Uploading ...
              </p>
            </div>
          )}
        </div>
      </>
    ),
    audio: (
      <>
        <p className="section-text">Add an Audio</p>
        <UploadBox
          device={true}
          facebook={true}
          handleFileInputChange={handleFileInputChange}
        />
        <div className="gallery">
          {memorial?.gallery.audios.length == 0 && (
            <div className="gallery-item"></div>
          )}
          {!loading ? (
            memorial?.gallery.audios.map((vid) => (
              <div className="gallery-item">
                <audio src={vid} controls={true} />
              </div>
            ))
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ProgressBar
                height="80"
                width="80"
                ariaLabel="progress-bar-loading"
                wrapperStyle={{}}
                wrapperClass="progress-bar-wrapper"
                borderColor={selectedTheme?.textColor || "#5c5470"}
                barColor={selectedTheme?.textColor || "#5c5470"}
              />
              <p
                style={{
                  color: selectedTheme?.textColor || "#5c5470",
                  fontSize: "10px",
                }}
              >
                Uploading ...
              </p>
            </div>
          )}
        </div>
      </>
    ),
  };
  const cardObject = selectedTheme && {
    about: (
      <Card Width="75vw">
        <div className="card-header">
          <Button
            disabled={!isAdmin()}
            bgColor={selectedTheme?.textColor || "#5c5470"}
            onClick={() => setCurrentTab("form")}
            icon={
              <svg
                width="19"
                height="19"
                viewBox="0 0 19 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.8299 4.0859L14.7474 0.992231C14.3451 0.61297 13.8179 0.395356 13.2661 0.380783C12.7143 0.366211 12.1765 0.555697 11.7549 0.913196L1.62974 11.0749C1.2661 11.4429 1.03968 11.9253 0.988484 12.441L0.504728 17.1493C0.489573 17.3147 0.510955 17.4814 0.567348 17.6375C0.623741 17.7936 0.713758 17.9353 0.830982 18.0526C0.936103 18.1572 1.06077 18.24 1.19784 18.2962C1.33491 18.3524 1.48168 18.3808 1.62974 18.38H1.73099L6.42229 17.9509C6.9362 17.8996 7.41684 17.6723 7.78356 17.3074L17.9087 7.14569C18.3017 6.72902 18.514 6.173 18.4993 5.59946C18.4845 5.02592 18.2438 4.48165 17.8299 4.0859ZM6.21979 15.6928L2.84475 16.0089L3.14851 12.6217L9.50483 6.32146L12.5424 9.36997L6.21979 15.6928ZM14.0049 7.85701L10.9898 4.83109L13.1836 2.57294L16.2549 5.65531L14.0049 7.85701Z"
                  fill="white"
                />
              </svg>
            }
            text="Edit"
            showDropdown={true}
          />
        </div>
        <div className="card-quote">
          <div className="quote">
            <div className="quote-content">
              <div style={{ margin: "15px" }}>
                <svg
                  width="46"
                  height="37"
                  viewBox="0 0 46 37"
                  fill={selectedTheme?.textColor || "#5c5470"}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.34173 5.59993C7.51251 2.16247 12.3105 0.420006 18.6001 0.420006H20.8601V6.79095L19.043 7.15481C15.9468 7.77405 13.793 8.99218 12.6405 10.7798C12.039 11.7429 11.698 12.8456 11.6506 13.98H18.6001C19.1995 13.98 19.7743 14.2181 20.1981 14.6419C20.622 15.0658 20.8601 15.6406 20.8601 16.24V32.06C20.8601 34.5528 18.8328 36.58 16.3401 36.58H2.78007C2.18068 36.58 1.60584 36.3419 1.18201 35.9181C0.758176 35.4942 0.52007 34.9194 0.52007 34.32V23.02L0.52685 16.4231C0.50651 16.1722 0.0771099 10.2284 4.34173 5.59993ZM41.2001 36.58H27.6401C27.0407 36.58 26.4658 36.3419 26.042 35.9181C25.6182 35.4942 25.3801 34.9194 25.3801 34.32V23.02L25.3869 16.4231C25.3665 16.1722 24.9371 10.2284 29.2017 5.59993C32.3725 2.16247 37.1705 0.420006 43.4601 0.420006H45.7201V6.79095L43.903 7.15481C40.8068 7.77405 38.6531 8.99218 37.5005 10.7798C36.8991 11.7429 36.558 12.8456 36.5106 13.98H43.4601C44.0595 13.98 44.6343 14.2181 45.0581 14.6419C45.482 15.0658 45.7201 15.6406 45.7201 16.24V32.06C45.7201 34.5528 43.6929 36.58 41.2001 36.58Z"
                    fill={selectedTheme?.textColor || "#5c5470"}
                  />
                </svg>
              </div>

              <p style={paragraphStyle} className="quote-main-text">
                Let the memory of {memorial?.firstName} be with us forever.
              </p>
            </div>
            <ul className="dot-list">
              <li style={paragraphStyle}>
                Born on{" "}
                {new Date(memorial?.birthDate).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}{" "}
                in {memorial?.country}
              </li>
              <li style={paragraphStyle}>
                Passed away on{" "}
                {new Date(memorial?.passedDate).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}{" "}
                in {memorial?.deathCountry}
              </li>
            </ul>
          </div>
          <p style={paragraphStyle} className="section-text">
            Tribute
          </p>
        </div>
        {memorial &&
          memorial.about.tributes.map((tribute, idx) => (
            <Card Width="65vw">
              <div id={`${idx}`} className="content-card">
                <div className="picture">
                  {/* Your picture component or image goes here */}
                  <img src={tribute.user?.displayPicture || dummy} />
                </div>
                <div className="text">
                  <p style={paragraphStyle} className="name-text">
                    {tribute?.user?.name || "Guest"}
                  </p>
                  <p style={paragraphStyle} className="date-text">
                    {new Date(tribute.date).toLocaleString()}
                  </p>
                  <p style={paragraphStyle} className="card-description">
                    {tribute.description}
                  </p>
                  <div className="share-button">
                    <a>
                      <Button
                        bgColor={selectedTheme?.textColor || "#5c5470"}
                        onClick={() => {
                          const link = `http://willalwaysloveu.com/profile/${id}#about-${idx}`;
                          handleCopyClick(link);
                        }}
                        icon={
                          <svg
                            width="24"
                            height="25"
                            viewBox="0 0 24 25"
                            fill={selectedTheme?.textColor || "#5c5470"}
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M18 21.12C19.6569 21.12 21 19.7768 21 18.12C21 16.4631 19.6569 15.12 18 15.12C16.3431 15.12 15 16.4631 15 18.12C15 19.7768 16.3431 21.12 18 21.12Z"
                              stroke="white"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M9 13.62L15 16.62"
                              stroke="white"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M6 15.12C7.65685 15.12 9 13.7768 9 12.12C9 10.4631 7.65685 9.12 6 9.12C4.34315 9.12 3 10.4631 3 12.12C3 13.7768 4.34315 15.12 6 15.12Z"
                              stroke="white"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M15 7.62L9 10.62"
                              stroke="white"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M18 9.12C19.6569 9.12 21 7.77685 21 6.12C21 4.46314 19.6569 3.12 18 3.12C16.3431 3.12 15 4.46314 15 6.12C15 7.77685 16.3431 9.12 18 9.12Z"
                              stroke="white"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        }
                        text="Share"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </Card>
          ))}

        <p style={paragraphStyle} className="section-text">
          Leave a Tribute
        </p>
        <div className="input-div">
          <textarea
            onChange={(e) => setTributeText(e.target.value)}
            style={{
              border: `1px solid ${selectedTheme?.textColor || "#5c5470"}`,
            }}
            className="multiline-input"
            rows={4}
          ></textarea>

          <div style={{ marginTop: "20px" }} className="btn-section">
            <Button
              isLoading={isTributeLoading}
              onClick={addTribute}
              bgColor={selectedTheme?.textColor || "#5c5470"}
              text="Publish"
            />
          </div>
        </div>
      </Card>
    ),
    form: (
      <Card>
        <Card.Header>
          <p className="title">About your loved one:</p>
        </Card.Header>
        <Card.Content>
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={editData.firstName}
                onChange={(e) => handleEditChange(e)}
              />
            </div>
            <div className="form-field">
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={editData?.lastName}
                onChange={(e) => handleEditChange(e)}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="relationship">Relationship:</label>
              <select
                className="custom-arrow"
                id="relationship"
                name="relationship"
                value={editData?.relationship}
                onChange={(e) => handleEditChange(e)}
              >
                <option value="">Select</option>
                {relationships.map((relationship) => (
                  <option value={relationship} key={relationship}>
                    {relationship}
                  </option>
                ))}
                {/* Options for relationship selection */}
              </select>
            </div>
            <div className="form-field">
              <label htmlFor="radio-id">Gender:</label>
              <div id="radio-id" className="radio-group">
                {/* Radio buttons for gender selection */}
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={editData?.gender === "male"}
                    onChange={(e) => handleEditChange(e)}
                  />
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={editData?.gender === "female"}
                    onChange={(e) => handleEditChange(e)}
                  />
                  Female
                </label>
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="memorialDesignation">Memorial Designation:</label>
              <select
                id="memorialDesignation"
                name="memorialDesignation"
                value={editData?.memorialDestination}
                onChange={(e) => handleEditChange(e)}
              >
                <option value="">Select</option>
                {memorialDestinations.map((relationship) => (
                  <option value={relationship} key={relationship}>
                    {relationship}
                  </option>
                ))}
                {/* Options for memorial designation selection */}
                <option>Select</option>
              </select>
            </div>
            <div className="form-field">
              <label htmlFor="country">Country:</label>
              <select
                id="country"
                name="country"
                value={editData?.country}
                onChange={(e) => handleEditChange(e)}
              >
                <option value="">Select</option>
                {countries.map((relationship) => (
                  <option value={relationship} key={relationship}>
                    {relationship}
                  </option>
                ))}
                {/* Options for country selection */}
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="webAddress">Web address:</label>
              <input
                type="text"
                id="webAddress"
                name="webAddress"
                value={editData?.webAddress}
                onChange={(e) => handleEditChange(e)}
              />
            </div>
          </div>
        </Card.Content>

        <Card.Header>
          <p className="title">Birth:</p>
        </Card.Header>
        <Card.Content>
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="birthDate">Birth Date:</label>
              <input
                type="date"
                id="birthDate"
                name="birthDate"
                value={editData?.birthDate}
                onChange={(e) => handleEditChange(e)}
              />
            </div>
            <div className="form-field">
              <label htmlFor="birthPlace">Birth Place:</label>
              <input
                type="text"
                id="birthPlace"
                name="birthPlace"
                value={editData?.birthPlace}
                onChange={(e) => handleEditChange(e)}
              />
            </div>
          </div>
        </Card.Content>

        <Card.Header>
          <p className="title">Passed:</p>
        </Card.Header>
        <Card.Content>
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="passedDate">Passed Date:</label>
              <input
                type="date"
                id="passedDate"
                name="passedDate"
                value={editData?.passedDate}
                onChange={(e) => handleEditChange(e)}
              />
            </div>
            <div className="form-field">
              <label htmlFor="deathPlace">Death Place:</label>
              <input
                type="text"
                id="deathPlace"
                name="deathPlace"
                value={editData?.deathPlace}
                onChange={(e) => handleEditChange(e)}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="deathCountry">Death Country:</label>
              <input
                type="text"
                id="deathCountry"
                name="deathCountry"
                value={editData?.deathCountry}
                onChange={(e) => handleEditChange(e)}
              />
            </div>
          </div>
        </Card.Content>

        <div className="right">
          <button className="cancel-btn" onClick={() => setCurrentTab("about")}>
            Cancel
          </button>
          <Button
            onClick={handleMemorialSubmit}
            bgColor={selectedTheme?.textColor || "#5c5470"}
            isLoading={isEditLoading}
            className="save-btn"
            text="Save"
          />
        </div>
      </Card>
    ),
    backgroundMusic: (
      <Card>
        <Card.Header>
          <p className="title">Background playlist:</p>
        </Card.Header>
        <Card.Content>
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="relationship" style={{ marginBottom: "20px" }}>
                {currentMusic
                  ? currentMusic.split("/").pop().replace(".mp3", "")
                  : "No background Music"}
              </label>
              <select
                className="custom-arrow"
                id="relationship"
                name="relationship"
                defaultValue={memorial?.backgroundMusic[1]}
                value={currentMusic}
                onChange={(e) => setCurrentMusic(e.target.value)}
              >
                <option value="">Select</option>
                {memorial?.backgroundMusic.map((music) => {
                  const musicName = music.split("/").pop().replace(".mp3", "");
                  return (
                    <option value={music} key={music}>
                      {musicName}
                    </option>
                  );
                })}
                {/* Options for relationship selection */}
              </select>
            </div>
          </div>
          <div>
            <input
              ref={musicInputRef}
              type="file"
              accept="audio/*"
              onChange={handleMusicUpload}
              style={{ display: "none" }}
            />
            <Button
              isLoading={loadingMusic}
              onClick={handleMusicSelect}
              bgColor={selectedTheme?.textColor || "#5c5470"}
              icon={
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 17 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.125 17C1.54063 17 1.04019 16.7917 0.623689 16.3752C0.207189 15.9587 -0.000706529 15.4587 1.80391e-06 14.875V11.6875H2.125V14.875H14.875V11.6875H17V14.875C17 15.4594 16.7917 15.9598 16.3753 16.3763C15.9588 16.7928 15.4587 17.0007 14.875 17H2.125ZM7.4375 12.75V4.09062L4.675 6.85312L3.1875 5.3125L8.5 0L13.8125 5.3125L12.325 6.85312L9.5625 4.09062V12.75H7.4375Z"
                    fill="white"
                  />
                </svg>
              }
              className="save-btn"
              text="Add your own music"
            />
          </div>
        </Card.Content>

        <div className=""></div>
      </Card>
    ),
    phrase: (
      <Card>
        <div className="card-header">
          <div className="intro-section-new">
            <p className="section-text">Personal phrase</p>

            <ReactQuill
              style={{ border: "none", color: "black" }}
              className="react-quill"
              theme="snow"
              value={value}
              onChange={setValue}
            />
          </div>
        </div>
        <Card>
          <div className="content-card">
            <div className="picture">
              {/* Your picture component or image goes here */}
              <img src={Profilepicture} />
            </div>
            <div className="text">
              <p className="name-text">Sayed Adnan</p>
              <p className="date-text">May 24</p>
              <p className="card-description">
                I too have fond memories of cycling the Marble Mountain loop
                with Barb and other friends; she was such a smooth cyclist! I
                was so impressed that she biked in former Soviet Union countries
                (Slovenia and the Czech Republic, I think) all by herself, as
                well as in many countries in Europe with friends. She was also
                very willing to help. At Obsidian Summer Camp, she was often a
                lead person on various food related tasks. And she was very
                proud of her family and their accomplishments.
              </p>
              <div className="share-button">
                <a>
                  <Button
                    icon={
                      <svg
                        width="24"
                        height="25"
                        viewBox="0 0 24 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18 21.12C19.6569 21.12 21 19.7768 21 18.12C21 16.4631 19.6569 15.12 18 15.12C16.3431 15.12 15 16.4631 15 18.12C15 19.7768 16.3431 21.12 18 21.12Z"
                          stroke="white"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M9 13.62L15 16.62"
                          stroke="white"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M6 15.12C7.65685 15.12 9 13.7768 9 12.12C9 10.4631 7.65685 9.12 6 9.12C4.34315 9.12 3 10.4631 3 12.12C3 13.7768 4.34315 15.12 6 15.12Z"
                          stroke="white"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M15 7.62L9 10.62"
                          stroke="white"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M18 9.12C19.6569 9.12 21 7.77685 21 6.12C21 4.46314 19.6569 3.12 18 3.12C16.3431 3.12 15 4.46314 15 6.12C15 7.77685 16.3431 9.12 18 9.12Z"
                          stroke="white"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    }
                    text="Share"
                  />
                </a>
              </div>
            </div>
          </div>
        </Card>

        <p className="section-text">Leave a Tribute</p>
        <div className="input-div">
          <textarea className="multiline-input" rows={4}></textarea>
          <div className="input-foot">
            <div className="foot-text-1">by Adnan</div>
            <div className="foot-text-2">
              Change
              <svg
                width="10"
                height="7"
                viewBox="0 0 10 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 1.12L5 5.12L1 1.12"
                  stroke="#5C5470"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
          <div className="btn-section">
            <Button text="Publish" />
          </div>
        </div>
      </Card>
    ),
    life: (
      <Card Width="90vw">
        <div className="card-header">
          {isAdmin() && (
            <div className="intro-section-new">
              <p className="card-description-life">
                In this section, you can create a chapter by chapter biography
                of your loved one's life. You can help others to get to know
                more intimately and for a moment experience the world through
                his eyes. Describe memorable dates and events from his
                childhood, youth, and adult life. Collaborate with other members
                of your family to build a complete and rich life story
              </p>
              <p className="section-text">Add a life story chapter</p>
              <input
                value={storyTitle1}
                onChange={(e) => setStoryTitle1(e.target.value)}
                placeholder="Title"
                className="title-input"
              />
              <ReactQuill
                style={{ border: "none", color: "black" }}
                className="react-quill-2"
                theme="snow"
                value={storyDesc1}
                onChange={setStoryDesc1}
              />
            </div>
          )}
        </div>

        <p className="section-text">Life Chapters</p>
        {isAdmin() && (
          <div className="input-div">
            <UploadBox
              handleFileInputChange={handleLifeFile}
              facebook={true}
              device={true}
            />
            <div style={{ marginBottom: "10px" }} className="input-foot">
              <div className="foot-text-1"> </div>
              <div className="foot-text-2"></div>
            </div>
            <div className="btn-section">
              <Button
                onClick={handleLifeSubmit}
                bgColor={selectedTheme?.textColor}
                isLoading={loading}
                text="Publish"
              />
            </div>
          </div>
        )}
        {memorial?.life?.map((item) => {
          return (
            <Card Width="80%">
              <div className="story-img">
                <img src={item.attachments[0]} />
              </div>
              <div className="story-title">
                <p className="title1">{item.title}</p>
                <p className="story-date">
                  {" "}
                  {new Date(item?.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}{" "}
                  by {item.author}
                </p>
              </div>
              <p className="story-para">{parse(item.description)}</p>
              <div className="story-btn">
                <Button bgColor={selectedTheme?.textColor} text="Share" />
              </div>
            </Card>
          );
        })}
      </Card>
    ),
    createStory: (
      <Card>
        <div className="card-header">
          <div className="intro-section-new">
            <p className="card-description-life">
              In this section, you can create a chapter by chapter biography of
              your loved one's life. You can help others to get to know more
              intimately and for a moment experience the world through his eyes.
              Describe memorable dates and events from his childhood, youth, and
              adult life. Collaborate with other members of your family to build
              a complete and rich life story
            </p>
            <p className="section-text">Add a story </p>
            <input
              value={storyTitle}
              onChange={(e) => setStoryTitle(e.target.value)}
              placeholder="Title"
              className="title-input"
            />
            <ReactQuill
              style={{ border: "none", color: "black" }}
              className="react-quill-2"
              theme="snow"
              value={storyDesc}
              onChange={setStoryDesc}
            />
          </div>
        </div>

        <p className="section-text">Leave a Tribute</p>
        <div className="input-div">
          <UploadBox
            handleFileInputChange={handleStoryFile}
            facebook={true}
            device={true}
          />
          <div style={{ marginBottom: "10px" }} className="input-foot">
            <div className="foot-text-1"> </div>
            <div className="foot-text-2"></div>
          </div>

          <div className="btn-section">
            <Button
              onClick={handleStorySubmit}
              bgColor={selectedTheme?.textColor}
              isLoading={loading}
              text="Publish"
            />
          </div>
        </div>
      </Card>
    ),
    gallery: (
      <Card Width="80vw">
        <div
          style={{ border: "none", marginTop: 0, justifyContent: "flex-start" }}
          className="tabs-container"
        >
          <div className="tab-links">
            <ul className="ul-row">
              <li>
                <a
                  onClick={() => {
                    setSubMenu("photo");
                  }}
                  className={`${subMenu == "photo" ? "tag-active" : "tag"}`}
                >
                  Photo
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    setSubMenu("video");
                  }}
                  className={`${subMenu == "video" ? "tag-active" : "tag"}`}
                >
                  Video
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    setSubMenu("audio");
                  }}
                  className={`${subMenu == "audio" ? "tag-active" : "tag"}`}
                >
                  Audio
                </a>
              </li>
            </ul>
          </div>
        </div>
        {galleryMenu[subMenu]}
      </Card>
    ),
    privacy: (
      <Card Width="75vw">
        <p className="dialog-header">{"Privacy & Notifications"}</p>
        <div className="dialog-content">
          <div className="privacy-checkbox-section">
            <p className="youremail">Privacy Options:</p>
            <div className="privacy-checkbox-group-1">
              <div className="checkbox-container">
                <label className="custom-checkbox">
                  <input
                    type="checkbox"
                    checked={memorial?.privacy.onlyme}
                    onChange={handleOnlyMeChange}
                  />
                  <span className="checkmark"></span>
                  Visible only to me
                </label>

                <p>
                  Choose this option if you do not want the <br /> memorial to
                  be visible to others at this time.
                </p>
              </div>
              <div className="checkbox-container">
                <label className="custom-checkbox">
                  <input
                    type="checkbox"
                    checked={memorial?.privacy.birthday}
                    onChange={handleBirthdayChange}
                  />
                  <span className="checkmark"></span>
                  On {memorial?.firstName}’s Birthday
                </label>

                <p>
                  Recommended for most memorials. This <br /> option allows easy
                  access to the website and <br /> facilitates collaboration.{" "}
                </p>
              </div>
              <div className="checkbox-container">
                <label className="custom-checkbox">
                  <input
                    type="checkbox"
                    checked={memorial?.privacy.passed}
                    onChange={handlePassedChange}
                  />
                  <span className="checkmark"></span>
                  On day of passing
                </label>
                <p>
                  This option enables access to the people you <br /> wish to
                  invite while keeping the memorial <br /> hidden from public
                  view.
                </p>
              </div>
            </div>
          </div>
          <div className="notification-section">
            <p className="youremail">Default Notification:</p>
            <div className="privacy-checkbox-group-2">
              <div className="checkbox-container">
                <label className="custom-checkbox">
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                  Standard
                </label>
                {/* <p>This option enables access to the people you <br/> wish to invite while keeping the memorial <br/> hidden from public view.</p> */}
              </div>
              <div
                style={{ marginTop: "10px " }}
                className="checkbox-container"
              >
                <label className="custom-checkbox">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                  />
                  <span className="checkmark"></span>
                  Custom
                </label>
                <p>
                  Recommended for most memorials. This <br /> option allows easy
                  access to the website and <br /> facilitates collaboration.{" "}
                </p>
              </div>

              <div className="checkbox-container">
                <label className="custom-checkbox">
                  <input
                    type="checkbox"
                    checked={isChecked1}
                    onChange={handleCheckboxChange1}
                  />
                  <span className="checkmark"></span>
                  <a className="action-btn">
                    <svg
                      width="22"
                      height="26"
                      viewBox="0 0 22 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.22223 26C0.87593 26 0.585448 25.8752 0.350782 25.6256C0.116115 25.376 -0.000810585 25.0675 4.22914e-06 24.7V18.2C4.22914e-06 17.485 0.23956 16.8727 0.718671 16.3631C1.19778 15.8535 1.77304 15.5991 2.44445 15.6V10.4C2.44445 9.685 2.684 9.0727 3.16311 8.5631C3.64223 8.0535 4.21748 7.79913 4.88889 7.8H9.77778V5.915C9.41111 5.655 9.11574 5.34083 8.89167 4.9725C8.66759 4.60417 8.55556 4.16 8.55556 3.64C8.55556 3.315 8.61667 2.9952 8.73889 2.6806C8.86111 2.366 9.04445 2.07913 9.28889 1.82L11 0L12.7111 1.82C12.9556 2.08 13.1389 2.36687 13.2611 2.6806C13.3833 2.99433 13.4444 3.31413 13.4444 3.64C13.4444 4.16 13.3324 4.60417 13.1083 4.9725C12.8843 5.34083 12.5889 5.655 12.2222 5.915V7.8H17.1111C17.7833 7.8 18.359 8.05436 18.8381 8.5631C19.3172 9.07183 19.5564 9.68413 19.5556 10.4V15.6C20.2278 15.6 20.8034 15.8548 21.2826 16.3644C21.7617 16.874 22.0008 17.4859 22 18.2V24.7C22 25.0683 21.8827 25.3773 21.648 25.6269C21.4133 25.8765 21.1233 26.0009 20.7778 26H1.22223ZM4.88889 15.6H17.1111V10.4H4.88889V15.6ZM2.44445 23.4H19.5556V18.2H2.44445V23.4Z"
                        fill="#5C5470"
                      />
                    </svg>
                  </a>
                  On {memorial?.firstName}’s Birthday
                </label>
              </div>
              <div className="checkbox-container">
                <label className="custom-checkbox">
                  <input
                    type="checkbox"
                    checked={isChecked2}
                    onChange={handleCheckboxChange2}
                  />
                  <span className="checkmark"></span>
                  <a className="action-btn">
                    <svg
                      width="25"
                      height="21"
                      viewBox="0 0 25 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.8879 0C15.7231 0 13.8017 0.83263 12.5 2.26375C11.1983 0.83263 9.27694 0 7.11207 0C5.22653 0.0022229 3.41887 0.733042 2.0856 2.03216C0.752319 3.33127 0.00228135 5.09261 0 6.92983C0 14.5254 11.4019 20.5942 11.8869 20.8494C12.0753 20.9482 12.286 21 12.5 21C12.714 21 12.9247 20.9482 13.1131 20.8494C13.5981 20.5942 25 14.5254 25 6.92983C24.9977 5.09261 24.2477 3.33127 22.9144 2.03216C21.5811 0.733042 19.7735 0.0022229 17.8879 0ZM17.2963 14.9474C15.7955 16.1883 14.1912 17.3052 12.5 18.2864C10.8088 17.3052 9.20445 16.1883 7.70366 14.9474C5.36853 12.9955 2.58621 10.0189 2.58621 6.92983C2.58621 5.76026 3.06304 4.63858 3.9118 3.81157C4.76056 2.98455 5.91174 2.51994 7.11207 2.51994C9.03017 2.51994 10.6358 3.50692 11.3028 5.09658C11.3999 5.32832 11.5656 5.52663 11.7788 5.66622C11.9921 5.80581 12.2431 5.88037 12.5 5.88037C12.7569 5.88037 13.0079 5.80581 13.2212 5.66622C13.4344 5.52663 13.6001 5.32832 13.6972 5.09658C14.3642 3.50692 15.9698 2.51994 17.8879 2.51994C19.0883 2.51994 20.2394 2.98455 21.0882 3.81157C21.937 4.63858 22.4138 5.76026 22.4138 6.92983C22.4138 10.0189 19.6315 12.9955 17.2963 14.9474Z"
                        fill="#5C5470"
                      />
                    </svg>
                  </a>
                  On day of passing
                </label>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{ display: "flex", width: "100%", justifyContent: "flex-end" }}
          className="dialog-action chk"
        >
          <Button
            isLoading={privacyLoading}
            onClick={UpdatePrivacy}
            text="Update Privacy Setting"
          />
        </div>
      </Card>
    ),
    stories: (
      <div className="story-container">
        <Card Width="80%">
          <div className="story-header">
            <p style={{ color: selectedTheme?.textColor }}>
              Share a special moment from {memorial?.firstName}'s life
            </p>
            <Button
              onClick={() => setCurrentTab("createStory")}
              bgColor={selectedTheme?.textColor}
              text="Write A Story"
            />
          </div>
        </Card>
        {memorial?.story.map((item, idx) => {
          const stringWithoutPTag = item.description.replace(/<\/?p>/g, "");
          return (
            <Card Width="80%">
              <div id={`${idx}`} className="story-img">
                <img
                  style={{ borderRadius: "10px" }}
                  src={item.attachments[0]}
                />
              </div>
              <div className="story-title">
                <p className="title1">{item.title}</p>
                <p className="story-date">
                  {" "}
                  {new Date(item?.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}{" "}
                  by {item.author}
                </p>
              </div>
              <p className="story-para">{parse(item.description)}</p>
              <div className="story-btn">
                <Button
                  onClick={() => {
                    const link = `http://localhost:3000/profile/${id}#stories-${idx}`;
                    handleCopyClick(link);
                  }}
                  bgColor={selectedTheme?.textColor}
                  text="Share"
                />
              </div>
            </Card>
          );
        })}
      </div>
    ),
    manageVisitor: (
      <Card Width="90%">
        <p className="manage-title1">
          Use this section to view and manage invited guests:
        </p>
        <p className="manage-title2">Manage visitors</p>
        <div className="manage-btn-section">
          <p
            style={{ color: selectedTheme?.textColor }}
            className="visited-btn"
          >
            Visited {`(${memorial?.visitors.length})`}
          </p>
        </div>
        <div className="manage-box">
          {memorial?.visitors.map((item) => (
            <div
              style={{
                display: "flex",
                gap: "15px",
                justifyContent: "center",
                alignItems: "center",
                color: selectedTheme?.textColor,
              }}
            >
              <Avatar /> {item}
            </div>
          ))}
        </div>
      </Card>
    ),
  };
  const fileInputRef = React.useRef(null);

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };
  return (
    <div style={{ color: "red" }} className="theme-container">
      {memorial && (isAdmin() || memorial.publicVisibility) ? (
        <>
          <div className="cover-picture">
            <img src={selectedTheme?.backgroundImg} />
          </div>
          <div className="profile-picture" onClick={handleAvatarClick}>
            {isImgLoading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "80px",
                }}
              >
                <ProgressBar
                  height="80"
                  width="80"
                  ariaLabel="progress-bar-loading"
                  wrapperStyle={{}}
                  wrapperClass="progress-bar-wrapper"
                  borderColor={selectedTheme?.textColor || "#5c5470"}
                  barColor={selectedTheme?.textColor || "#5c5470"}
                />
              </div>
            ) : (
              <>
                <img src={memorial?.displayPicture || dummy} />
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  disabled={!isAdmin()}
                  onChange={handleDisplayPictureChange}
                  style={{ display: "none" }}
                />
              </>
            )}
          </div>
          <div className="name-container">
            <div style={{ marginTop: "10px" }} className="name-section">
              <p
                style={{
                  color: `${selectedTheme?.textColor || "#5c5470"}`,
                  marginTop: "22px",
                }}
              >{`${memorial?.firstName} ${memorial?.lastName}`}</p>
              {!isPlaying ? (
                <svg
                  onClick={handleSvgClick}
                  xmlns="http://www.w3.org/2000/svg"
                  height="28"
                  width="28"
                  viewBox="0 0 512 512"
                >
                  <path
                    d="M215.03 71.05L126.06 160H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V88.02c0-21.46-25.96-31.98-40.97-16.97zM461.64 256l45.64-45.64c6.3-6.3 6.3-16.52 0-22.82l-22.82-22.82c-6.3-6.3-16.52-6.3-22.82 0L416 210.36l-45.64-45.64c-6.3-6.3-16.52-6.3-22.82 0l-22.82 22.82c-6.3 6.3-6.3 16.52 0 22.82L370.36 256l-45.63 45.63c-6.3 6.3-6.3 16.52 0 22.82l22.82 22.82c6.3 6.3 16.52 6.3 22.82 0L416 301.64l45.64 45.64c6.3 6.3 16.52 6.3 22.82 0l22.82-22.82c6.3-6.3 6.3-16.52 0-22.82L461.64 256z"
                    fill={selectedTheme?.textColor}
                  />
                </svg>
              ) : (
                <svg
                  onClick={handleSvgClick}
                  cursor="pointer"
                  width="26"
                  height="24"
                  viewBox="0 0 26 24"
                  fill={selectedTheme?.textColor}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.031 0.0520186C11.71 0.0530186 11.355 0.197019 11.031 0.520019L5.312 6.98902H1C0.449 6.98902 0 7.43802 0 7.98902V15.989C0 16.54 0.449 16.989 1 16.989H5.313L11 23.427C12 24.427 13 23.915 13 22.552V1.26902C13 0.478019 12.567 0.0470186 12.031 0.0500186V0.0520186ZM19.281 2.05202C19.0683 2.08912 18.8734 2.19405 18.7253 2.35114C18.5772 2.50822 18.4839 2.70901 18.4593 2.92351C18.4348 3.138 18.4803 3.35467 18.5891 3.54114C18.698 3.72761 18.8642 3.87385 19.063 3.95802C20.5507 4.70595 21.8006 5.85351 22.6726 7.27202C23.5447 8.69053 24.0043 10.3239 24 11.989C24 15.513 22 18.539 19.062 20.02C18.9283 20.0665 18.806 20.1409 18.7032 20.2382C18.6004 20.3355 18.5194 20.4536 18.4656 20.5845C18.4118 20.7155 18.3865 20.8563 18.3912 20.9978C18.3959 21.1393 18.4306 21.2782 18.493 21.4052C18.5554 21.5323 18.644 21.6447 18.7531 21.7349C18.8622 21.8252 18.9892 21.8912 19.1257 21.9287C19.2622 21.9662 19.4051 21.9743 19.5449 21.9525C19.6848 21.9307 19.8184 21.8794 19.937 21.802C23.53 19.989 26 16.277 26 11.989C26 7.70102 23.529 3.98902 19.937 2.17602C19.7659 2.08051 19.5704 2.03739 19.375 2.05202C19.3437 2.05055 19.3123 2.05055 19.281 2.05202ZM16.906 5.92602C16.6907 5.94183 16.4863 6.0269 16.3233 6.16852C16.1603 6.31014 16.0476 6.50069 16.0019 6.7117C15.9562 6.92271 15.98 7.14284 16.0698 7.33919C16.1596 7.53554 16.3105 7.69755 16.5 7.80102C18.043 8.76002 19 10.279 19 11.989C19 13.711 18.028 15.25 16.469 16.208C16.3465 16.2719 16.2386 16.3605 16.1521 16.4682C16.0655 16.5758 16.0022 16.7003 15.9662 16.8336C15.9301 16.967 15.9221 17.1064 15.9426 17.243C15.9631 17.3796 16.0117 17.5105 16.0853 17.6274C16.1588 17.7443 16.2559 17.8447 16.3702 17.9222C16.4845 17.9998 16.6137 18.0528 16.7495 18.0779C16.8853 18.1031 17.0249 18.0998 17.1594 18.0683C17.2939 18.0368 17.4204 17.9778 17.531 17.895C19.601 16.625 21 14.465 21 11.989C21 9.52802 19.613 7.35602 17.562 6.08302C17.3944 5.97598 17.1988 5.92132 17 5.92602C16.9687 5.92454 16.9373 5.92454 16.906 5.92602Z"
                    fill={selectedTheme?.textColor}
                  />
                </svg>
              )}
              <audio ref={audioRef} src={currentMusic} autoPlay />
            </div>
            {memorial?.birthDate && (
              <p style={paragraphStyle} className="date-section">{`${
                memorial?.birthDate?.split("-")[0] || ""
              } - ${memorial?.passedDate?.split("-")[0] || ""}`}</p>
            )}
          </div>
          <div className="tabs-container">
            <div className="tab-links">
              <ul className="ul-row">
                <li>
                  <a
                    onClick={() => {
                      setCurrentTab("about");
                    }}
                    className={`${
                      currentTab === "about" ? "tag-active" : "tag"
                    }`}
                    style={paragraphStyle}
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      setCurrentTab("life");
                    }}
                    className={`${
                      currentTab === "life" ? "tag-active" : "tag"
                    }`}
                    style={paragraphStyle}
                  >
                    Life
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      setCurrentTab("gallery");
                    }}
                    className={`${
                      currentTab === "gallery" ? "tag-active" : "tag"
                    }`}
                    style={paragraphStyle}
                  >
                    Gallery
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      setCurrentTab("stories");
                    }}
                    className={`${
                      currentTab === "stories" ? "tag-active" : "tag"
                    }`}
                    style={paragraphStyle}
                  >
                    Stories
                  </a>
                </li>
                {isAdmin() && (
                  <li>
                    <div className="">
                      <div className="custom-dropdown" ref={dropdownRef}>
                        <div
                          className="dropdown-header"
                          onClick={() => handleDropdownToggle()}
                        >
                          <label
                            className="tag-admin"
                            style={{ color: selectedTheme?.textColor }}
                            htmlFor="relationship"
                          >
                            ADMIN
                            <span
                              style={{ color: selectedTheme?.textColor }}
                              className="dropdown-arrow"
                            >
                              &#9662;
                            </span>
                          </label>
                        </div>
                        {dropdownOpen && (
                          <ul className="dropdown-options">
                            {[
                              { ref: "manageVisitor", title: "Visitors" },
                              { ref: "privacy", title: "Privacy settings" },
                              { ref: "themes", title: "Themes" },
                              {
                                ref: "backgroundMusic",
                                title: "Background music",
                              },
                            ].map((item) => (
                              <>
                                <li>
                                  <a
                                    href={
                                      item.ref == "themes" ? "/theme" : null
                                    }
                                    className="item-a"
                                    onClick={() => {
                                      setCurrentTab(item.ref);
                                      handleDropdownToggle();
                                    }}
                                  >
                                    {item.title}
                                  </a>
                                </li>
                              </>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </div>

          <div className="card-container">
            {selectedTheme && cardObject[currentTab]}
            <div className="side-section">
              <Card>
                <div className="invitation-card">
                  <svg
                    width="102"
                    height="59"
                    viewBox="0 0 102 59"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21.5417 50.5417V58.9583H72.0417V50.5417C72.0417 50.5417 72.0417 33.7083 46.7917 33.7083C21.5417 33.7083 21.5417 50.5417 21.5417 50.5417ZM34.1667 12.6667C34.1667 10.1697 34.9071 7.72877 36.2944 5.65259C37.6816 3.57642 39.6534 1.95825 41.9603 1.00269C44.2672 0.0471344 46.8057 -0.202883 49.2547 0.284256C51.7037 0.771394 53.9533 1.97381 55.7189 3.73945C57.4845 5.50508 58.6869 7.75464 59.1741 10.2037C59.6612 12.6527 59.4112 15.1911 58.4556 17.498C57.5001 19.805 55.8819 21.7767 53.8057 23.164C51.7296 24.5512 49.2887 25.2917 46.7917 25.2917C43.4433 25.2917 40.2321 23.9615 37.8644 21.5939C35.4968 19.2262 34.1667 16.015 34.1667 12.6667ZM20.7 33.9608C18.3996 36.0831 16.545 38.6424 15.2444 41.4892C13.9438 44.336 13.2233 47.4134 13.125 50.5417V58.9583H0.5V50.5417C0.5 50.5417 0.499992 36.0229 20.7 33.9608ZM25.75 0.0416689C27.0215 0.0424298 28.2851 0.2412 29.4954 0.630835C27.0333 4.1615 25.7132 8.36231 25.7132 12.6667C25.7132 16.971 27.0333 21.1718 29.4954 24.7025C28.2851 25.0921 27.0215 25.2909 25.75 25.2917C22.4016 25.2917 19.1904 23.9615 16.8228 21.5939C14.4551 19.2262 13.125 16.015 13.125 12.6667C13.125 9.31831 14.4551 6.10709 16.8228 3.73945C19.1904 1.3718 22.4016 0.0416689 25.75 0.0416689ZM67.8333 21.0833H80.4583V8.45834H88.875V21.0833H101.5V29.5H88.875V42.125H80.4583V29.5H67.8333V21.0833Z"
                      fill={selectedTheme?.textColor || "#5c5470"}
                      fill-opacity="0.5"
                    />
                  </svg>
                  <p className="invitation-card-text">
                    Invite {memorial?.firstName}'s family and friends
                  </p>

                  <Button
                    onClick={() => {
                      // Copy any necessary text here
                      const link = `${backendUrl}/profile/${id}`;
                      handleCopyClick(link);

                      // Open Facebook.com in a new tab after a 2-second delay
                      setTimeout(() => {
                        window.open("https://www.facebook.com", "_blank");
                      }, 1000);
                    }}
                    bgColor={selectedTheme?.textColor || "#5c5470"}
                    text="Invite"
                  />

                  <div className="social-media-fb">
                    <svg
                      width="21"
                      height="21"
                      viewBox="0 0 21 21"
                      fill={selectedTheme?.textColor || "#5c5470"}
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.75 0.5C17.783 0.5 18.6662 0.866753 19.3997 1.60026C20.1332 2.33377 20.5 3.21701 20.5 4.25V16.75C20.5 17.783 20.1332 18.6662 19.3997 19.3997C18.6662 20.1332 17.783 20.5 16.75 20.5H14.3021V12.7526H16.8932L17.2839 9.73177H14.3021V7.80469C14.3021 7.31858 14.4041 6.95399 14.6081 6.71094C14.8121 6.46788 15.2092 6.34635 15.7995 6.34635L17.388 6.33333V3.63802C16.8411 3.5599 16.0686 3.52083 15.0703 3.52083C13.8898 3.52083 12.9457 3.86806 12.2383 4.5625C11.5308 5.25694 11.1771 6.23785 11.1771 7.50521V9.73177H8.57292V12.7526H11.1771V20.5H4.25C3.21701 20.5 2.33377 20.1332 1.60026 19.3997C0.866753 18.6662 0.5 17.783 0.5 16.75V4.25C0.5 3.21701 0.866753 2.33377 1.60026 1.60026C2.33377 0.866753 3.21701 0.5 4.25 0.5H16.75Z"
                        fill={selectedTheme?.textColor || "#5c5470"}
                      />
                    </svg>
                    <p style={paragraphStyle}>Share on Facebook</p>
                  </div>
                </div>
              </Card>
              <Card>
                <div className="invitation-card">
                  <p style={paragraphStyle} className="invitation-card-text">
                    Notification preferences
                  </p>
                  <div className="action-buttons">
                    <a className="action-btn">
                      <TiLeaf
                        color={selectedTheme?.textColor || "#5c5470"}
                        size="2.5em"
                      />
                    </a>
                    <a className="action-btn">
                      <HiOutlineCake
                        color={selectedTheme?.textColor || "#5c5470"}
                        size="2.3em"
                      />
                    </a>
                    <a className="action-btn">
                      <BsChatLeftHeart
                        color={selectedTheme?.textColor || "#5c5470"}
                        size="2.1em"
                      />
                    </a>
                  </div>
                  <Button
                    disabled={!user || !isAdmin()}
                    bgColor={selectedTheme?.textColor || "#5c5470"}
                    onClick={handleClickOpen}
                    text="Manage"
                  />
                </div>
              </Card>
              <Card>
                <div className="invitation-card">
                  <div className="views-card-top">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M30.9396 15.66C29.7634 12.6176 27.7216 9.98662 25.0664 8.09209C22.4112 6.19756 19.2591 5.12257 15.9996 5C12.7401 5.12257 9.58796 6.19756 6.93278 8.09209C4.27759 9.98662 2.23574 12.6176 1.05957 15.66C0.980142 15.8797 0.980142 16.1203 1.05957 16.34C2.23574 19.3824 4.27759 22.0134 6.93278 23.9079C9.58796 25.8024 12.7401 26.8774 15.9996 27C19.2591 26.8774 22.4112 25.8024 25.0664 23.9079C27.7216 22.0134 29.7634 19.3824 30.9396 16.34C31.019 16.1203 31.019 15.8797 30.9396 15.66ZM15.9996 25C10.6996 25 5.09957 21.07 3.06957 16C5.09957 10.93 10.6996 7 15.9996 7C21.2996 7 26.8996 10.93 28.9296 16C26.8996 21.07 21.2996 25 15.9996 25Z"
                        fill="#5C5470"
                      />
                      <path
                        d="M16 10C14.8133 10 13.6533 10.3519 12.6666 11.0112C11.6799 11.6705 10.9109 12.6075 10.4567 13.7039C10.0026 14.8003 9.88378 16.0067 10.1153 17.1705C10.3468 18.3344 10.9182 19.4035 11.7574 20.2426C12.5965 21.0818 13.6656 21.6532 14.8295 21.8847C15.9933 22.1162 17.1997 21.9974 18.2961 21.5433C19.3925 21.0892 20.3295 20.3201 20.9888 19.3334C21.6481 18.3467 22 17.1867 22 16C22 14.4087 21.3679 12.8826 20.2426 11.7574C19.1174 10.6321 17.5913 10 16 10ZM16 20C15.2089 20 14.4355 19.7654 13.7777 19.3259C13.1199 18.8864 12.6072 18.2616 12.3045 17.5307C12.0017 16.7998 11.9225 15.9956 12.0769 15.2196C12.2312 14.4437 12.6122 13.731 13.1716 13.1716C13.731 12.6122 14.4437 12.2312 15.2196 12.0769C15.9956 11.9225 16.7998 12.0017 17.5307 12.3045C18.2616 12.6072 18.8864 13.1199 19.3259 13.7777C19.7654 14.4355 20 15.2089 20 16C20 17.0609 19.5786 18.0783 18.8284 18.8284C18.0783 19.5786 17.0609 20 16 20Z"
                        fill={selectedTheme?.textColor || "#5c5470"}
                      />
                    </svg>

                    <p style={paragraphStyle} className="views-top-text">
                      {memorial?.visitors.length} Views
                    </p>
                  </div>
                  <div className="views-card-content">
                    <p style={paragraphStyle} className="views-card-mainText">
                      This website is administered by:
                    </p>
                    <p style={paragraphStyle} className="views-card-secondary">
                      willalwaysloveuTech@gmail.com
                    </p>
                    {/* <p  style={paragraphStyle} className="views-card-secondary">Becky Bruns </p> */}
                  </div>
                  <Button
                    style={{ width: "fit-content", padding: "20px" }}
                    text="Contact to Author"
                    onClick={()=>handleCopyClick("willalwaysloveu@gmail.com")}
                    bgColor={selectedTheme?.textColor || "#5c5470"}
                  />
                </div>
              </Card>

              <Card>
                <div className="suggestion-card">
                  <p style={paragraphStyle}>Have a Suggestions?</p>
                  <Link to="/contactus">
                    <Button
                      bgColor={selectedTheme?.textColor || "#5c5470"}
                      text="Contact Us"
                    />
                  </Link>
                </div>
              </Card>
            </div>
          </div>
          {open && (
            <Dialog
              open={open}
              TransitionComponent={Transition}
              keepMounted
              fullWidth
              sx={{
                backdropFilter: "blur(5px) sepia(5%)",
              }}
              // 👇 Props passed to Paper (modal content)
              PaperProps={{ sx: { borderRadius: "15px", overflow: "hidden" } }}
              maxWidth="md"
              onClose={handleClose}
              aria-describedby="alert-dialog-slide-description"
            >
              <p className="dialog-header">{"Notification Preference"}</p>
              <div className="dialog-content">
                <div className="email-section">
                  <p className="youremail">Your Email:</p>
                  <div className="email-content">
                    <p className="email-p">{user?.email}</p>
                    {/* <a>Change</a> */}
                  </div>
                </div>
                <div className="notification-section">
                  <p className="youremail">Receive Notification:</p>
                  <div className="checkbox-container">
                    <label className="custom-checkbox">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                      />
                      <span className="checkmark"></span>
                      <a className="action-btn">
                        <TiLeaf size="2.5em" />
                      </a>
                      On new posts from other guests
                    </label>
                  </div>
                  <div className="checkbox-container special">
                    <label className="custom-checkbox special">
                      <input
                        type="checkbox"
                        checked={isChecked1}
                        onChange={handleCheckboxChange1}
                      />
                      <span className="checkmark"></span>
                      <a className="action-btn">
                        <HiOutlineCake size="2.3em" />
                      </a>
                      On {memorial?.firstName}’s Birthday
                    </label>
                  </div>
                  <div className="checkbox-container special">
                    <label className="custom-checkbox special">
                      <input
                        type="checkbox"
                        checked={isChecked2}
                        onChange={handleCheckboxChange2}
                      />
                      <span className="checkmark"></span>
                      <a className="action-btn">
                        <BsChatLeftHeart size="2.1em" />
                      </a>
                      On day of passing
                    </label>
                  </div>
                </div>
              </div>
              <div className="dialog-action">
                <div className="checkbox-container">
                  <label className="custom-checkbox">
                    <input
                      type="checkbox"
                      checked={isChecked3}
                      onChange={handleCheckboxChange3}
                    />
                    <span className="checkmark"></span>
                    Unsubscribe from all e-mails
                  </label>
                </div>
                <Button
                  isLoading={nloading}
                  bgColor={selectedTheme?.textColor || "#5c5470"}
                  onClick={() => {
                    handleSavePreferences();
                  }}
                  text="Save"
                />
              </div>
            </Dialog>
          )}
        </>
      ) : mainLoader ? (
        <div className="loading-state">
          <ThreeDots
            height="50"
            width="50"
            radius="9"
            color="#5c5470"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        </div>
      ) : mainError || !memorial?.publicVisibility ? (
        <div className="loading-state">
          <h1>404 NOT FOUND</h1>
        </div>
      ) : null}
    </div>
  );
};

export default Profile;

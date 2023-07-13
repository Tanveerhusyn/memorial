import React, { useRef, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField } from '@mui/material';
import './UploadBox.css';
import Button from '../button/Button';
const UploadBox = ({ device, facebook, youtube, handleFileInputChange }) => {
  const fileInputRef = useRef(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [facebookLink, setFacebookLink] = useState('');

  const handleDeviceClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFacebookClick = () => {
    setOpenDialog(true);
  };

  function extractSrcFromIframeString(iframeString) {
    var srcRegex = /src="([^"]+)"/;
    var match = iframeString.match(srcRegex);
  
    if (match && match.length > 1) {
      var src = match[1];
      return src;
    } else {
      return null;
    }
  }
  

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleFacebookLinkChange = (event) => {
    setFacebookLink(event.target.value);
  };

  const handleFacebookLinkSubmit = () => {
    // Perform action with the Facebook link (e.g., send it to the backend)
    console.log(facebookLink);

    // Close the dialog
    setOpenDialog(false);
  };

  return (
    <div className="icon-container">
      {device && (
        <div htmlFor="fileInput" onClick={handleDeviceClick} className="icon-item">
              <svg width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.5 48.5C4.85 48.5 3.437 47.912 2.261 46.736C1.085 45.56 0.498005 44.148 0.500005 42.5V33.5H6.5V42.5H42.5V33.5H48.5V42.5C48.5 44.15 47.912 45.563 46.736 46.739C45.56 47.915 44.148 48.502 42.5 48.5H6.5ZM21.5 36.5V12.05L13.7 19.85L9.5 15.5L24.5 0.5L39.5 15.5L35.3 19.85L27.5 12.05V36.5H21.5Z" fill="#7D768D" fill-opacity="0.7"/>
</svg>
          <span>From Your Device</span>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileInputChange}
          />
        </div>
      )}
     {
        facebook && <div className="icon-item" onClick={handleFacebookClick}>
        <svg width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M39.5 0.5C41.9792 0.5 44.099 1.38021 45.8594 3.14062C47.6198 4.90104 48.5 7.02083 48.5 9.5V39.5C48.5 41.9792 47.6198 44.099 45.8594 45.8594C44.099 47.6198 41.9792 48.5 39.5 48.5H33.625V29.9062H39.8438L40.7812 22.6562H33.625V18.0312C33.625 16.8646 33.8698 15.9896 34.3594 15.4062C34.849 14.8229 35.8021 14.5312 37.2188 14.5312L41.0312 14.5V8.03125C39.7188 7.84375 37.8646 7.75 35.4688 7.75C32.6354 7.75 30.3698 8.58333 28.6719 10.25C26.974 11.9167 26.125 14.2708 26.125 17.3125V22.6562H19.875V29.9062H26.125V48.5H9.5C7.02083 48.5 4.90104 47.6198 3.14062 45.8594C1.38021 44.099 0.5 41.9792 0.5 39.5V9.5C0.5 7.02083 1.38021 4.90104 3.14062 3.14062C4.90104 1.38021 7.02083 0.5 9.5 0.5H39.5Z" fill="#7D768D"/>
  </svg>
  
          <span>From Facebook</span>
        </div>
      }
      {
        youtube && <div className="icon-item">
        <svg width="59" height="45" viewBox="0 0 59 45" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M57.2895 7.37325C56.9593 6.04231 56.312 4.82857 55.4123 3.8535C54.5125 2.87843 53.392 2.17624 52.1627 1.8172C47.6379 0.5 29.5 0.5 29.5 0.5C29.5 0.5 11.3621 0.5 6.83728 1.81019C5.6075 2.16807 4.48636 2.86987 3.58647 3.84512C2.68657 4.82037 2.03958 6.03472 1.71049 7.36624C0.5 12.2707 0.5 22.5 0.5 22.5C0.5 22.5 0.5 32.7293 1.71049 37.6268C2.37723 40.3312 4.34509 42.4611 6.83728 43.1828C11.3621 44.5 29.5 44.5 29.5 44.5C29.5 44.5 47.6379 44.5 52.1627 43.1828C54.6614 42.4611 56.6228 40.3312 57.2895 37.6268C58.5 32.7293 58.5 22.5 58.5 22.5C58.5 22.5 58.5 12.2707 57.2895 7.37325ZM23.7388 31.8885V13.1115L38.7567 22.4299L23.7388 31.8885Z" fill="#7D768D"/>
  </svg>
  
          <span>From Youtube</span>
        </div>
      }
      {/* Dialog for Facebook link input */}
      <Dialog fullWidth open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Facebook Link</DialogTitle>
        <DialogContent>
          <TextField
            label="Facebook Link"
            value={facebookLink}
            onChange={(e)=>{
              setFacebookLink(e.target.value)
             
            }}
            fullWidth
            variant='filled'
            style={{marginBottom:'30px'}}
          />
          
          <Button text="Submit"  onClick={(e)=>{
            if (facebookLink.includes('<iframe')) {
              var src = extractSrcFromIframeString(facebookLink);
              handleFileInputChange(e,src)
              handleDialogClose()
              setFacebookLink('')
              // Do something with the extracted src
            } else {
              handleFileInputChange(e,facebookLink)
              handleDialogClose()
              setFacebookLink('')
            }
       
          }}/>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UploadBox;

import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { db, storage } from "./firebase";
import uuid from "node-uuid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

export default function AddPhoto(props) {
  const [photoTitle, setPhotoTitle] = useState("");
  const [photoFile, setFile] = useState(null);
  const [savingSpinner, setSavingSpinner] = useState(false);

  const handleAddPhoto = () => {
    // save file to Firebase storage
    setSavingSpinner(true);
    storage
      .ref("photos/" + uuid())
      .put(photoFile)
      .then(snapshot => {
        // download url
        snapshot.ref.getDownloadURL().then(downloadURL => {
          db.collection("users")
            .doc(props.user.uid)
            .collection("albums")
            .doc(props.album_id)
            .collection("photos")
            // save title and download to firestore
            .add({ title: photoTitle, image: downloadURL })
            .then(() => {
              setPhotoTitle("");
              setFile(null);
              setSavingSpinner(false);
              // close dialog box
              props.onClose();
            });
        });
      });
  };

  const handleFile = f => {
    const file = f.target.files[0];
    setFile(file);
  };

  return (
    <Dialog open={props.open} onClose={props.onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add a Photo</DialogTitle>
      <DialogContent>
        <TextField
          label="Photo Title"
          fullWidth
          value={photoTitle}
          onChange={pT => {
            setPhotoTitle(pT.target.value);
          }}
        />
        {photoFile && <Typography>{photoFile.name}</Typography>}
        <Button variant="contained" style={{ marginTop: 20 }} component="label">
          Choose a File
          <input
            type="file"
            onChange={handleFile}
            style={{ display: "none" }}
          />
        </Button>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={props.onClose}>
          Cancel
        </Button>
        <div style={{ position: "relative" }}>
          <Button color="primary" variant="contained" onClick={handleAddPhoto}>
            Save
          </Button>
          {savingSpinner && (
            <CircularProgress
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: -12,
                marginLeft: -12
              }}
              color="secondary"
              size={24}
            />
          )}
        </div>
      </DialogActions>
    </Dialog>
  );
}

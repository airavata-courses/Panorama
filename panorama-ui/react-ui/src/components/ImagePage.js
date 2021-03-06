import { useParams } from "react-router";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import Button from '@material-ui/core/Button';

export default function () {
  let { id } = useParams();
  const [imageData, setImageData] = useState([]);
  const [imageName, setImageName] = useState("");
  React.useEffect(() => {
    const username = localStorage.getItem("username");
    const jwtToken = localStorage.getItem("login_access_token");
    const imageId = id;

    axios.get(`http://localhost:3000/image?username=${username}&imageId=${id}`, { headers: { 'Authorization': "Bearer " + jwtToken } })
      .then(res => {
        setImageData(res.data.imageData);
        setImageName(res.data.imageName);
      })
  }, []);


  return (<table><tr><div ><img src={imageData} /></div></tr><td><a href={imageData} download={imageName}>          <Button
    type="submit"
    fullWidth
    variant="contained"
    color="secondary"

  >
    Download
  </Button></a></td></table>);

}
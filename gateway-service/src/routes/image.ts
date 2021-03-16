import express from "express";
import { time } from "node:console";
import { Image, ImageLocation, ImageStoreRequest, StoreResult } from "../definitions/images";
import ImageService from "../service-clients/ImageService";
import SessionService from "../service-clients/SessionService";
import Helper from "../util/Helper";


const router: express.Router = express.Router();


router.post('/image', async (req: express.Request, res: express.Response) => {
    // takes in an array of images to be stored as input 
    // HEADER
    // Authorization: Bearer eyJhbGciOiJIUzI1NiIXVCJ9TJV...r7E20RMHrHDcEfxjoYZgeFONFh7HgQ

    // BODY
    /*
         {
             username: "xyz",
             images: [
                {
                    data: "isau8dhiu",
                    name: "iamge-name"
                }
             ]
         }
    */


    const username = req.body["username"];
    const imageStoreRequest: ImageStoreRequest[] = req.body["images"];


    // check if the user has a valid session
    try {

        const authHeader: string = req.header("Authorization") as string;
        const isBearer = authHeader.startsWith("Bearer");

        if (!isBearer) {
            res.sendStatus(401);
            console.log("Bearer token not found with the request");
            return;
        }


        const token = authHeader.substring(7, authHeader.length);

        const isVerified = await SessionService.Instance.verifyToken({ username: username, token: token });
        // const isVerified = { verified: true };
        if (!isVerified.verified) {
            res.sendStatus(401);
            console.log("JWT token verification failed");
            return;
        }

    }
    catch (e) {
        res.sendStatus(401);
        console.log("JWT token verification failed");
        return;
    }





    if (!username || !imageStoreRequest) {
        res.sendStatus(400);
        console.log("Insufficient information in the request body");
        return;
    }



    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');


    // once the image is stored, call the session log service
    const images: Image[] = [];
    for (const imgStore of imageStoreRequest) {
        images.push({ imageData: imgStore.imageData, imageName: imgStore.imageName, userId: username })
    }

    if (images.length == 0) {
        res.sendStatus(200);
        console.log("no images to store");
        return;
    }

    try {
        const responseResult: StoreResult[] = await ImageService.Instance.storeImages(images);
        let errorCount = 0;
        for (const result of responseResult) {
            if (!result.stored) {
                errorCount++;
            }
        }
        if (errorCount > 0) {
            console.log("Could not store all the images");
            res.status(201);
            res.send({ error: " Some images were not stored" });
            return;
        }
        res.sendStatus(201);
    } catch (ex) {
        res.sendStatus(500);
        console.log("Could not store images due to the following error " + ex);
    }

});



router.get('/image', async (req: express.Request, res: express.Response) => {

    // expected format from the request
    /* {
        username: "YXZ";
        imageId: "Iuhdaiusd" 
    }
    */

    const username = req.query["username"] as string;
    const imageId: string = req.query["imageId"] as string;

    // check if the user has a valid session
    try {

        const authHeader: string = req.header("Authorization") as string;
        const isBearer = authHeader.startsWith("Bearer");

        if (!isBearer) {
            res.sendStatus(401);
            console.log("Bearer token not found with the request");
            return;
        }


        const token = authHeader.substring(7, authHeader.length);

        const isVerified = await SessionService.Instance.verifyToken({ username: username, token: token });
        // const isVerified = { verified: true };

        if (!isVerified.verified) {
            res.sendStatus(401);
            console.log("JWT token verification failed");
            return;
        }

    }
    catch (e) {
        res.sendStatus(401);
        console.log("JWT token verification failed");
        return;
    }


    const imageLocation: ImageLocation = {
        userId: username,
        imageId: imageId
    };


    if (!username || !imageId) {
        res.sendStatus(400);
        console.log("Insufficient information in the request body");
        return;
    }


    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

    try {
        const response = await ImageService.Instance.getImage(imageLocation);
        res.status(200);
        res.send(response);
        return;
    } catch (ex) {
        res.sendStatus(404);
        console.log("error occured while fetching the image \n" + ex);
        return;
    }

});


router.get('/imageList', async (req: express.Request, res: express.Response) => {
    const username = req.query["username"] as string;
    // console.log(username);
    // check if the user has a valid session
    try {

        const authHeader: string = req.header("Authorization") as string;
        const isBearer = authHeader.startsWith("Bearer");

        if (!isBearer) {
            res.sendStatus(401);
            console.log("Bearer token not found with the request");
            return;
        }

        const token = authHeader.substring(7, authHeader.length);
        const isVerified = await SessionService.Instance.verifyToken({ username: username, token: token });
        // const isVerified = { verified: true };

        if (!isVerified.verified) {
            res.sendStatus(401);
            console.log("JWT token verification failed");
            return;
        }

    }
    catch (e) {
        res.sendStatus(401);
        console.log("JWT token verification failed");
        return;
    }


    if (!username) {
        res.sendStatus(400);
        console.log("Insufficient information in the request body");
        return;
    }


    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');


    try {
        const response = await ImageService.Instance.getImageMetadata({ userId: username, startIdx: 0, endIdx: 100 });
        res.status(200);
        res.send(response);
        return;
    } catch (ex) {
        res.sendStatus(404);
        console.log("error occured while fetching the image list \n" + ex);
        return;
    }

});


module.exports = router;
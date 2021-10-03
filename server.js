const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const { google } = require("googleapis");
const credentials = require("./credentials.json");
const { file } = require("googleapis/build/src/apis/file");
const path = require("path");
const { resolve } = require("path");
const { oauth2 } = require("googleapis/build/src/apis/oauth2");

const app = express();

// define auth credentials --------------------------------------
const client_id = credentials.web.client_id;
const client_secret = credentials.web.client_secret;
const redirect_uris = credentials.web.redirect_uris;
const oauth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

const image_folder_id = '1nZI-DSau2QCIftFOeOMm6fRd_RJUzylN'

const SCOPE = [
  "https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/drive.file",
];

let isAuthenticated = false;
let userInfo = null;

// temperary save image locally using multer ------------------------------------------------

const Storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './public/uploads');
  },
  filename: (req, file, callback) => {
    callback(null, file.fieldname + '_' + Date.now() + file.originalname)
  },
});
const upload = multer({
  storage: Storage,
}).single("fileUpload");

// -----------------------------------------------------------------------------

app.use(express.static("public"));
app.set('view engine', 'ejs');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  // res.send("server is running..");
  if (isAuthenticated){

    const oauth2 = google.oauth2({ version: "v2", auth: oauth2Client });
    oauth2.userinfo.get((err, response) => {
    if (err) {
        return res.send("token faild: ", err);
    }
    console.log("userInfo: ", response.data)
    userInfo = response.data;
    res.render('userInfo', {userInfo:response.data})
    });

  }else{
    const authURL = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: SCOPE,
    });
    console.log("authURL: ", authURL);
    // res.send(authURL);
    res.render('app', {url:authURL})
  }
});

app.get('/google/callback', (req, res) => {
  const auth_code = req.query.code
  if(auth_code){
    oauth2Client.getToken(auth_code, (err, token) => {
      if (err) {
        console.error("error while accessing token", err);
        isAuthenticated = false
        return res.status(400).send("Error while accessing token..");
      }
      console.log("authenticated success!, access token: ", token.access_token)
      oauth2Client.setCredentials(token)
      isAuthenticated = true
      res.redirect('/')
    });
  }
});

app.post('/file/upload', (req, res) => {
  console.log("ulpoad route fired !")
  upload(req, res, (err) => {
    if (err){
      console.log("upload error: ", err);
      res.redirect('/')
    }else{
      if (req.file !== undefined){
        console.log("image path: ", req.file.path)

        const drive = google.drive({ version: "v3", auth: oauth2Client });
        const fileMetadata = {
          name: req.file.filename,
          parents: [image_folder_id]
        };
        const media = {
          mimeType: req.file.mimetype,
          body: fs.createReadStream(req.file.path),
        };
        
        drive.files.create(
          {
            resource: fileMetadata,
            media: media,
            fields: "id",
          },
          (err, file) => {
            // oauth2Client.setCredentials(null);
            if (err) return res.status(400).send(err);
            fs.unlinkSync(req.file.path)
            console.log('file uploaded successfully!')
            res.render('userInfo', {userInfo, status: 'file uploaded successfully!'})
          }
        );
      }else{
        res.redirect('/')
      }
  
    }
  })
});


// app.get("/getAuthUrl", (req, res) => {
//   const authURL = oauth2Client.generateAuthUrl({
//     access_type: "offline",
//     scope: SCOPE,
//   });
//   console.log("authURL: ", authURL);
//   // res.send(authURL);
//   res.render('app', {url:authURL})
// });

// app.post("/getToken", (req, res) => {
//   if (req.body.code == null) {
//     return res.status(400);
//   }
//   oauth2Client.getToken(req.body.code, (err, token) => {
//     if (err) {
//       console.error("error while accessing token", err);
//       return res.status(400).send("Error while accessing token..");
//     }
//     res.send(token);
//   });
// });

// app.get("/getUserInfo", (req, res) => {
//   if (req.body.token == null) {
//     return res.send(400).send("Token no found");
//   }
//   oauth2Client.setCredentials(req.body.token)
//   const oauth2 = google.oauth2({ version: "v2", auth: oauth2Client });

//   oauth2.userinfo.get((err, response) => {
//     if (err) {
//       return res.send("token faild: ", err);
//     }
//     res.send(response.data);
//   });
// });

// app.get("/readDrive", (req, res) => {
//   // if (req.body.token == null) return res.status(400).send("Token not found !");
//   // oauth2Client.setCredentials(req.body.token);
//   const drive = google.drive({ version: "v3", auth: oauth2Client });
//   drive.files.list(
//     {
//       pageSize: 10,
//       q: `'${image_folder_id}' in parents and trashed=false`
//     },
//     (err, response) => {
//       if (err) {
//         console.log("Error while read drive.. ", err);
//         return res.status(400).send(err);
//       }
//       const files = response.data.files;
//       if (files.length) {
//         console.log("Files: ");
//         files.map((file) => {
//           console.log(`fileName: ${file.name} , fileId: ${file.id}`);
//         });
//       } else {
//         console.log("No files found !");
//       }
//       res.send(files);
//     }
//   );
// });

// app.post("/file/upload", (req, res) => {
//   let form = new formidable.IncomingForm();
//   form.parse(req, (err, fields, files) => {
//     if (err) return res.status(400).send("error while uploading files..", err);
//     const token = JSON.parse(fields.token);
//     console.log("token: ", token);
//     if (token == null) return res.status(400).send("token not found");
//     // oauth2Client.setCredentials(token);
//     console.log("file: ", files.file);
//     const drive = google.drive({ version: "v3", auth: oauth2Client });
//     const fileMetadata = {
//       name: files.file.name,
//     };
//     const media = {
//       mimeType: files.file.type,
//       body: fs.createReadStream(files.file.path),
//     };
//     drive.files.create(
//       {
//         resource: fileMetadata,
//         media: media,
//         fields: "id",
//       },
//       (err, file) => {
//         oauth2Client.setCredentials(null);
//         if (err) return res.status(400).send(err);
//         res.send("file uloaded successfully !");
//       }
//     );
//   });
// });

// app.post('/file/remove/:id', (req, res) => {
//     if (req.body.token == null) return res.status(400).send('Token not found');
//     oauth2Client.setCredentials(req.body.token);
//     const drive = google.drive({ version: 'v3', auth: oauth2Client });
//     var fileId = req.params.id;
//     drive.files.delete({ 'fileId': fileId }).then((response) => { res.send(response.data) })
// });


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is started on port: ${PORT}`);
});

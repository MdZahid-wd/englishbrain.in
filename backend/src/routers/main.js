const express = require("express");
const routes = express.Router();
const Detail = require("../models/detail");
const Slider = require("../models/slider");
const Course = require("../models/course");
const student = require("../models/student");
const admin = require("../models/admin");
const Videos = require("../models/videos");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
const {
  S3Client,
  GetObjectCommand,
  DeleteObjectCommand,
  CopyObjectCommand,
  ListObjectsCommand,
} = require("@aws-sdk/client-s3");
const { ElastiCache } = require("aws-sdk");
const course = require("../models/course");

//authenticathion for admin..................................................................................................................................................................................................
const autha = async (req, res, next) => {
  try {
    const cookies = req.headers.cookie;
    var token = 0;
    if (cookies == null) {
      res.render("admin-login", {
        loginLogoName: "Login",
        emailExists: "login again you have spend long time for security reason",
      });
    } else {
      const cookiesArray = cookies.split("; ");
      console.log(cookiesArray.length);

      for (i = 0; i < cookiesArray.length; i++) {
        var keyes = cookiesArray[i].split("=")[0];
        console.log(keyes);
        if (keyes == "jwta") {
          token = cookiesArray[i].split("=")[1];
        }
      }
      if (token == 0) {
        res.render("admin-login", {
          loginLogoName: "Login",
          emailExists:
            "login again you have spend long time for security reason",
        });
      } else {
        try {
          const verifyUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
          console.log(verifyUser.id);
          req.data = await admin.findOne({ _id: verifyUser.id });
          next();
        } catch (e) {
          console.log(
            "may be token expire...........................................",
            e
          );
          res.status(404);
          res.end();
        }
      }
    }
  } catch (e) {
    res.status(401);
    res.send(e);
  }
};
//authentication for student............................................................................................................................................
async function auths(req, res, next) {
  try {
    const cookies = req.headers.cookie;

    var token = 0;
    if (cookies == null) {
      token = 0;
      res.status(404);
      res.end();
    } else {
      const cookiesArray = cookies.split("; ");
      console.log(cookiesArray.length);

      for (i = 0; i < cookiesArray.length; i++) {
        var keyes = cookiesArray[i].split("=")[0];
        console.log(keyes);
        if (keyes == "jwts") {
          token = cookiesArray[i].split("=")[1];
        }
      }

      if (token == 0) {
        res.status(404);
        res.end();
      } else {
        console.log(token);
        try {
          const verifyUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
          console.log(verifyUser.id);
          req.data = await student.findOne({ _id: verifyUser.id });

          next();
        } catch (e) {
          console.log(e);
          res.status(401);
          res.send(e);
        }
      }
    }
  } catch (e) {
    res.status(401);
    res.send(e);
  }
}

//login present authentication for student............................................................................................................................................
async function loginPresent(req, res, next) {
  try {
    const cookies = req.headers.cookie;

    var token = 0;
    if (cookies == null) {
      token = 0;
      req.login = "Login";
      next();
    } else {
      const cookiesArray = cookies.split("; ");
      console.log(cookiesArray.length);
      for (i = 0; i < cookiesArray.length; i++) {
        var keyes = cookiesArray[i].split("=")[0];
        console.log("present token from present token", keyes);
        if (keyes == "jwts") {
          token = cookiesArray[i].split("=")[1];
        }
      }

      if (token == 0) {
        req.login = "Login";
        next();
      } else {
        try {
          const verifyUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
          console.log(verifyUser);
          if (verifyUser == null) {
            console.log("error to verifiy from present token");
            req.login = "login";
            next();
          } else {
            console.log(verifyUser.id);
            const data = await student.findOne({ _id: verifyUser.id });
            req.login = data.name.split(" ")[0];
            next();
          }
        } catch (e) {
          console.log(
            "not verifiy(may be expire token or fake token) from present token"
          );
          req.login = "login";
          next();
        }
      }
    }
  } catch (e) {
    res.status(401);
    res.send(e);
  }
}
//index page...................................................................................................................................................................................................
routes.get("/", loginPresent, async (req, res) => {
  try {
    const videos = await Videos.find();
    const course = await Course.find();
    var videosArrays = [];
    for (i = 0; i < course[0].demoVideos.length; i++) {
      const video = await Videos.findOne({ video: course[0].demoVideos[i] });
      videosArrays[i] = video;
    }

    const slider = await Slider.findOne({ _id: "630d924e7c4d3393d869ef71" });
    console.log(slider);

    res.render("index", {
      loginLogoName: req.login,
      slider: slider,
      course: course,
      videos: videosArrays,
    });
  } catch (e) {
    console.log("error from /", e);
  }
});

//student-login..........................................................................................................................................................................................
routes.get("api/student-login", loginPresent, async (req, res) => {
  res.render("student-login", { loginLogoName: req.login });
});
routes.post("api/student-login", async (req, res) => {
  try {
    const data = await student.findOne({ email: req.body.email });

    if (data == null) {
      res.render("student-login", {
        loginLogoName: "Login",
        emailExists: "invalid email",
      });
      console.log("email already exist");
    } else {
      if (data.password1 == req.body.password) {
        const user = { id: data._id };
        const token = await jwt.sign(user, process.env.JWT_SECRET_KEY, {
          expiresIn: "1h",
        });
        console.log("........ttttttttt.......");
        console.log(token);
        console.log("........ttttttttt.......");
        console.log(user);

        res.cookie("jwts", token, [
          {
            expires: new Date(Date.now() + 60 * 60 * 1000 * 12),
            httpOnly: true,
          },
        ]);
        //cloudfront cookies.............................................................................................................................................................................................

        const privateKey =
          process.env.A +
          "\n" +
          process.env.B +
          process.env.C +
          process.env.D +
          process.env.E +
          process.env.F +
          process.env.G +
          process.env.H +
          process.env.I +
          process.env.J +
          process.env.K +
          process.env.L +
          process.env.M +
          process.env.N +
          "\n" +
          process.env.O;
        //console.log('kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk');

        //console.log(privateKey);

        const cloudFront = new aws.CloudFront.Signer(
          process.env.KEY_PAIR_ID,
          privateKey
        );

        const policy = JSON.stringify({
          Statement: [
            {
              Resource: "https://files.englishbrain.in/*", // http* => http and https
              Condition: {
                DateLessThan: {
                  "AWS:EpochTime":
                    Math.floor(new Date().getTime() / 1000) + 60 * 60 * 12, // Current Time in UTC + time in seconds, (60 * 60 * 12 = 12 hrs)
                },
              },
            },
          ],
        });

        const cookie = cloudFront.getSignedCookie({
          policy,
        });
        console.log(cookie);
        console.log(Object.values(cookie)[1]);
        console.log(Object.values(cookie)[0]);
        console.log(Object.values(cookie)[2]);

        res.cookie("CloudFront-Key-Pair-Id", Object.values(cookie)[1], {
          domain: ".englishbrain.in",
          path: "/",
          httpOnly: true,
          secure: true,
        });

        res.cookie("CloudFront-Policy", Object.values(cookie)[0], {
          domain: ".englishbrain.in",
          path: "/",
          httpOnly: true,
          secure: true,
        });

        res.cookie("CloudFront-Signature", Object.values(cookie)[2], {
          domain: ".englishbrain.in",
          path: "/",
          httpOnly: true,
          secure: true,
        });

        res.redirect("/course1");
        console.log("email exists");
      } else {
        res.render("student-login", {
          loginLogoName: "Login",
          emailExists: "invalid email",
        });
      }
    }
  } catch (e) {
    console.log("error from login", e);
  }
});
//student register...................................................................................................................................................................

routes.get("api/student-register", async (req, res) => {
  res.render("student-register");
});
routes.post("api/courseafterresgistesr", async (req, res) => {
  console.log("form is submitted");
  console.log(req.body.email);
  const data = await student.findOne({ email: req.body.email });
  console.log(data);
  if (data == null) {
    if (req.body.password1 == req.body.password2) {
      try {
        const data = await student.create(req.body);
        console.log(data);
        res.render("student-login", {
          success: "you are register now login to join courses",
        });
      } catch (e) {
        console.log(e);
        res.render("admin-videoUpdate", {
          success: false,
          dbError: "database error try after some time or connection lose",
        });
      }
    } else {
      res.render("student-register", {
        passwordMatch: "password does't match",
      });
    }
  } else {
    if (data.email == req.body.email) {
      res.render("student-register", { emailExists: "email alredy exists" });
      console.log("email already exist");
    }
  }
});

//course information..............................................................................................................................................................
routes.get("/course*", loginPresent, async (req, res) => {
  const orgUrl = req.url;
  const courseNum = orgUrl.slice(7);
  if (courseNum) {
    try {
      const course = await Course.findOne({ courseNo: courseNum });
      const videos = await Videos.find();

      var videosArrays = [];
      var istSrc;
      var istTitle;
      var k = 0;
      for (i = 0; i < course.demoVideos.length; i++) {
        const Video = await Videos.findOne({ video: course.demoVideos[i] });
        if (k == 0) {
          videosArrays[k] = {
            title: Video.title,
            videoNo: Video.video,
            videoKey: Video.videoFile[0].originalname.split(".")[0],
            thumbnailKey: Video.imageFile[0].originalname.split(".")[0],
            active: "active",
          };
          istSrc = Video.videoFile[0].originalname.split(".")[0];
          istTitle = Video.title;
          k++;
        } else {
          videosArrays[k] = {
            title: Video.title,
            videoNo: Video.video,
            videoKey: Video.videoFile[0].originalname.split(".")[0],
            thumbnailKey: Video.imageFile[0].originalname.split(".")[0],
          };
          k++;
        }
      }
      var j = 0;
      for (i = 0; i < videos.length; i++) {
        const st = course.demoVideos.includes(i + 1);
        if (st) {
        } else {
          const VideoRest = await Videos.findOne({ video: i + 1 });
          if (VideoRest == null) {
          } else {
            videosArrays[k] = {
              title: VideoRest.title,
              videoNo: VideoRest.video,
              videoKey: VideoRest.videoFile[0].originalname.split(".")[0],
              thumbnailKey: VideoRest.imageFile[0].originalname.split(".")[0],
            };
            k++;
          }
        }
      }
      res.render("course", {
        totalDemoVideo: course.demoVideos.length,
        totalVideo: videos.length,
        loginLogoName: req.login,
        videos: videosArrays,
        istVideoSrc: istSrc,
        istVideoTitle: istTitle,
        courseNo: courseNum,
      });
    } catch (e) {
      console.log("some wrong url", e);
    }
  } else {
  }
});
//contact page.....................................................................................................................................
routes.get("api/contactUs", loginPresent, (req, res) => {
  res.render("contact-us", { loginLogoName: req.login });
});
//admin login .......................................................................................................................................
routes.get("api/adminLogin", (req, res) => {
  console.log(req.headers.authorization);
  res.render("admin-login", { loginLogoName: "login" });
});

routes.post("api/adminUpdate", async (req, res) => {
  var pass = false;
  const data = await admin.findOne({ email: req.body.email });
  if (data == null) {
    res.render("admin-login", { emailExists: "invalid email" });
    console.log("email already exist");
  } else {
    if (data.password1 == req.body.password) {
      console.log("email exists");

      const user = { id: data._id };
      const token = await jwt.sign(user, process.env.JWT_SECRET_KEY, {
        expiresIn: "1h",
      });

      res.cookie("jwta", token, [
        { expires: new Date(Date.now() + 60 * 60 * 1000), httpOnly: true },
      ]);

      res.render("admin-update", { loginLogoName: data.name });
    } else {
      res.render("admin-login", { wrongPassword: "invalid email" });
    }
  }
});
//video update.........................................................................................................................................................................................................

routes.get("api/videoUpdate", autha, async (req, res) => {
  //console.log("this is from autha")
  //console.log(req.data);
  const demoVideo = await course.find({ courseNo: 1 });
  console.log(demoVideo[0].demoVideos);
  const videos = await Videos.find();
  //console.log(videos.length);
  var videosInformation = [];
  for (i = 0; i < videos.length; i++) {
    //console.log(videos.length);
    try {
      const video = await Videos.findOne({ video: i + 1 });
      var videoInformation = {
        title: video.title,
        description: video.description,
        videoNo: video.video,
      };
      videosInformation[i] = videoInformation;
    } catch (e) {
      console.log("video with videoNo not fount");
      var videoInformation = {
        title: "not found",
        description: "video is not present",
      };
      videosInformation[i] = videoInformation;
    }
  }

  res.render("admin-videoUpdate", {
    loginLogoName: req.data.name,
    videosInformation: JSON.stringify(videosInformation),
    videosLength: videos.length,
  });
});
//admin video upload s3.........................................................................................................................................
const s3 = new S3Client({ region: "ap-south-1" });

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "englishbrain2",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: async function (req, file, cb) {
      console.log(file.originalname);

      if (file.fieldname == "videoFile") {
        cb(null, { fieldName: file.fieldname });
      }
      if (file.fieldname == "imageFile") {
        cb(null, { fieldName: file.fieldname });
      }
      if (file.fieldname == "txtFile") {
        cb(null, { fieldName: file.fieldname });
      }
    },
    key: function (req, file, cb) {
      var videosFolder = "";
      if (file.fieldname == "videoFile") {
        videosFolder = "videos/video/";
      }
      if (file.fieldname == "imageFile") {
        videosFolder = "videos/image/";
      }
      if (file.fieldname == "txtFile") {
        videosFolder = "videos/text/";
      }
      var fullPath = videosFolder + file.originalname;
      cb(null, fullPath);
    },
  }),
});

routes.post(
  "api/adminVideoUpload",
  upload.fields([
    { name: "videoFile", maxCount: 1 },
    { name: "imageFile", maxCount: 1 },
    { name: "txtFile", maxCount: 40 },
  ]),
  async (req, res, next) => {
    console.log(".........xxxxxx.....");

    try {
      const videos = await Videos.find();
      const videoLength = videos.length;
      const afterVideoNumber = req.body.afterVideoNo;
      console.log(afterVideoNumber);
      var newVideoNo;

      if (afterVideoNumber < videoLength && afterVideoNumber >= 1) {
        for (var i = videoLength; i > afterVideoNumber; i--) {
          var ab = await Videos.findOne({ video: i });
          console.log(".........uuuuuuuuuuuuuuu..........");
          console.log(i);
          var cd = await Videos.updateOne(
            { _id: ab._id },
            { $set: { video: i + 1 } }
          );
          console.log("............fffffffffffffffff...........");
          console.log(i + 1);
        }
        newVideoNo = afterVideoNumber;
        newVideoNo++;
      } else {
        newVideoNo = videoLength + 1;
      }
      console.log(newVideoNo);
      Videos.create({
        title: req.body.title,
        description: req.body.description,
        video: newVideoNo,
        videoFile: req.files.videoFile,
        imageFile: req.files.imageFile,
        txtFile: req.files.txtFile,
      });
      res.status(200);

      res.render("success", { success: "successfully uploaded" });
    } catch (e) {
      console.log(e);
      console.log("......mongo db error.....");
      res.render("success", { success: "not uploaded something error" });
    }
  }
);
//Video player..............................................................................................................................................................

routes.post("api/result", async (req, res) => {
  console.log(req.body);
  res.render("course");
});

routes.get("api/playVideo", async (req, res) => {
  res.render("playVideo");
});
//video thumbnail....................................................................................................................................................................
// routes.get("/thumbnail/*",autha,async(req,res)=>{
//     const urlKey=req.url;
//     console.log(urlKey);
//     const videoNo=Number(urlKey.slice(11));
//     console.log(videoNo);
//     try{
//         console.log("someone is sending thumbnail request");
//         const videos=await Videos.findOne({"video":videoNo});
//         console.log(videos.imageFile[0])
//         const finalKey=videos.imageFile[0].key;
//     const params={
//         Bucket:'englishbrain1',
//         Key:finalKey,
//     };

//         res.attachment(req.params.name) ;
//         const s3g=new S3Client({region:'ap-south-1'});
//         const cmd=new GetObjectCommand(params);
//         const resp=await s3g.send(cmd);
//         resp.Body.pipe(res)
//         res.writeHead(200);

//     }catch(e){
//         console.log("thumbnail upload error",e);
//     }

// });
//delete object......................................................................................................................................................
const s3ClientDelete = new S3Client({ region: "ap-south-1" });
routes.get("api/delete-video/*", async (req, res) => {
  const deleteUrl = req.url;
  const videoNo = Number(deleteUrl.slice(14));
  const videoLength = (await Videos.find()).length;
  try {
    const videoData = await Videos.findOne({ video: videoNo });
    const deleteitem1 = videoData.videoFile[0].key;
    const deleteitem2 = videoData.imageFile[0].key;
    //s3 deletion process...........

    bucketParams = { Bucket: "englishbrain1", Key: deleteitem1 };

    try {
      const data = await s3ClientDelete.send(
        new DeleteObjectCommand(bucketParams)
      );
      console.log("Success. Object deleted.", data);
      // For unit tests.
    } catch (err) {
      console.log("s3 Error", err);
    }
    bucketParams = { Bucket: "englishbrain1", Key: deleteitem2 };

    try {
      const data = await s3ClientDelete.send(
        new DeleteObjectCommand(bucketParams)
      );
      console.log("Success. Object deleted.", data);
      // For unit tests.
    } catch (err) {
      console.log("s3 Error", err);
    }

    if (videoData.imageFile[0].key == null) {
    } else {
      for (i = 0; i < videoData.imageFile.length; i++) {
        const deleteitem3 = videoData.imageFile[i].key;
        bucketParams = { Bucket: "englishbrain1", Key: deleteitem3 };

        try {
          const data = await s3ClientDelete.send(
            new DeleteObjectCommand(bucketParams)
          );
          console.log("Success. Object deleted.", data);
          // For unit tests.
        } catch (err) {
          console.log("s3 Error", err);
        }
      }
    }
  } catch (e) {
    console.log("vdieo information not found", e);
    res.status(404);
  }
  //mongodb deletion.........................
  const videoDataAgain = await Videos.findOneAndDelete({ video: videoNo });

  console.log(
    "........................................................xxxxxxxxxxxxx..................."
  );
  console.log(videoNo);
  console.log(videoLength);

  for (i = videoNo; i < videoLength; i++) {
    var ab = await Videos.findOne({ video: i + 1 });
    console.log(ab._id);
    var cd = await Videos.updateOne({ _id: ab._id }, { $set: { video: i } });
    console.log(cd);
  }
  res.render("success", { success: "successfully deleted refresh the page" });
});
//coping object from video to videoF.............................................................................................................................................................................................
routes.get("api/updateCourse", autha, (req, res) => {
  res.render("admin-courseUpdate", { loginLogoName: req.data.name });
});
const s3copy = new S3Client({ region: "ap-south-1" });
routes.post("api/updateCourse", autha, async (req, res) => {
  var freeVideoArray = [];
  var copyVideoF = [];
  var k = 0;
  console.log(req.body.demoVideoLast);
  const videoCount = req.body.demoVideoLast;
  if (videoCount < 5 && videoCount > 0) {
    for (var i = 1; i <= videoCount; i++) {
      var demoVideo = await Videos.findOne({ video: i });
      if (demoVideo) {
        copyVideoF[k] = demoVideo.videoFile[0].key.slice(13).split(".")[0];
        freeVideoArray[k] = demoVideo.video;
        k++;
        var bucketParams = {
          Bucket: "englishbrain1",
          Delimiter: "",
          Prefix:
            "videos/video/" +
            demoVideo.videoFile[0].key.slice(13).split(".")[0] +
            "/",
        };

        try {
          var listData = await s3copy.send(
            new ListObjectsCommand(bucketParams)
          );
          console.log("Success", listData.Contents.length);

          if (listData.Contents.length) {
            listData.Contents.forEach(async (element) => {
              console.log(element.Key.slice(13));
              // Set the bucket parameters.

              var params = {
                Bucket: "englishbrain1",
                CopySource:
                  "englishbrain1/videos/video/" + element.Key.slice(13),
                Key: "videos/videoF/" + element.Key.slice(13),
              };
              try {
                var data = await s3copy.send(new CopyObjectCommand(params));
              } catch (err) {
                console.log("Error from coping object", err);
                res.send("error can't list as demo video", err);
              }
            });
          }
        } catch (err) {
          console.log("Error from list object", err);
          res.send("error can't list as demo video", err);
        }
      }
    }

    try {
      console.log(copyVideoF);
      var listParamsForDelete = {
        Bucket: "englishbrain1",
        Delimiter: "/",
        Prefix: "videos/videoF/",
      };
      var listForDeleteData = await s3copy.send(
        new ListObjectsCommand(listParamsForDelete)
      );
      console.log(listForDeleteData);

      for (var m = 0; m < listForDeleteData.CommonPrefixes.length; m++) {
        var a = listForDeleteData.CommonPrefixes[m].Prefix.split("/")[2];
        var flag = 0;
        for (var n = 0; n < copyVideoF.length; n++) {
          var b = copyVideoF[n];
          console.log(a, b);
          if (a == b) {
            flag = 0;
            break;
          } else {
            flag = 1;
          }
        }
        console.log(flag);
        if (flag == 1) {
          var listParamsDelete = {
            Bucket: "englishbrain1",
            Delimiter: "",
            Prefix: "videos/videoF/" + a + "/",
          };
          var listForDelete = await s3copy.send(
            new ListObjectsCommand(listParamsDelete)
          );
          console.log(listForDelete.Contents.length);
          console.log(
            "lllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll"
          );
          if (listForDelete.Contents.length) {
            for (z = 0; z < listForDelete.Contents.length; z++) {
              //console.log(listForDelete.Contents[z].Key);
              var deleteBucketParams = {
                Bucket: "englishbrain1",
                Key: listForDelete.Contents[z].Key,
              };
              console.log(deleteBucketParams);
              const data = await s3copy.send(
                new DeleteObjectCommand(deleteBucketParams)
              );
              console.log("successfully deleteddddddddddddddddddddddd;", data);
            }
          }
        }
      }
    } catch (error) {
      console.log("error from deleting object from videoF");
    }
    const updateCourse = await Course.updateOne(
      { courseNo: req.data.course },
      { $set: { demoVideos: freeVideoArray } }
    );
    console.log(updateCourse);
    res.send("updated");
  } else {
    res.send("can't give permission more than 4");
  }
});
routes.post("/api/login", async (req, res) => {
  console.log(req.body);
  try {
    const data = await student.findOne({ email: req.body.email });
    if (data == null) {
      res.send({ email: "invalid email" });
      console.log("email does't exist");
    } else {
      if (data.password1 == req.body.password) {
        console.log("verify");
        //jwt token
        const user = { id: data._id };
        const token = jwt.sign(user, process.env.JWT_SECRET_KEY, {
          expiresIn: "12h",
        });
        console.log("........ttttttttt.......");
        console.log(token);
        console.log("........ttttttttt.......");
        console.log(user);

        res.cookie("jwts", token, [
          {
            expires: new Date(Date.now() + 60 * 60 * 1000 * 12),
            httpOnly: true,
          },
        ]);
        //jwt token
        res.send({ name: data.name });
      } else {
        console.log("password dont match");
        res.send({ email: "invalid email" });
      }
    }
  } catch (e) {
    console.log(e);
  }
});
routes.get("/api/jwt", loginPresent, (req, res) => {
  console.log(req.login);
  res.send({ login: req.login });
});

module.exports = routes;

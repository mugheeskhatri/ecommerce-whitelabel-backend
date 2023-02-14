const { google } = require("googleapis");
const fs = require("fs");

const upload = (req, res) => {
  try {
    const oauth2Client = new google.auth.OAuth2(
      "828179446373-5db8vmkf76rlgqmo9kn9qktf784vhki0.apps.googleusercontent.com",
      "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",
      "https://developers.google.com/oauthplayground"
    );
    const drive = google.drive({
      version: "v3",
      auth: oauth2Client,
    });
    const fileMetadata = {
      name: req.file.filename,
    };
    const media = {
      mimeType: req.file.type,
      body: fs.createReadStream(req.file.path),
    };
    oauth2Client.setCredentials({
      access_token:
        "ya29.a0Aa4xrXNuS9gkMP086P5fd_A5TZJFFczU_9o8GcUayT6B5GItv8-bgPrl21ThSUuO-8CACeofAOTnWJTlUmg863MXn6g0QEP6zL3rTOQX_M___SmsNqWBeWjpHiMplsV2C_Tfew8TzN-4G51VM8grhXCHPm1AaCgYKATASARESFQEjDvL989bZBhSmKHVb-ta2NKvnmg0163",
      refresh_token:
        "1//04rjNnFEhJJh8CgYIARAAGAQSNwF-L9IrQfSCgju9Gv3KUoXE76sgj7tA_m6wk9JF7WZqeY09lbCcGzvJnGVEeoonzts4jCLEIlw",
      expiry_date: true,
    });
    drive.files.create(
      {
        resource: fileMetadata,
        media: media,
        fields: "id",
      },
      async (err, file) => {
        console.log(err);
        await drive.permissions.create({
          fileId: file.data.id,
          requestBody: {
            role: "reader",
            type: "anyone",
          },
        });
        const result = await drive.files.get({
          fileId: file.data.id,
          fields: "webViewLink , webContentLink",
        });
        if (err) {
          // Handle error
          console.log(err);
        } else {
          fs.unlinkSync(req.file.path);
          res.status(200).send({ fileId: file.data.id });
        }
      }
    );

    // res.send({ "hello": "resFile.data" })
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = upload;

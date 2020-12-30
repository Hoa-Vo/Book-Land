const accountModel = require("../models/accountModel");
const formidable = require("formidable");

exports.get = async (req, res, next) => {
  const id = req.user._id;
  const user = await accountModel.getUserById(id);
  res.render("userAccount/account", {
    id: user._id,
    name: user.name,
    email: user.email,
    avatar_image: user.avatar_image,
  });
};

exports.editUserAvatar = async (req, res, next) => {
  const receiveForm = formidable.IncomingForm();
  await receiveForm.parse(req, (err, fields, files) => {
    if (err || files.avatarImageInput.type !== "image/jpeg") {
      res.status(204).send("error!");
    } else {
      booksListModel
        .saveAvatar(files)
        .then(imageName => {
          let toChangeAvatarUser = {
            id: fields.IdToChangeAvatar,
            avatar_image: imageName,
          };
          return toChangeAvatarUser;
        })
        .then(toChangeAvatarUser => {
          booksListModel.editAvatar(toChangeAvatarUser).then(result => {
            if (result === true) {
              res.status(202).redirect("/account");
            } else {
              res.send(204).end();
            }
          });
        });
    }
  });
};

const moment = require("moment");
const formidable = require("formidable");
const fs = require("fs");
const inventoryModel = require("../models/inventory");
const ObjectId = require("mongodb").ObjectId;
const express = require("express");
const app = express();

app.use(express.json());

exports.handleGetMain = (req, res) => {
  inventoryModel.read({}, { name: 1 }, (result) => {
    res.render("main", { title: req.session.username, result: result });
  });
};

exports.handleGetCreateinventory = (req, res) => {
  res.render("create");
};

exports.handleGetShowinventory = (req, res) => {
  objid = ObjectId(req.query.id);
  inventoryModel.read({ _id: objid }, {}, (result) => {
    if (result) {
      let r = result[0];
      r.releaseDateAt = moment(r.releaseDateAt)
        .local()
        .format("YYYY-MM-DD HH:mm:ss");
      r.lastUpdateAt = moment(r.lastUpdateAt)
        .local()
        .format("YYYY-MM-DD HH:mm:ss");
      res.render("show", r);
    } else {
      res.render("err", { errmsg: "undefind" });
    }
  });
};

exports.handleCreate = (req, res) => {
  const form = formidable({ multiples: true });
  form.parse(req, (err, fields, files) => {
    let obj = {
      name: fields.name,
      type: fields.type,
      description: fields.description,
      developer: fields.developer,
      publisher: fields.publisher,
      os: {
        windows: fields.windows,
        macos: fields.macos,
        linux: fields.linux,
      },
      releaseDateAt: new Date(fields.releaseDateAt).toISOString(),
      lastUpdateAt: new Date().toISOString(),
      lastUpdateBy: req.session.username,
      photo: null,
      photo_mimetype: null,
    };
    if (files.photo.size > 0) {
      const filename = files.photo.filepath;
      let title = "untitled";
      if (fields.title && fields.title.length > 0) {
        title = fields.title;
      }
      if (files.photo.mimetype) {
        obj["photo_mimetype"] = files.photo.mimetype;
      }
      fs.readFile(files.photo.filepath, (err, data) => {
        obj["photo"] = new Buffer.from(data).toString("base64");
        invCreate(obj, res);
      });
      res.status(200).json({ message: "Success" });
    } else {
      invCreate(obj, res);
      res.status(200).json({ message: "Success" });
    }
  });
};

const invCreate = (obj, res) => {
  inventoryModel.create(obj, (result) => {
    if (result) {
      res.redirect(`/show?id=${result}`);
    } else {
      res.render("err", { errmsg: "undefind" });
    }
  });
};

const invUpdate = (obj, newObj, res) => {
  inventoryModel.update(obj, newObj, (result) => {
    if (result) {
      res.redirect(`/show?id=${obj["_id"]}`);
    } else {
      res.render("err", { errmsg: "undefind" });
    }
  });
};

exports.handleEdit = (req, res) => {
  let objid = ObjectId(req.query.id);
  const form = formidable({ multiples: true });
  inventoryModel.read(
    { _id: objid },
    { photo: 1, photo_mimetype: 1, lastUpdateBy: 1 },
    (result) => {
      if (result && result[0]["lastUpdateBy"] == req.session.username) {
        form.parse(req, (err, fields, files) => {
          let obj = {
            name: fields.name,
            type: fields.type,
            description: fields.description,
            developer: fields.developer,
            publisher: fields.publisher,
            os: {
              windows: Boolean(fields.windows),
              macos: Boolean(fields.macos),
              linux: Boolean(fields.linux),
            },
            releaseDateAt: new Date(fields.releaseDateAt).toISOString(),
            lastUpdateAt: new Date().toISOString(),
            lastUpdateBy: req.session.username,
            photo: result[0].photo,
            photo_mimetype: result[0].photo_mimetype,
          };
          if (files.photo.size > 0) {
            const filename = files.photo.filepath;
            let title = "untitled";
            if (fields.title && fields.title.length > 0) {
              title = fields.title;
            }
            if (files.photo.mimetype) {
              obj["photo_mimetype"] = files.photo.mimetype;
            }
            fs.readFile(files.photo.filepath, (err, data) => {
              obj["photo"] = new Buffer.from(data).toString("base64");
              invUpdate({ _id: objid }, obj, res);
            });
          } else {
            invUpdate({ _id: objid }, obj, res);
          }
        });
      } else {
        res.render("err", { errmsg: "Cannot edit" });
      }
    }
  );
};

exports.handleGetEdit = (req, res) => {
  objid = ObjectId(req.query.id);
  inventoryModel.read({ _id: objid }, {}, (result) => {
    if (result && result[0]["lastUpdateBy"] == req.session.username) {
      let r = result[0];
      r.releaseDateAt = moment(r.releaseDateAt)
        .local()
        .format("YYYY-MM-DDTHH:mm");
      res.render("edit", r);
    } else {
      res.render("err", { errmsg: "Cannot edit" });
    }
  });
};

exports.handleDelete = (req, res) => {
  let objid = ObjectId(req.query.id);
  inventoryModel.read({ _id: objid }, {}, (result) => {
    if (result && result[0]["lastUpdateBy"] == req.session.username) {
      inventoryModel.delete({ _id: objid }, (result) => {
        if (result) {
          res.redirect(`/main`);
        } else {
          res.render("err", { errmsg: "Cannot delete" });
        }
      });
    } else {
      res.render("err", { errmsg: "Cannot delete" });
    }
  });
};

exports.getInvByName = (req, res) => {
  name = req.params.name;
  inventoryModel.read({ name: name }, {}, (result) => {
    if (result.length === 0) {
      res.status(500).json({});
    } else {
      res.status(200).json(result);
    }
  });
};

exports.getInvByType = (req, res) => {
  type = req.params.type || "";
  inventoryModel.read({ type: type }, {}, (result) => {
    if (result.length === 0) {
      res.status(500).json({ message: "Record not found" });
    } else {
      res.status(200).json(result);
    }
  });
};

exports.handleApiDelete = (req, res) => {
  let objid = ObjectId(req.params.id);
  console.log(objid);
  inventoryModel.read({ _id: objid }, {}, (result) => {
    if (result && result[0]["lastUpdateBy"] == req.session.username) {
      console.log(result);
      inventoryModel.delete({ _id: objid }, (result) => {
        if (result) {
          res.status(200).json({ message: "Record deleted" });
        } else {
          res.status(404).json({ message: "Cannot delete" });
        }
      });
    } else {
      res.status(400).json({
        message: "No record or you no permission to remove this data.",
      });
    }
  });
};

exports.getInvList = (req, res) => {
  inventoryModel.read({}, { name: 1 }, (result) => {
    res.status(200).json(result);
  });
};

exports.handleAPICreate = (req, res) => {
  const body = req.body;
  let obj = {
    name: body.name,
    type: body.type,
    description: body.description,
    developer: body.developer,
    publisher: body.publisher,
    os: {
      windows: body.windows,
      macos: body.macos,
      linux: body.linux,
    },
    releaseDateAt: new Date(body.releaseDateAt).toISOString(),
    lastUpdateAt: new Date().toISOString(),
    lastUpdateBy: req.session.username,
    photo: null,
    photo_mimetype: null,
  };
  console.log(req.files);
  if (req.files > 0) {
    const filename = req.files.photo.filepath;
    let title = "untitled";
    if (body.title && body.title.length > 0) {
      title = body.title;
    }
    if (req.files.photo.mimetype) {
      obj["photo_mimetype"] = req.files.photo.mimetype;
    }
    fs.readFile(req.files.photo.filepath, (err, data) => {
      obj["photo"] = new Buffer.from(data).toString("base64");
    });
    res.status(200).json({ message: "Success" });
  } else {
    invCreate(obj, res);
    res.status(200).json({ message: "Success" });
  }
};

exports.handleAPIEdit = (req, res) => {
  let objid = ObjectId(req.params.id);
  const body = req.body;
  inventoryModel.read(
    { _id: objid },
    { photo: 1, photo_mimetype: 1, lastUpdateBy: 1 },
    (result) => {
      if (result && result[0]["lastUpdateBy"] == req.session.username) {
        let obj = {
          name: body.name,
          type: body.type,
          description: body.description,
          developer: body.developer,
          publisher: body.publisher,
          os: {
            windows: Boolean(body.windows),
            macos: Boolean(body.macos),
            linux: Boolean(body.linux),
          },
          releaseDateAt: new Date(body.releaseDateAt).toISOString(),
          lastUpdateAt: new Date().toISOString(),
          lastUpdateBy: req.session.username,
          photo: result[0].photo,
          photo_mimetype: result[0].photo_mimetype,
        };
        invUpdate({ _id: objid }, obj, res)
        res.status(200).json({ message: "Success"});
        // if (req.files.photo.size > 0) {
        //   const filename = req.files.photo.filepath;
        //   let title = "untitled";
        //   if (body.title && body.title.length > 0) {
        //     title = body.title;
        //   }
        //   if (req.files.photo.mimetype) {
        //     obj["photo_mimetype"] = req.files.photo.mimetype;
        //   }
        //   fs.readFile(req.files.photo.filepath, (err, data) => {
        //     obj["photo"] = new Buffer.from(data).toString("base64");
        //     invUpdate({ _id: objid }, obj, res);
        //     res.status(200).json({ message: "Success" });
        //   });
        // } else {
        //   invUpdate({ _id: objid }, obj, res);
        //   res.status(200).json({ message: "Success" });
        // }
      } else {
        res.status(400).json({ message:"Cannot edit" });
      }
    }
  );
};

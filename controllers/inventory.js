const formidable = require("formidable");
const fs = require("fs");
const inventoryModel = require("../models/inventory");
const ObjectId = require("mongodb").ObjectId;
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
      res.render("show", result[0]);
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
    };
    if (files.photo.size > 0) {
      const filename = files.photo.filepath;
      let title = "untitled";
      if (fields.title && fields.title.length > 0) {
        title = fields.title;
      }
      if (files.photo.type) {
        obj["photo_type"] = files.photo.type;
      }
      fs.readFile(files.photo.filepath, (err, data) => {
        obj["photo"] = new Buffer.from(data).toString("base64");
        invCreate(obj, res);
      });
    } else {
      invCreate(obj, res);
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
    { photo: 1, photo_type: 1, lastUpdateBy: 1 },
    (result) => {
      if (result && result[0]["lastUpdateBy"] == req.session.username) {
        form.parse(req, (err, fields, files) => {
          let obj = {
            name: fields.name,
            type: fields.inv_type,
          };
          if (files.photo.size > 0) {
            const filename = files.photo.filepath;
            let title = "untitled";
            if (fields.title && fields.title.length > 0) {
              title = fields.title;
            }
            if (files.photo.type) {
              obj["photo_type"] = files.photo.type;
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
        res.render("err", { errmsg: "can not edit" });
      }
    }
  );
};

exports.handleGetEdit = (req, res) => {
  objid = ObjectId(req.query.id);
  inventoryModel.read({ _id: objid }, {}, (result) => {
    if (result && result[0]["lastUpdateBy"] == req.session.username) {
      res.render("edit", result[0]);
    } else {
      res.render("err", { errmsg: "can not edit" });
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
          res.render("err", { errmsg: "can not delete" });
        }
      });
    } else {
      res.render("err", { errmsg: "can not delete" });
    }
  });
};

exports.getInvByName = (req, res) => {
  name = req.params.name;;
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
      res.status(500).json({});
    } else {
      res.status(200).json(result);
    }
  });
};

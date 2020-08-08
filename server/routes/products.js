const express = require('express');
const router = express.Router();
const multer = require('multer');

const { Product } = require("../models/Product");

const { auth } = require("../middleware/auth");

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if(ext !== '.jpg' || ext !== '.png') {
            return cb(res.status(400).end('only jpg, png are allowed!!'), false);
        }
        cb(null, true)
    }
})

var upload = multer({ storage: storage }).single("file")

//=================================
//             product
//=================================

router.post("/", auth, (req, res) => {
    product = new Product(req.body);
    product.save(err => {
        if(err) return res.status(500).json({success: false});

        return res.json({ success: true, product })
    })
});

router.post("/uploadImage", auth, (req, res) => {
    upload(req, res, err => {
        if(err) return res.json({ success: false, err });

        return res.json({ success: true, image: res.req.file.path, fileName: res.req.file.file })
    });
});

module.exports = router;

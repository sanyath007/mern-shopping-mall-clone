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
    const product = new Product(req.body);
    product.save(err => {
        if(err) return res.status(400).json({success: false});

        return res.json({ success: true, product })
    })
});

router.post("/uploadImage", auth, (req, res) => {
    upload(req, res, err => {
        if(err) return res.json({ success: false, err });

        return res.json({ success: true, image: res.req.file.path, fileName: res.req.file.file })
    });
});

router.get("/", (req, res) => {
    Product
        .find()
        .exec((err, products) => {
            if(err) return res.status(400).json({ success: false, err })

            return res.status(200).json({ success: true, products })
        });
});

router.post("/getProducts", (req, res) => {
    let { order, sortBy, limit, skip, filters } = req.body;

    order = order ? order : "desc";
    sortBy = sortBy ? sortBy : "_id";
    limit = limit ? parseInt(limit) : 10;
    skip = parseInt(skip);

    let findAgs = {}
    if(filters) {
        for(key in filters) {
            if(filters[key].length > 0) findAgs[key] = filters[key];
        }
    }
    console.log(findAgs);

    Product
        .find(findAgs)
        .populate("writer")
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, products) => {
            if(err) return res.status(400).json({ success: false, err })

            return res.status(200).json({ success: true, products })
        });
});

module.exports = router;

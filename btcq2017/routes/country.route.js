const express = require('express');
const httpCode = require('../config/httpStatusCode');
const countryModel = require('../models/country.model');
const ajvMdw = require('../middlewares/ajv.mdw');

const router = express.Router();

// load all
router.get('/', async (req, res) => {
   const list = await countryModel.all();
   res.status(httpCode.SUCCESS.OK).json(list);
});

// single
router.get('/:id', async (req, res) => {
    const countryId = +req.params.id ?? 0;
    const country = await countryModel.single(countryId);
    
    if(country === null){
        return res.status(httpCode.SUCCESS.NO_CONTENT).end();
    }

    res.status(httpCode.SUCCESS.OK).json(country);
 });


// add
router.post('/', ajvMdw(require('../schemas/country.schemas.json')), async (req, res) => {
    const country = req.body;
    console.log(country);
    const result = await countryModel.add(country);

    country.country_id = result[0];
    res.status(httpCode.SUCCESS.CREATED).json(country);
})


// edit
router.put('/:id', ajvMdw(require('../schemas/country.schemas.json')), async (req, res) => {
    const country = req.body;
    console.log(country);
    const id = +req.params.id;
    const result = await countryModel.update(id, country);

    country.country_id = result[0];
    res.status(httpCode.SUCCESS.CREATED).json(country);
})

// delete
router.delete('/:id', async (req, res) => {
    const countryId = +req.params.id ?? 0;
    const country = await countryModel.delete(countryId);

    res.status(httpCode.SUCCESS.OK).json(country);
 });

module.exports = router;
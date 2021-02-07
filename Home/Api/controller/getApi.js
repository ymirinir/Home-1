
const express = require('express')
const router = express.Router();

const fs = require('fs');
const { resolve } = require('path');

router.post('/sherchByCityAndDate', async (req, res) => {
    const { date, city } = req.body
    try {
        const data = await fs.promises.readFile('./arryCities.txt', 'utf8')
        const arrCities = (JSON.parse(data))

        const item = arrCities.filter(x => x.name === city && x.dt === date)
        if (item[0]) {
            res.send(item[0].main)
        }
        else {
            res.send("no data")
        }
    }
    catch (err) {
        console.log(err)
    }
})





router.post('/admin', async (req, res) => {
    const { arrCitiesApproved } = req.body
    try {
        const data = await fs.promises.readFile('./arrayIfApproved.txt', 'utf8')
        const arrCities = (JSON.parse(data))

        for (let item in arrCitiesApproved) {

            index = '"' + item + '":"' + arrCities[item] + '"'
            newItem = '"' + item + '":"' + arrCitiesApproved[item] + '"'
            await chenge1Line('./arrayIfApproved.txt', index, newItem)
                .then((data) => {
                    if (data) {
                        console.log("data: ", data)
                    }
                    else {
                        console.log("not change")
                        res.send("not change")
                    }
                })
             }
    }
    catch (err) {
        console.log(err)
    }
    res.send("update data")
})
module.exports = router;



const chenge1Line = async (file, oldItem, newItem) => {
    return new Promise(async (resolve, rejact) => {

        try {
            const data = await fs.promises.readFile(file, 'utf8')
            var formatted = data.replace(oldItem, newItem);

            fs.writeFile(file, formatted, 'utf8', function (err) {
                if (err) rejact(err => { console.log(err) });
            })

        } catch (err) {
            console.log(err)
        }
        resolve(formatted)
    }).catch((err)=>{rejact(err)})
}
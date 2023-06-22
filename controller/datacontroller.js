const datas = require('../model/dataschema')


const adddata = (req, res) => {
    const newdata = new datas({ name: req.body.name, ph: req.body.ph, grade: req.body.grade, password: req.body.password })
    newdata.save().then(() => {
        res.status(200).send("sucsess")
    }).catch((err) => {
        for (let e in err.errors) {
            console.log(err.errors[e].message)
            res.status(400).send("Bad requset...")
        }
    });
}



const finedAllData = async(req, res) => {

    const mydata = await datas.find()
    if (!mydata) {
        return res.status(400).send("not found")
    }

    res.status(200).render('student.ejs', { mydata })
}
const fineddata = async(req, res) => {

    const mydata = await datas.findOne({ ph: req.params.ph })
    if (!mydata) {
        return res.status(400).send("not found")
    }

    res.send(mydata)
}


const updeatedata = async(req, res) => {

    const mydata = await datas.findOneAndUpdate({ ph: req.body.ph }, { name: req.body.name })
    if (!mydata) {
        return res.status(400).send("ot found..")
    }

    res.status(200).send("sucsess")

}




//delete

const deletedata = async(req, res) => {

    const mydata = await datas.findOneAndDelete({ ph: req.params.ph })
    if (!mydata) {
        return res.status(400).send("not found..")
    }



}

module.exports = { adddata, fineddata, updeatedata, deletedata, finedAllData }
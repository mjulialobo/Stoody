const fs = require('fs')
const data = require("./data.json")
const { age, graduation, date } = require("./utils")


//show
exports.show = function(req, res) {

    const { id } = req.params
    const foundTeacher = data.teachers.find(function(teacher) {
        return teacher.id == id
    })
    if (!foundTeacher) return res.send("NOT FOUND")

    const teacher = {
        ...foundTeacher,
        age: age(foundTeacher.birth),
        degree: graduation(foundTeacher.degree),
        services: foundTeacher.services.split(','),
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundTeacher.created_at),
    }

    return res.render("teachers/show", { teacher: teacher })

}

//create
exports.post = function(req, res) {
    const keys = Object.keys(req.body)
        //validation
    for (key of keys) {
        //same as using req.body.avatar_url
        if (req.body[key] == "") {
            return res.send('Please, fill all fields.')

        }

    }

    let { avatar_url, name, birth, degree, styles, services } = req.body


    //data treatment
    birth = Date.parse(birth)
    const created_at = Date.now()
    const id = Number(data.teachers.length + 1)


    data.teachers.push({
        avatar_url,
        name,
        birth,
        degree,
        styles,
        services,
        created_at,
        id
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("White file error!")
        return res.redirect("/teachers")
    })

    //return res.send(req.body)
}

//edit
exports.edit = function(req, res) {

    const { id } = req.params
    const foundTeacher = data.teachers.find(function(teacher) {
        return teacher.id == id
    })
    if (!foundTeacher) return res.send("NOT FOUND")

    const teacher = {
        ...foundTeacher,
        birth: date(foundTeacher.birth)
    }

    return res.render('teachers/edit', { teacher })
}


//delete
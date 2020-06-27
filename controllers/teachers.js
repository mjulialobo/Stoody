const fs = require('fs')
const data = require("../data.json")
const { age, graduation, date } = require("../utils")

exports.index = function(req, res) {

    return res.render("teachers/index", { teachers: data.teachers })
}

exports.create = function(req, res) {
    return res.render("teachers/create")
}

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

    let id = 1
    const lastTeacher = data.teachers[data.teachers.length - 1]
    if (lastTeacher) {
        id = lastTeacher.id + 1
    }


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


exports.edit = function(req, res) {

    const { id } = req.params
    const foundTeacher = data.teachers.find(function(teacher) {
        return teacher.id == id
    })
    if (!foundTeacher) return res.send("NOT FOUND")

    const teacher = {
        ...foundTeacher,
        birth: date(foundTeacher.birth).iso
    }

    return res.render('teachers/edit', { teacher })
}

exports.put = function(req, res) {
    const { id } = req.body
    let index = 0
    console.log(req.body)
    const foundTeacher = data.teachers.find(function(teacher, foundIndex) {
        if (id == teacher.id) {
            index = foundIndex
            return true

        }
    })
    if (!foundTeacher) return res.send("NOT FOUND")

    const teacher = {
        ...foundTeacher,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(data.teachers.id)

    }

    data.teachers[index] = teacher

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("Write error!")
        return res.redirect(`/teachers/${id}`)
    })

}

exports.delete = function(req, res) {
    const { id } = req.body

    const filteredTechers = data.teachers.filter(function(teacher) {
        return teacher.id != id
    })
    data.teachers = filteredTechers

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("Write file error!")

        return res.redirect("/teachers")
    })

}
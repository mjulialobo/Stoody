module.exports = {
    age: function age(timestamp) {
        const today = new Date()
        const birthDate = new Date(timestamp)
        let age = today.getFullYear() - birthDate.getFullYear()
        const month = today.getMonth() - birthDate.getMonth()
        if (month < 0 || month == 0 && today.getDate() < birthDate.getDate()) {
            age = age - 1
        }
        return age
    },
    graduation: function(degree) {
        if (degree == "bachelor") {
            return "Bachelor degree";
        } else if (degree == "masters") {
            return "Masters degree";
        } else if (degree == "doctorate") {
            return "Doctorate degree";

        }
    },

    level: function(level) {
        if (level == "5") {
            return "5th - Elementary School";
        } else if (level == "6") {
            return "6th - Elementary School";
        } else if (level == "7") {
            return "7th - Junior Highschool";
        } else if (level == "8") {
            return "8th - Junior Highschool";
        } else if (level == "9") {
            return "9th - Junior Highschool";
        } else if (level == "10") {
            return "10th - Senior Highschool";
        } else if (level == "11") {
            return "11th - Senior Highschool";
        } else if (level == "12") {
            return "12th - Senior Highschool";
        }
    },

    date: function date(timestamp) {
        const date = new Date(timestamp)

        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)

        return {
            day,
            month,
            year,
            iso: `${ year }-${ month }-${ day }`,
            birthDay: `${month}/${day}`

        }
    }
}
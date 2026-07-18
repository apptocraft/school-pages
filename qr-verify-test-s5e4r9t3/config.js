const CONFIG = {

    school: {

        name: "School Name",

        tagline: "School Tag Line",

        address: `Address line 1
        Address line 2`,

        logo: "logo.png",

        info: [

            {
                label: "☎️ Mobile",
                value: "9900112233",
                stack: false
            },
            {
                label: "📧 Email",
                value: "username@domain.com",
                stack: true
            },
            {
                label: "🌐 Website",
                value: "www.domain.com",
                stack: false
            }

        ]

    },

    verification: {

        title: "Verification Successful",

        message: "This student has been successfully verified as an enrolled student of {school}."

    },


    footer: {

        text: "Powered by",

        title: "{school}"

    },

    student: {

        fields: [

            {
                key: "name",
                label: "Student Name",
            },

            {
                key: "class",
                label: "Class",
            },

            {
                key: "id_no",
                label: "ID No.",
                icon: "🆔"
            },

            {
                key: "father",
                label: "Father's Name",
                icon: "👨"
            },

            {
                key: "dob",
                label: "Date of Birth",
                icon: "🎂"
            },

            {
                key: "mobile",
                label: "Mobile Number",
                icon: "📞"
            },

            {
                key: "address",
                label: "Address",
                icon: "📍"
            }

        ]

    }

};
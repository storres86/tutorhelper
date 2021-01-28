const router = require("express").Router();
let Clients = require("../models/clients.models")

router.route("/").get((req,res) => {
    Clients.find()
    .then(client => res.json(client))
    .catch(err => res.status(400).json("error" + err))
});

router.route("/add").post((req,res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const number = req.body.number;
    const user = req.body.user;
    const userId = req.body.userId;
    const clientFullName = req.body.clientFullName;

    const newClient = new Clients({
        firstName,
        lastName,
        email,
        number,
        user,
        userId,
        clientFullName,

    })
    newClient.save()
    .then(() => res.json("Client added!"))
    .catch(() => res.status(400).json("error" + err))
})

router.route("/:id").get((req,res) => {
    Clients.findById(req.params.id)
    .then(client => res.json(client) )
    .catch(err => res.status(400).json("error" + err))
})

router.route("/:id").delete((req,res) => {
    Clients.findByIdAndDelete(req.params.id)
    .then(() => res.json("Client Deleted"))
    .catch(err => res.status(400).json("error" + err))
})

router.route("/update/:id").post((req,res) => {
    Clients.findById(req.params.id)
    .then(client => {
        client.firstName = req.body.firstName;
        client.lastName = req.body.lastName;
        client.email = req.body.email;
        client.number = req.body.number;
        client.user = req.body.user;
        client.userId = req.body.userId;
        client.clientFullName = req.body.clientFullName

        client.save()
        .then(() => res.json("Client Updated!"))
        .catch((err) => res.status(400).json("Error" + err))
        // .catch(alert("Client failed to update"))
    })
})

module.exports = router;
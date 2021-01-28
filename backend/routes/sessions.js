const router = require("express").Router();
const Sessions = require("../models/sessions.models")

router.route("/").get((req,res) => {
Sessions.find()
.then(session => res.json(session))
.catch(err => res.status(400).json("error" +err))
});

router.route("/add").post((req,res) => {
    const user = req.body.user;
    const userId = req.body.userId;
    const currentClient = req.body.currentClient;
    const sessionLength = req.body.sessionLength
    const startTime = req.body.startTime;
    const sessionDate = Date.parse(req.body.sessionDate); 
    const sessionPaid = req.body.sessionPaid;
    // const clientId = req.body.clientId;

    const newSession = new Sessions({
        user,
        userId,
        currentClient,
        sessionLength,
        startTime,
        sessionDate,
        sessionPaid,
        // clientId

    })
newSession.save()
.then(() => res.json("Session added!"))
.catch(err => res.status(400).json("error" + err))
})

router.route("/:id").get((req,res) => {
    Sessions.findById(req.params.id)
    .then(session => res.json(session))
    .catch(err => res.status(400).json("error" + err))
})

router.route("/:id").delete((req,res) => {
    Sessions.findByIdAndDelete(req.params.id)
    .then(() => res.json("Session Deleted"))
    .catch(err => res.status(400).json("error" + err))
})

router.route("/update/:id").post((req,res) => {
    Sessions.findById(req.params.id)
    .then(session => {
        session.user = req.body.user;
        session.userId = req.body.userId;
        session.currentClient = req.body.currentClient;
        session.sessionLength = req.body.sessionLength;
        session.startTime = req.body.startTime;
        session.sessionDate = Date.parse(req.body.sessionDate);
        session.sessionPaid = req.body.sessionPaid;
        // session.clientId = req.body.clientId;
    
        session.save()
        .then(() => res.json("Session Updated"))
        .catch(() => res.status(400).json("error"))
    }) 
})

module.exports = router;
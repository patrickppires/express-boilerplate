module.exports = (router) => {
    router.get("/api/v1/user", (req, res) => res.json({ msg: "test" }))
}

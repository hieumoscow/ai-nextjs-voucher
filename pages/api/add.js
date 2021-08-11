export default async (req, res) => {
    // if(!req.query.todo) {
    //     return res.status(400).send("todo parameter required.")
    // }
    // let todo = encodeURI(req.query.todo)

    const url = "http://localhost:6767/api/add";

    return fetch(url, {method: "POST"})
        .then(r => r.json())
        .then(data => {
            console.log("add")
            return res.status(200).json(data)
        })
}

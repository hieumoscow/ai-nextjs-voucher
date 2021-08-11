export default async (req, res) => {
    if(!req.query.todo) {
        return res.status(400).send("todo parameter required.")
    }
    let todo = encodeURI(req.query.todo)

    const url = "http://localhost:6767/api/remove";

    return fetch(url, { method: 'DELETE'})
        .then(r => r.json())
        .then(data => {
            console.log("remove")
            return res.status(201).json(data)
        })
}

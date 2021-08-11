export default async (req, res) => {
    const url = "http://localhost:6767/api/list"

    return fetch(url)
        .then(r => r.json())
        .then(data => {
            console.log(data)
            return res.status(200).json(data)
        })
}

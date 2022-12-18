export default async function handler(req, res) {
    try {
        const _req = JSON.parse(req.body);
        const token = req.headers.token;
        console.log(_req, token);
        const response = await fetch("https://demoapi.paypro.com.pk/v2/ppro/co", {
            method: "POST",
            headers: {
                'token': token,
                "Accept": "/",
                "Content-Type": "application/json",
                "User-Agent": "PostmanRuntime/7.29.0",
                "Accept-Encoding": "gzip, deflate, br",
                "Connection": "keep-alive"
            },
            body: JSON.stringify(_req)
        });
        const json = await response.json();
        res.status(200).json(json);
    } catch (e) {
        res.status(500).json({error: e.message});
    }
}
export default async function handler(req, res) {
	try {
		const { client_id, client_secret } = JSON.parse(req.body);
		const data = {
			clientid: client_id,
			clientsecret: client_secret
		}
		const response = await fetch("https://demoapi.paypro.com.pk/v2/ppro/auth/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		});
		const json = await response;
		console.log(json.headers.get("Token"))
		res.status(200).json({
			token: json.headers.get("Token")
		});
	} catch (e) {
		res.status(500).json({ error: e.message });
	}
}
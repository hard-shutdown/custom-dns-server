import { Router } from "express";
import axios from "axios";
import dnspacket from "dns-packet";
const router = Router();

router.get("/json-query", (req, res) => {
    const { name, type } = req.query;
    if (!name || !type) {
        res.status(400).send("Bad Request: Missing name or type query parameter.");
        return;
    }
    axios.get('https://cloudflare-dns.com/dns-query?name=' + name + '&type=' + type, {
        headers: {
            'Accept': 'application/dns-json'
        }
    }).then((response) => {
        res.send(response.data);
    }).catch((error) => {
        if (error.response) {
            res.status(error.response.status).send(error.response.data);
        }
    });
});

router.get("/dns-query", (req, res) => {
    const { dns } = req.query;
    if (!dns) {
        res.status(400).send("Bad Request: Missing dns query parameter.");
        return;
    }
    axios.get('https://cloudflare-dns.com/dns-query?dns=' + dns, {
        headers: {
            'Accept': 'application/dns-message'
        }
    }).then((response) => {
        res.send(response.data);
    }).catch((error) => {
        if (error.response) {
            res.status(error.response.status).send(error.response.data);
        }
    });
});

router.post("/dns-query", (req, res) => {
    const dns = req.body;
    if (!dns) {
        res.status(400).send("Bad Request: Missing dns body.");
        return;
    }
    axios.post('https://cloudflare-dns.com/dns-query', dns, {
        headers: {
            'Accept': 'application/dns-message',
            'Content-Type': 'application/dns-message'
        }
    }).then((response) => {
        res.send(response.data);
    }).catch((error) => {
        if (error.response) {
            res.status(error.response.status).send("upstream error");
        }
    });
});

export default router;
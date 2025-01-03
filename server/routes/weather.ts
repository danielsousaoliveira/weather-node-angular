import express, { Request, Response } from "express";
import WeatherData from "../models/WeatherData";
import { authenticateToken } from "../authMiddleware";
import { encryptMessages, decryptMessages } from "../utils/encryption";

const router = express.Router();

interface AuthenticatedRequest extends Request {
    user?: {
        userId: string;
    };
}

router.get("/data", authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: "User not authenticated" });
        }

        const weatherData = await WeatherData.find({ userId: req.user.userId });
        if (weatherData.length > 0) {
            const decryptedData = weatherData.map((data) => ({
                city: decryptMessages(data.city),
                date: data.date,
                temperature: data.temperature,
                networkPower: data.networkPower,
                rainingStatus: decryptMessages(data.rainingStatus),
                altitude: data.altitude,
                userId: data.userId,
            }));

            res.json(decryptedData);
        } else {
            res.json([]);
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        res.status(500).json({ error: "Failed to fetch weather data" });
    }
});

router.post("/measurement", authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: "User not authenticated" });
        }

        const { city, date, temperature, networkPower, rainingStatus, altitude, timezone } = req.body;

        const encryptedData = {
            city: encryptMessages(city),
            date: date,
            temperature: temperature,
            networkPower: networkPower,
            rainingStatus: encryptMessages(rainingStatus),
            altitude: altitude,
            timezone: timezone,
            userId: req.user.userId,
        };

        const weatherData = new WeatherData(encryptedData);
        await weatherData.save();

        res.status(201).json({ message: "Weather data saved successfully" });
    } catch (error) {
        console.error("Error saving weather data:", error);
        res.status(500).json({ error: "Failed to save weather data" });
    }
});

export default router;

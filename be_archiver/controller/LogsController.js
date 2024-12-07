import Logs from "../models/LogsModel.js";

export const getLogss = async (req, res) => {
    try {
        const response = await Logs.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getLogssbyId = async (req, res) => {
    try {
        const response = await Logs.findOne(
            {
                where: {
                    id: req.params.id
                }
            }
        );
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const createLogs = async (req, res) => {
    try {
        await Logs.create(req.body);
        res.status(201).json({ msg: "Logs created" });
    } catch (error) {
        console.log(error.message);
    }
}

export const updateLogs = async (req, res) => {
    try {
        await Logs.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.status(201).json({ msg: "Logs updated" });
    } catch (error) {
        console.log(error.message);
    }
}
export const deleteLogs = async (req, res) => {
    try {
        await Logs.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(201).json({ msg: "Logs deleted" });
    } catch (error) {
        console.log(error.message);
    }
}


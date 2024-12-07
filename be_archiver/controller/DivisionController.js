import Division from "../models/DivisionModel.js";
export const getDivisions = async (req, res) => {
    try {
        const response = await Division.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Error retrieving divisions" });
    }
}

export const getDivisionsbyId = async (req, res) => {
    try {
        const response = await Division.findOne(
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

export const createDivision = async (req, res) => {
    try {
        await Division.create(req.body);
        res.status(201).json({ msg: "Division created" });
    } catch (error) {
        console.log(error.message);
    }
}
export const updateDivision = async (req, res) => {
    try {
        await Division.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "Division updated" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Error updating division" });
    }
}

export const deleteDivision = async (req, res) => {
    try {
        await Division.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "Division deleted" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Error deleting division" });
    }
}



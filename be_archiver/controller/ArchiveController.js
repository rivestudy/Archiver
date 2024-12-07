import Archive from "../models/ArchiveModel.js";

class ArchiveError extends Error {
    constructor(message, statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
    }
}

class ArchiveValidator {
    static validateCreateData(data) {
        const requiredFields = [
            'divisionUser', 
            'kodeklasifikasi', 
            'tipe'
        ];

        for (let field of requiredFields) {
            if (!data[field]) {
                throw new ArchiveError(`Missing required field: ${field}`, 400);
            }
        }

        if (data.jumlah && data.jumlah <= 0) {
            throw new ArchiveError('Quantity must be a positive number', 400);
        }
    }
}

class ArchiveService {
    #model;

    constructor(model) {
        this.#model = model;
    }

    async findAll() {
        try {
            return await this.#model.findAll();
        } catch (error) {
            throw new ArchiveError('Error fetching archives');
        }
    }

    async findById(id) {
        try {
            const archive = await this.#model.findOne({ where: { id } });
            if (!archive) {
                throw new ArchiveError('Archive not found', 404);
            }
            return archive;
        } catch (error) {
            throw error instanceof ArchiveError 
                ? error 
                : new ArchiveError('Error fetching archive by ID');
        }
    }
}

export const getArchives = async (req, res) => {
    try {
        const archiveService = new ArchiveService(Archive);
        const response = await archiveService.findAll();
        res.status(200).json(response);
    } catch (error) {
        res.status(error.statusCode || 500).json({ 
            msg: error.message || "Error fetching archives" 
        });
    }
};

export const getArchivesbyId = async (req, res) => {
    try {
        const archiveService = new ArchiveService(Archive);
        const response = await archiveService.findById(req.params.id);
        res.status(200).json(response);
    } catch (error) {
        res.status(error.statusCode || 500).json({ 
            msg: error.message || "Error fetching archive by ID" 
        });
    }
};

export const getArchivesbyUId = async (req, res) => {
    try {
        const response = await Archive.findOne({
            where: { userid: req.params.id }
        });
        if (!response) {
            return res.status(404).json({ msg: "Archive not found" });
        }
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Error fetching archive by ID" });
    }
};

export const getArchivesbyDiv = async (req, res) => {
    try {
        const response = await Archive.findAll({
            where: { divisionUser: req.params.dname }
        });
        if (!response || response.length === 0) {
            return res.status(404).json({ msg: "Archive not found for this division" });
        }
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Error fetching archive by division" });
    }
};

export const getArchivesbyReview = async (req, res) => {
    try {
        const { dname, status } = req.params; 
        const accepted = status === 'acc' ? 1 : (status === 'dec' ? 0 : undefined);

        const response = await Archive.findAll({
            where: {
                divisionUser: dname,
                accepted: accepted
            }
        });

        if (!response || response.length === 0) {
            return res.status(404).json({ msg: `No archives found for division '${dname}' with status '${status}'` });
        }
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Error fetching archives by division and review status" });
    }
};

export const createArchive = async (req, res) => {
    try {
        ArchiveValidator.validateCreateData(req.body);

        const {
            accepted,
            divisionUser,
            kodeklasifikasi,
            kurun,
            detail,
            jumlah,
            tipe,
            retensiaktif,
            retensiinaktif,
            asli,
            tekstual,
            kondisibaik,
            others,
            userid
        } = req.body;

        const archive = await Archive.create({
            accepted,
            divisionUser,
            kodeklasifikasi,
            kurun,
            detail,
            jumlah,
            tipe,
            retensiaktif,
            retensiinaktif,
            asli,
            tekstual,
            kondisibaik,
            others,
            userid 
        });

        res.status(201).json({ 
            msg: "Archive successfully created", 
            archiveId: archive.id 
        });
    } catch (error) {
        console.error(error);
        res.status(error.statusCode || 500).json({ 
            msg: error.message || "Error creating archive" 
        });
    }
};

export const updateArchive = async (req, res) => {
    try {
        const [updated] = await Archive.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            res.status(200).json({ msg: "Archive updated" });
        } else {
            res.status(404).json({ msg: "Archive not found" });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Error updating archive" });
    }
};

export const deleteArchive = async (req, res) => {
    try {
        const deleted = await Archive.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(200).json({ msg: "Archive deleted" });
        } else {
            res.status(404).json({ msg: "Archive not found" });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Error deleting archive" });
    }
};

export default {
    getArchives,
    getArchivesbyId,
    getArchivesbyUId,
    getArchivesbyDiv,
    getArchivesbyReview,
    createArchive,
    updateArchive,
    deleteArchive
};
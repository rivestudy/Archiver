class BaseController {
    sendResponse(res, data, statusCode = 200) {
        res.status(statusCode).json(data);
    }

    sendError(res, error, statusCode = 500) {
        console.error(error.message || error);
        res.status(statusCode).json({ msg: error.message || "An error occurred" });
    }
}

export default BaseController;
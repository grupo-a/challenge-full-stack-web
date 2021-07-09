class BaseController {

    /** @type {Promise<Response>} */
    async getResponse(request, response) {
        return response;
    }

    async getResponseError(request, response, err) {
        return response.status(500).json({ msg: err.message || err });
    }

}

module.exports = BaseController
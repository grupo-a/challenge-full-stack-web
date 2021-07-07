class BaseController {

    /** @type {Promise<Response>} */
    async getResponse(request, response) {
        return response;
    }

}

module.exports = BaseController
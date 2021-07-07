const BaseController = require("../../../shared/controllers/BaseController");
const TemplateService = require("../services/TemplateService");

class TemplateController extends BaseController {

    async store(request, response) {

        const templateService = new TemplateService()

        let rs = await templateService.execute()

        console.log(rs);

        return super.getResponse(
            request,
            response.status(200).json(rs)
        )

    }

    async store2(request, response) {

        let result = { oi: 'oi' }

        return super.getResponse(
            request,
            response.status(200).json(result)
        )

    }

}

module.exports = TemplateController
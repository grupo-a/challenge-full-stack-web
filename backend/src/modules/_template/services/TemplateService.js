const TemplateModel = require("../models/TemplateModel")

class TemplateService {

    /* único método público a ser implementado*/
    async execute(param) {

        let templateModel = new TemplateModel()

        return templateModel.getTeste()

    }

}

module.exports = TemplateService
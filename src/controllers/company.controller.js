import Company from "../Structure/company.js";
import { dbModels as models } from "../Manager.js";
import { checkPasswordValidation } from "../utils/helpers.js";

const companyController = {
  signUpCompany: async (req, res) => {
    const { email, phoneNumber, address, TIN, yearOfEstablish, website, companysize, companyname, password } = req.body;
    const isNotValid = checkPasswordValidation(password);
    if (isNotValid) return res.send({ error: isNotValid });

    const foundCompany = await models.company.findOne({
      "credentials.companyname": companyname.toLowerCase(),
    });

    if (foundCompany)
      return res.send({ error: "Company already exists with that companyName." });

    const company = new Company({
      email,
      details: { phoneNumber, address, TIN, yearOfEstablish, website, companysize },
      credentials: { companyname, password },
    });
    await models.company.create(company);
    return res.send({ success: "Company was created", company });
  },
  signInCompany: async (req, res) => {
    const { companyname, password } = req.body;
    const company = await getCompanyByCompanyname(models, companyname);
    if (!company || company.credentials.password !== password)
      return res.send({ error: "Invalid credentials" });
    return res.send({ success: "Credentials are correct", company });
  }
}

export default companyController;
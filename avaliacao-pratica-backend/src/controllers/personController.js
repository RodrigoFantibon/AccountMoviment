import PersonService from "../services/personService";
import AccountService from "../services/accountService";
import { 
    savePersonValidator, 
    personByIdValidator,
    updatePersonByIdValidator
} from "./validations/personValidator";

class PersonController {

    async savePerson(req, res) {
        const data = req.body;
        const personService = new PersonService();

        const validation = savePersonValidator(data);
        if(!validation.success){
            return res.status(406).json(validation);
        }

        const result = await personService.insertPerson(data);
        if(result === false){
            return res.status(406).json({ message: 'CPF já cadastrado' });
        }
        res.status(201).json({ result });
    }

    async getPersonById(req, res){
        const params = req.params;
        const service = new PersonService();
        const validation = personByIdValidator(params);
        if(!validation.success){
            return res.status(406).json(validation);
        }

        const result = await service.getPerson(params.personId);

        res.status(200).json({ result });
    }

    async getPersonAccounts(req, res){
        const params = req.params;
        const accountService = new AccountService();
        const validation = personByIdValidator(params);
        if(!validation.success){
            return res.status(406).json(validation);
        }

        console.log(params.personId)

        const result = await accountService.getAccountsByPersonId(params.personId);

        res.status(200).json({ result });
    }

    async getPersons(req, res){
        const service = new PersonService();
        const result = await service.getPersons();

        res.status(200).json({ result });
    }

    async updatePerson(req, res){
        const { params, body } = req;
        const person = {
            ...body,
            personId: params.personId,
        };
        const service = new PersonService();

        const validation = updatePersonByIdValidator(person);
         console.log('validation:', validation)
        
        if(!validation.success){
            return res.status(406).json(validation);
        }
        
        const result = await service.updatePerson(person);

        res.status(200).json({ result });
    }

    async deletePerson(req, res){
        const params = req.params;
        const personService = new PersonService();
        const accountService = new AccountService();

        const validation = personByIdValidator(params);
        if(!validation.success){
            return res.status(406).json(validation);
        }

        const account = await accountService.getAccountsByPersonId(params.personId);
        if(account.length > 0){
            return res.status(406).json({ 
                success: false, 
                message: "O usário possui uma conta vinculada, não é possível excluir" 
            });
        }
        
        const result = await personService.deletePerson(params.personId);

        res.status(200).json({ result });
    }
    
}

export default new PersonController();
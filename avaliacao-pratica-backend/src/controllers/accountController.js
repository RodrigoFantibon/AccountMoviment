import AccountService from "../services/accountService";
import AccountMovementService from "../services/accountMovementService";
import PersonService from "../services/personService";
import { 
    saveAccountValidator, 
    accountByIdValidator 
} from "./validations/accountValidator";

class AccountController {

    async saveAccount(req, res) {
        const data = req.body;
        const validation = saveAccountValidator(data);
        
        const personService = new PersonService();
        const person = personService.getPerson(data.personId);

        if(!person){
            return res.status(406).json({
                success: false,
                message: "Pessoa não encontrada",
            });
        }
        
        const accountService = new AccountService();
        
        if(!validation.success){
            return res.status(406).json(validation);
        }
        const result = await accountService.insertAccount(data);

        res.status(201).json({ result });
    }

    async getAccountById(req, res){
        const params = req.params;
        const service = new AccountService();
        const validation = accountByIdValidator(params);
        if(!validation.success){
            return res.status(406).json(validation);
        }
        const result = await service.getAccount(params.accountId);

        res.status(200).json({ result });
    }

    async getAccounts(req, res){
        const accountService = new AccountService();
        const personService = new PersonService();
        const accounts = await accountService.getAccounts();

        const accountsResponse = await Promise.all(
            accounts.map(async (account) => ({
                ...account,
                person: await personService.getPerson(account.personId),
            }))
        )

        res.status(200).json({ result: accountsResponse });
    }

    async updateAccount(req, res){
        const { params, body } = req;
        const account = {
            accountId: params.accountId,
            ...body,
        };
        const service = new AccountService();

        const validation = accountByIdValidator(account);
         console.log('validation:', validation)
        
        if(!validation.success){
            return res.status(406).json(validation);
        }
        
        const result = await service.updateAccount(account);

        res.status(200).json({ result });
    }

    async deleteAccount(req, res){
        const params = req.params;
        const accountService = new AccountService();
        const accountMovementService = new AccountMovementService();

        const validation = accountByIdValidator(params);
        if(!validation.success){
            return res.status(406).json(validation);
        }

        const accountMovement = await accountMovementService.getAccountMovements(params.accountId)

        if(accountMovement.length > 0){
            return res.status(406).json({
                success: false,
                message: "Não é possível excluir uma conta com movimentações",
            });
        }

        const result = await accountService.deleteAccount(params.accountId);
        res.status(200).json({ result });
    }

    async getAccountMovements(req, res){
        const params = req.params;
        const accountMovementService = new AccountMovementService();

        const validation = accountByIdValidator(params);
        if(!validation.success){
            return res.status(406).json(validation);
        }

        const result = await accountMovementService.getAccountMovements(params.accountId);

        const balance = result.reduce((acc, item) => {
            return item.action === "deposit" 
                ? acc + item.value 
                : acc - item.value;
        }, 0);

        res.status(200).json({ result, balance });
    }
    
}

export default new AccountController();
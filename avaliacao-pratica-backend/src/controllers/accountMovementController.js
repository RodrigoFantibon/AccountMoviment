import AccountMovementService from "../services/accountMovementService";
import AccountService from "../services/accountService";
import { 
    saveAccountMovementValidator
} from "./validations/accountMovementValidator";

class AccountController {

    async saveAccountMovement(req, res) {
        const data = req.body;
        const accountService = new AccountService();
        const accountMovementService = new AccountMovementService();
        
        const validation = saveAccountMovementValidator(data);
        if(!validation.success){
            return res.status(406).json(validation);
        }

        const account = await accountService.getAccount(data.accountId);

        if(!account){
            return res.status(404).json({ message: 'Conta não encontrada' });
        }

        if(data.action === "withdraw" && account.balance - data.value < 0){
            return res.status(406).json({ message: 'Saldo insuficiente' });
        }

        const result = await accountMovementService.insertAccountMovement(data);

        accountService.updateAccountBalance({
            accountId: data.accountId,
            balance: data.action === "deposit" 
                ? account.balance + data.value 
                : account.balance - data.value,
        });

        res.status(201).json({ result });
    }

    async getAccountMovementById(req, res){
        const params = req.params;
        const service = new AccountMovementService();
        
        const result = await service.getAccountsMovements(params.accountMovementId);

        res.status(200).json({ result });
    }
}

export default new AccountController();
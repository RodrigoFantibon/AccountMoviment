import { ObjectId } from 'mongodb';
import { getClient, getDBName } from '../database/initMongoDB';

class AccountService {

    async insertAccount(data){     
        const client = getClient();
        const dbName = getDBName();
        const accountCollection = client.db(dbName).collection('accounts');
      
        try {
            const account = {
                personId: data.personId,
                accountNumber: data.accountNumber,
                balance: 0,
            }

            const result = await accountCollection.insertOne(account);
            console.log('dados inseridos: ', result);

          } catch (error) {
              console.error('Erro ao obter os dados da pessoa: ', error);
          }

    }

    async getAccount(accountId){
      const client = getClient();
      const dbName = getDBName();
      const collection = client.db(dbName).collection('accounts');
      
      try {
          const result = await collection.findOne({
              _id: new ObjectId(accountId)
          });
          
          console.log('dados obtidos: ', result);
          return result;
      } catch(error) {
          console.error('Erro ao obter documento: ', error);
      }
    }

    async getAccounts(){
      const client = getClient();
      const dbName = getDBName();
      const collection = client.db(dbName).collection('accounts');
      
      try {
          const result = await collection.find().toArray();
          console.log('dados obtidos: ', result);
          return result;
      } catch(error) {
          console.error('Erro ao obter documento: ', error);
      }
    }

    async updateAccount(data){
      const client = getClient();
      const dbName = getDBName();
      const collection = client.db(dbName).collection('accounts');
        
      try {
          const result = await collection.updateOne({
              _id: new ObjectId(data.accountId)
          }, {
              $set: {
                accountNumber: data.accountNumber
              }
          });
          console.log('dados atualizados: ', result);
      } catch(error) {
          console.error('Erro ao atualizar documento: ', error);
      }
    }

    async updateAccountBalance(data){
        const client = getClient();
        const dbName = getDBName();
        const collection = client.db(dbName).collection('accounts');
          
        try {
            const result = await collection.updateOne({
                _id: new ObjectId(data.accountId)
            }, {
                $set: {
                  balance: data.balance
                }
            });
            console.log('dados atualizados: ', result);
        } catch(error) {
            console.error('Erro ao atualizar documento: ', error);
        }
      }

    async deleteAccount(accountId){
      const client = getClient();
      const dbName = getDBName();
      const collection = client.db(dbName).collection('accounts');
      try {
          const result = await collection.deleteOne({
              _id: new ObjectId(accountId)
          });
          console.log('dado deletado: ', result);
      } catch(error) {
          console.error('Erro ao deletar documento: ', error);
      }
    }

    async getAccountsByPersonId(personId){
        const client = getClient();
        const dbName = getDBName();
        const collection = client.db(dbName).collection('accounts');
        try {
            const result = await collection.find().filter({ personId }).toArray();
            console.log('dado obtido: ', result);
            return result;
        } catch(error) {
            console.error('Erro ao obter documento: ', error);
        }
    }

}

export default AccountService;
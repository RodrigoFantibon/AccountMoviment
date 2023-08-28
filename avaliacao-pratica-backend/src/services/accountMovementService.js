import { ObjectId } from 'mongodb';
import { getClient, getDBName } from '../database/initMongoDB';

class AccountMovementService {

    async insertAccountMovement(data){
      const client = getClient();
      const dbName = getDBName();
      const collectionAccountMovement = client.db(dbName).collection('accounts_movements');

      const dataToInsert = {
        accountId: data.accountId,
        value: data.value,
        action: data.action,
        date: new Date().toISOString()
      };
      
      try {
        const result = await collectionAccountMovement.insertOne(dataToInsert);
        console.log('dados inseridos: ', result);

      } catch (error) {
        console.error('Erro ao obter os dados da pessoa: ', error);
      }
    }

    async getAccountMovements(accountId){
      const client = getClient();
      const dbName = getDBName();
      const collection = client.db(dbName).collection('accounts_movements');
      
      try {
          const result = await collection.find().filter({ accountId }).toArray();
          console.log('dados obtidos: ', result);
          return result;
      } catch(error) {
          console.error('Erro ao obter documento: ', error);
      }
    }
}

export default AccountMovementService;
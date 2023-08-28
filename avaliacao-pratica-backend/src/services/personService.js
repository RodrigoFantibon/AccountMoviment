import { ObjectId } from 'mongodb';
import { getClient, getDBName } from '../database/initMongoDB';

class PersonService {

    async insertPerson(data){
        const client = getClient();
        const dbName = getDBName();
        const collection = client.db(dbName).collection('persons');

        const dataToInsert = {
            name: data.name,
            document: data.document,
            address: data.address
        };
        
        try {

            const getPersons = await collection.find().filter({ document: data.document }).toArray();
        
            if(getPersons.length > 0){
                return false;
            }

            const result = await collection.insertOne(dataToInsert);
            console.log('dados inseridos: ', result.insertedId);
        } catch(error) {
            console.error('Erro ao inserir documento: ', error);
        }
    }

    async getPerson(personId){
      const client = getClient();
      const dbName = getDBName();
      const collection = client.db(dbName).collection('persons');
      
      try {
          const result = await collection.findOne({
              _id: new ObjectId(personId)
          });
          return result;
      } catch(error) {
          console.error('Erro ao obter documento: ', error);
      }
    }

    async getPersons(){
      const client = getClient();
      const dbName = getDBName();
      const collection = client.db(dbName).collection('persons');
      
      try {
          const result = await collection.find().toArray();
          console.log('dados obtidos: ', result);
          return result;
      } catch(error) {
          console.error('Erro ao obter documento: ', error);
      }
    }

    async updatePerson(data){
      const client = getClient();
      const dbName = getDBName();
      const collection = client.db(dbName).collection('persons');
      try {
          const result = await collection.updateOne({
              _id: new ObjectId(data.personId)
          }, {
              $set: {
                  name: data.name,
                  document: data.document,
                  address: data.address
              }
          });
          console.log('dados atualizados: ', result);
      } catch(error) {
          console.error('Erro ao atualizar documento: ', error);
      }
    }

    async deletePerson(personId){
      const client = getClient();
      const dbName = getDBName();
      const collection = client.db(dbName).collection('persons');
      
      console.log('personId: ', personId);
      try {
          const result = await collection.deleteOne({
              _id: new ObjectId(personId)
          });
          console.log('dado deletado: ', result);
      } catch(error) {
          console.error('Erro ao deletar documento: ', error);
      }
    }

}

export default PersonService;
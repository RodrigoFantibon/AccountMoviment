import { Router } from 'express';

import personController from './controllers/personController';
import accountController from './controllers/accountController';
import accountMovementController from './controllers/accountMovementController';

const routes = new Router();

//routes person
routes.post('/person', personController.savePerson);
routes.get('/person/:personId', personController.getPersonById);
routes.get('/person/:personId/accounts', personController.getPersonAccounts);
routes.get('/persons', personController.getPersons);
routes.put('/person/:personId', personController.updatePerson);
routes.delete('/person/:personId', personController.deletePerson);

//routes account
routes.post('/account', accountController.saveAccount);
routes.get('/account/:accountId', accountController.getAccountById);
routes.get('/account/:accountId/movements', accountController.getAccountMovements);
routes.get('/accounts', accountController.getAccounts);
routes.put('/account/:accountId', accountController.updateAccount);
routes.delete('/account/:accountId', accountController.deleteAccount);

//routes account movement
routes.post('/movement', accountMovementController.saveAccountMovement);

export default routes;
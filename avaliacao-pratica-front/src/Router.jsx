import { Routes, Route } from 'react-router-dom';
import { Persons } from './pages/persons';
import { Accounts } from './pages/accounts';
import { AccountsMovements } from './pages/accountsMovements';


export function Router() {
    return (
        <Routes>
            <Route path='/' element={<Persons />} />
            <Route path='/accounts' element={<Accounts />} />
            <Route path='/accountsMovements' element={<AccountsMovements />} />
        </Routes>
    )
}
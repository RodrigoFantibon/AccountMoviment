import { Header } from "../../components/header";
import { Select } from '../../components/Select';
import { Input } from '../../components/Input';
import { useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import { createColumnHelper } from '@tanstack/react-table';
import { Table } from '../../components/Table';

import './style.css';
import api from "../../tools/api";
import { toast } from "react-toastify";
import { formatCPF } from "../../tools/formatCPF";
import { formatCurrency } from "../../tools/formatCurrency";
import { formatDate } from "../../tools/formatDate";
const columnHelper = createColumnHelper();

export function AccountsMovements(){
    const [ loading, setLoading ] = useState(true);
    const [ persons, setPersons ] = useState([]);
    const [ accounts, setAccounts ] = useState([]);
    const [ accountMovement, setAccountMovement ] = useState({
        personId: '',
        accountId: '',
        value: '',
    });
    const [ movements, setMovements ] = useState([]);
    const [ balance, setBalance ] = useState(0);

    const handleFetch = async () => {
        try {
            const personsResponse = await api.get('/persons');
            setPersons(personsResponse.data.result.map(person => ({
                label: `${person.name} - ${formatCPF(person.document)}`,
                value: person._id
            })));
            
            setLoading(false);
        } catch (error) {
            toast.error('Erro ao buscar pessoas!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setLoading(false);
        }
    }

    const handleFetchPersonAccounts = async () => {
        try {
            const accountsResponse = await api.get(`/person/${accountMovement.personId}/accounts`);

            setAccounts(accountsResponse.data.result.map(account => ({
                label: `${account.accountNumber} - Saldo: ${formatCurrency(account.balance)}`,
                value: account._id
            })));
            
            setLoading(false);
        } catch (error) {
            console.log(error)
            toast.error('Erro ao buscar contas!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setLoading(false);
        }
    }

    const handleFetchAccountMovements = async () => {
        try {
            const movementsResponse = await api.get(`/account/${accountMovement.accountId}/movements`);
            setMovements(movementsResponse.data.result);
            setBalance(movementsResponse.data.balance);
            setLoading(false);
        } catch (error) {
            console.log(error)
            toast.error('Erro ao buscar contas!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setLoading(false);
        }
    }
    
    const handleChange = (event) => {
        setAccountMovement(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }

    const handleSubmit = async () => {
        try {
            await api.post('/movement', {
                ...accountMovement, 
                value: parseFloat(accountMovement.value)
            });

            toast.success('Movimentação criada!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });

            handleFetchPersonAccounts()
            handleFetchAccountMovements()
            setAccountMovement(prev => ({
                ...prev,
                value: '',
                action: '',
            }))
        } catch (error) {
            toast.error(error.response.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }
    
    const columns = [
        columnHelper.accessor('date', {
            header: 'Data',
            cell: data => formatDate(data.getValue()),
        }),
        columnHelper.accessor('value', {
            header: 'Valor',
            cell: data => {
                const isDeposit = data.row.original.action === 'deposit';
                return (
                    <p style={{
                        color: !isDeposit ? 'red' : 'green',
                        fontWeight: 'bold',
                    }}>
                        {`${isDeposit ? '' : '-'} ${formatCurrency(data.getValue())}`}
                    </p>
                )
            },
        })
    ]
    
    useEffect(() => {
        handleFetch();
    }, [])

    useEffect(() => {
        if(accountMovement.personId){
            handleFetchPersonAccounts();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accountMovement.personId])

    useEffect(() => {
        if(accountMovement.accountId){
            handleFetchAccountMovements();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accountMovement.accountId])
    
    return(
        <div className='body'>
            <Header />
            {!loading && (
                <div className='content'>
                    <h1 className='page-title'>Cadastro de Movimentação</h1>
                    <div className="register-section">
                        <div className='fields-container'>
                            <Select label="Pessoa" name="personId" options={persons} onChange={handleChange} />
                            <Select label="Conta" name="accountId" options={accounts} onChange={handleChange} />
                            <Input label="Valor" name="value" onChange={handleChange} value={accountMovement.value} />
                            <Select label="Depositar/Retirar" name="action" options={[
                                { label: 'Depositar', value: 'deposit' },
                                { label: 'Retirar', value: 'withdraw' }
                            ]} onChange={handleChange} value={accountMovement.action}/>
                            <Button name="Salvar" onClick={handleSubmit} />
                        </div>
                        <div className="balance">
                            <p>{accountMovement.accountId && balance && (`Saldo: ${formatCurrency(balance)}`)}</p>
                        </div>
                    </div>
                    <br />
                    <hr />
                    <br />
                    {movements.length > 0 
                        ? (<Table data={movements} columns={columns} />)
                        : (<p style={{color: '#fff'}}>Nenhum dado encontrado!</p>)
                    }
                </div>
            )}
        </div>
    )
}
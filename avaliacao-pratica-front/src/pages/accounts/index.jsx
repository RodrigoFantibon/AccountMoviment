import { Header } from "../../components/header";
import { Select } from '../../components/Select';
import { Input } from '../../components/Input';
import { useState, useEffect } from 'react';
import { Button } from '../../components/Button';
import { createColumnHelper } from '@tanstack/react-table';
import { Table } from '../../components/Table';
import api from '../../tools/api';
import { toast } from 'react-toastify';
import './style.css';
import { formatCPF } from "../../tools/formatCPF";
const columnHelper = createColumnHelper();

export function Accounts(){
    const [ loading, setLoading ] = useState(true);
    const [ accounts, setAccounts ] = useState([]);
    const [ persons, setPersons ] = useState([]);
    const [ account, setAccount ] = useState({
        personId: '',
        accountNumber: '',
    });
    
    const handleFetch = async () => {
        try {
            const accountsResponse = await api.get('/accounts');
            const personsResponse = await api.get('/persons');
            
            setAccounts(accountsResponse.data.result);
            setPersons(personsResponse.data.result.map(person => ({
                label: `${person.name} - ${formatCPF(person.document)}`,
                value: person._id
            })));
            
            setLoading(false);
        } catch (error) {
            toast.error('Erro ao buscar dados!', {
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
        setAccount(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }
    
    const handleSubmit = async () => {
        try {
            if(account._id){
                await api.put(`/account/${account._id}`, account);
                toast.success('Conta atualizada com sucesso!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            } else {
                await api.post('/account', account);
                toast.success('Conta criada com sucesso!', {
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
            setAccount({
                personId: '',
                accountNumber: '',
            })
            handleFetch()
        } catch (error) {
            toast.error('Erro ao cadastrar conta!', {
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
    
    const handleEdit = (value) => {
        setAccount(value)
    }
    
    const handleDelete = async (id) => {
        try {
            await api.delete(`/account/${id}`);
            handleFetch()
        } catch (error) {
            console.log("sdfsdfdf",error)
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

    const handleCancelEdit  = () => {
        setAccount({
            personId: '',
            accountNumber: '',
        });
    }
    
    const columns = [
        columnHelper.accessor('person.name', {
            header: 'Pessoa',
            cell: data => data.getValue(),
        }),
        columnHelper.accessor('person.document', {
            header: 'CPF',
            cell: data => formatCPF(data.getValue()),
        }),
        columnHelper.accessor('accountNumber', {
            header: 'Numero da conta',
            cell: data => data.getValue(),
        }),
        columnHelper.accessor('_id', {
            header: 'Ações',
            cell: data => (
                <div className='button-actions'>
                    <Button name="Editar" onClick={() => handleEdit(data.row.original)}/>
                    <Button name="Excluir" onClick={() => handleDelete(data.getValue())}/>
                </div>
            ),
        }),
    ]

    useEffect(() => {
        handleFetch();
    }, [])

    return (
        <div className='body'>
            <Header />
            {!loading && (
                <div className='content'>
                    <h1 className='page-title'>Cadastro de Conta</h1>
                    <div className='fields-container'>
                        <Select label="Pessoa" name="personId" options={persons} onChange={handleChange} value={account.personId}/>
                        <Input type="number" label="Número da conta" name="accountNumber" onChange={handleChange} value={account.accountNumber}/>
                        <div className='buttons-container'>
                            <Button name="Salvar" onClick={handleSubmit} />
                            {account._id && <Button name="Cancelar Edição" onClick={handleCancelEdit} />}
                        </div>
                    </div>
                    <br />
                    <hr />
                    <br />
                    {accounts.length > 0 
                        ? (<Table data={accounts} columns={columns} />)
                        : (<p style={{color: '#fff'}}>Nenhum dado encontrado!</p>)
                    }
                </div>
            )}
        </div>
    )
}
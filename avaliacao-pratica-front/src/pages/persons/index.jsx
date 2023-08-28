import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { createColumnHelper } from '@tanstack/react-table';

import { Input } from '../../components/Input';
import { Header } from '../../components/header';
import { Button } from '../../components/Button';
import { Table } from '../../components/Table';

import api from '../../tools/api';
import './style.css';
import { formatCPF } from '../../tools/formatCPF';

const columnHelper = createColumnHelper()

export function Persons(){
    const [ loading, setLoading ] = useState(true);
    const [ person, setPerson ] = useState({
        name: '',
        document: '',
        address: ''
    });

    const [ persons, setPersons ] = useState([]);

    const handleFetch = async () => {
        try {
            const response = await api.get('/persons');
            setPersons(response.data.result);
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

    const handleChange = (event) => {
        if(event.target.name === 'document'){
            event.target.value = formatCPF(event.target.value)
        }

        setPerson(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }

    const handleSubmit = async () => {
        try {
            person.document = person.document.replace(/[.-]/g, '');
            if(person._id){
                await api.put(`/person/${person._id}`, person);
                toast.success('Usuário atualizado com sucesso!', {
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
                await api.post('/person', person);
                toast.success('Usuário criado com sucesso!', {
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
            setPerson({
                name: '',
                document: '',
                address: ''
            })
            handleFetch()
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

    const handleEdit = (item) => {
        setPerson({
            ...item,
            document: formatCPF(item.document)
        });
    }

    const handleDelete = async (id) => {
        try {
            await api.delete(`/person/${id}`);
            toast.success('Usuário excluido com sucesso!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            handleFetch()
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

    const handleCancelEdit  = () => {
        setPerson({
            name: '',
            document: '',
            address: ''
        });
    }

    const columns = [
        columnHelper.accessor('name', {
            header: 'Nome',
            cell: data => data.getValue(),
        }),
        columnHelper.accessor('document', {
            header: 'CPF',
            cell: data => formatCPF(data.getValue()),
        }),
        columnHelper.accessor('address', {
            header: 'Endereço',
            cell: data => data.getValue(),
        }),
        columnHelper.accessor('_id', {
            header: 'Ações',
            cell: data => (
                <div className='button-actions'>
                    <Button name="Editar" onClick={() => {
                        handleEdit(data.row.original)
                    }} />
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
            <div className='content'>
                <h1 className='page-title'>Cadastro de Pessoas</h1>
                <div className='fields-container'>
                    <Input label="Nome" name="name" onChange={handleChange} value={person.name} />
                    <Input label="CPF" name="document" onChange={handleChange} value={person.document} />
                    <Input label="Endereço" name="address" onChange={handleChange} value={person.address} />
                    <div className='buttons-container'>
                        <Button name="Salvar" onClick={handleSubmit} />
                        {person._id && <Button name="Cancelar Edição" onClick={handleCancelEdit} />}
                    </div>
                </div>
                <br />
                <hr />
                <br />
                {!loading && (
                    persons.length > 0 
                        ? (<Table data={persons} columns={columns} />)
                        : (<p style={{color: '#fff'}}>Nenhum dado encontrado!</p>)
                )}
            </div>
        </div>
    )
}
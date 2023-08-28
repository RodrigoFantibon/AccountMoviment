import './styles.css';

export function Header(){
  return (
    <div className="container">
      <ul id="nav-list">
        <li><a href="http://localhost:5173/"> Pessoa </a></li>
        <li><a href="http://localhost:5173/accounts"> Conta </a></li>
        <li><a href="http://localhost:5173/accountsMovements"> Movimentação </a></li>
      </ul>
    </div>
  )
}
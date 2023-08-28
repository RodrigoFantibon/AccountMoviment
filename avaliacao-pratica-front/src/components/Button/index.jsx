import './styles.css';

// eslint-disable-next-line react/prop-types
export function Button({ name, ...rest }){
  return (
    <div className="button-container">
      <button className='button' {...rest}>{name}</button>
    </div>
  )
}
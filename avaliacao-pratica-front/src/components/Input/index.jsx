import './styles.css';

// eslint-disable-next-line react/prop-types
export function Input({ label, ...rest }){

  return (
    <div className="input-container">
      {label && <div className="input-label">{label}:</div>}
      <input
        className="input"
        {...rest}
      />
    </div>
  )
}
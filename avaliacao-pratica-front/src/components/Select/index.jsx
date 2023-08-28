import './styles.css';

// eslint-disable-next-line react/prop-types
export function Select({ label, options = [], ...rest }) {
  return (
    <div className="select-container">
      {label && <div className="select-label">{label}:</div>}
      <select className="select" {...rest} >
        <option key="default" value=''>Selecione</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  )
}
import React from 'react'

function Option({ text, isSelected, onClick, value }) {
    return (
        <div className={`option ${isSelected ? 'option-selected': ''}`}
        // style={isSelected? selectedStyles: {}}
        onClick={() => onClick(value)}
        onMouseEnter={(e) => e.target.classList.add('option-selected') }
        onMouseLeave={(e) => !isSelected && e.target.classList.remove('option-selected') }
        >
            {text}
        </div>
    )
}

const selectedStyles = {
    borderColor: 'var(--sec-reg)',
    borderWidth: '5px',
    boxShadow: '0px 0px 16px 2px var(--sec-light)',
}

export default Option

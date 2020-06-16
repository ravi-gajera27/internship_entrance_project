import React from 'react';

const input  = (props) => {
   let inputElement = null;

    switch(props.elementType){
        case ( 'input' ): 
            inputElement = ( <input onChange={props.changed} 
                className="form-control" 
                {...props.elementConfig} 
                value={props.value} 
                required /> );
            break;
        case ( 'select' ): 
            inputElement = ( 
                <select value={props.value} className="form-control" onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} 
                            value={option.value}>
                            {option.displayValue}
                        </option>
                     ))}
                 </select>
             );
            break;
        default : inputElement = ( <input className="form-control" 
                    onChange={props.changed}                
                    {...props.elementConfig} 
                    value={props.value} 
                    required /> );
    }

    return(
        <div className="form-group">
            <label>{ props.label }</label>
            {inputElement}
        </div>
    )

}

export default input;
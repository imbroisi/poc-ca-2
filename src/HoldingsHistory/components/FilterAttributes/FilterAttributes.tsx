import { ATTRIBUTES } from '../../config';
import { useAttributeSelection } from '../../context/AttributeSelecionContext';
import './FilterAttributes.css';

const FilterAttributes = () => {
const { checkedAttributes, setCheckedAttributes } = useAttributeSelection();
  
  const handleClearSelectedItems = () => {
    setCheckedAttributes([]);
  }

  const handleCheckboxChange = (index: number) => {
    const newCheckedAttributes = [...checkedAttributes];
    newCheckedAttributes[index] = !newCheckedAttributes[index];
    
    setCheckedAttributes(newCheckedAttributes);
  }

  return (
    <div style={{ padding: '6px',fontSize: '10px', fontWeight: 400 }}>
      <div style={{ textTransform: 'uppercase' }}>
        Attributes
      </div>
      
      <div role="button" onClick={handleClearSelectedItems} style={{ marginTop: '10px', marginBottom: '10px', color: '#3cabc9', cursor: 'pointer'}}>
        Clear Selected Items
      </div>

      {Object.keys(ATTRIBUTES).map((attribute, index) => (
        <div key={attribute} style={{ marginTop: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          
          {/* TODO: replace by AM checkbox component */}
          <input type="checkbox" checked={!!checkedAttributes[index]} onChange={() => handleCheckboxChange(index)} /> <span style={{ fontSize: '12px', fontWeight: 500, marginLeft: '2px' }}>{attribute}</span>
        
        </div>
      ))}

    </div>
  );
}

export default FilterAttributes;

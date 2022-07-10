import PropTypes from 'prop-types'
import Button  from './Button';

const Header = ({title , showAdd , onAdd}) => {
    return (
        <div className="header">
            <h1>{title}</h1>
            <Button color={showAdd ? '#5FD068' : 'red'} text={showAdd ? 'Add new Task' : 'Close'} onClick={onAdd}/>
        </div>
    );
} 

Header.defaultProps = {
    'title' : 'Task Tracker'
}
Header.propTypes = {
    title : PropTypes.string   
}

export default Header;

import people from '../../icons/people.png'


function Dropdown ({usersInRoom}) {
    return (
        <div className="dropdown">
            <div className="dropdown-btn">
                <img className="peopleIcon" src={people} alt="people image"/>
                
            </div>
            <div className="dropdown-content">
                <div className="dropdown-item">User 1</div>
                <div className="dropdown-item">User 2</div>
            </div>
        </div>
    )
}

export default Dropdown
import React from "react";

class Navbar extends React.Component {
    render () {
        return (
            <div className="d-flex flex-row justify-content-between bg-dark p-3 text-white align-items-center">
                <h5>
                    Todo List App
                </h5>
                <h5>You Have 0 Todo Item</h5>
            </div>
        )
    }
}

export default Navbar;
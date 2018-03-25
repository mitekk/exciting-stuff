import react, { Component } from 'react';
import PropTypes from 'prop-types';

class CoursesPage extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            course: { title: null }
        }

        this.onTitleChange = this.onTitleChange.bind(this);
        this.onClickSave = this.onClickSave.bind(this);
    }

    onTitleChange(event) {
        this.setState({ ...course, title: event.target.value });
    }

    onClickSave(event) {
        alert(`Saving ${this.state.course.title}`);
    }

    render() {
        return (
            <div>
                <h1>Courses</h1>
                <h2>Add Course</h2>
                <input
                    type="text"
                    onChange={this.onTitleChange}
                    value={this.state.course.title} />
                <input
                    type="submit"
                    value="save"
                    onClick={this.onClickSave} />
            </div>
        );
    }
}

export default CoursesPage;
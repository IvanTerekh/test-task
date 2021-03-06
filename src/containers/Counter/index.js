import React, {Component} from "react";
import {Col, Row} from "react-bootstrap";
import {connect} from "react-redux";
import store from "../../redux/store";

class Counter extends Component {
    constructor(props) {
        super(props);
        this.initialTime = Date.now();

        this.state = {
            counter: 0
        }
    }

    setCounter(step) {
        //Set updating frequency no bigger than 60 Hz to improve performance.
        if (step < 1000/60) {
            step = Math.floor(1000/60);
        }
        clearInterval(this.intervalId);
        this.intervalId = setInterval(() => {
            let currValue = Date.now() - this.initialTime;
            this.setState({
                counter: currValue - currValue%step
            })
        }, step);
    }

    componentDidMount() {
        this.currStep = this.props.step;
        this.setCounter(this.currStep);
        store.subscribe(() => {
            let oldStep = this.currStep;
            this.currStep = store.getState().counter.step;
            if (this.currStep !== oldStep) {
                this.setCounter(this.currStep);
            }
        });
    }

    render() {
        return <Row >
            <Col smOffset={4} sm={8}><h4>Counter</h4></Col>
            <Col smOffset={4} sm={8}><h4>{this.state.counter}</h4></Col>
        </Row>
    }
}

export default connect((state) => {
    return state.counter
})(Counter);

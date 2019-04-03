import React from "react";

import Question from "./question";

class QuestionInfo extends Question {
  componentDidMount() {
    this.startTimer();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentStep !== this.props.currentStep) {
      this.startTimer();
    }
  }

  startTimer() {
    let number = 0;
    let miliseconds = 200;
    let interval = setInterval(() => {
      this.setState({ timerPosition: number++ });
      if (number > 50) {
        clearInterval(interval);
        this.setState({ canEvaluate: true });
      }
    }, miliseconds);
  }

  handleEvaluate = () => {
    this.setState({ state: "initial" });
    this.props.onGoNext();
  };

  render() {
    const { currentStep } = this.props;
    const { timerPosition } = this.state;

    return (
      <div className="row">
        <div className="col-12 col-lg-4">
          {this.renderImage(currentStep.image, currentStep.text)}
        </div>
        <div className="col-12 col-lg-8">
          <div className="question">
            {this.renderQuestion(currentStep.question)}
            {/* TODO -- Add audio and icon */}
            <div className="progress progress-info">
              <div
                className="progress-bar bg-primary-light"
                role="progressbar"
                style={{
                  width: (timerPosition / 50) * 100 + "%"
                }}
                aria-valuenow={timerPosition}
                aria-valuemin="0"
                aria-valuemax="100"
              />
            </div>
            {this.renderEvaluate("Continuar")}
          </div>
        </div>
      </div>
    );
  }
}

export default QuestionInfo;

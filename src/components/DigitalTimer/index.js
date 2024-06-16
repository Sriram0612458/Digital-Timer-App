import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {isStarted: false, mins: 25, seconds: 0}

  clearinterval = () => clearInterval(this.timerId)

  onClickReset = () => {
    this.clearinterval()
    this.setState({isStarted: false, mins: 25, seconds: 0})
  }

  incrementTimeElapsedInSeconds = () => {
    const {mins, seconds} = this.state
    const isTimerCompleted = seconds === mins * 60
    console.log('running')
    if (isTimerCompleted) {
      this.clearinterval()
      this.setState({isStarted: false})
    } else {
      this.setState(prevState => ({
        seconds: prevState.seconds + 1,
      }))
    }
  }

  decrement = () => {
    const {mins} = this.state
    if (mins > 1) {
      this.setState(prev => {
        const {mins} = prev
        return {mins: prev.mins - 1}
      })
    }
  }

  increment = () => {
    this.setState(prev => {
      const {mins} = prev
      return {mins: prev.mins + 1}
    })
  }

  clicking = () => {
    const {isStarted, mins, seconds} = this.state
    const isRunning = seconds === mins * 60

    if (isRunning) {
      this.setState({seconds: 0})
    }
    if (isStarted) {
      this.clearinterval()
    } else {
      this.timerId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(previous => {
      const {isStarted} = previous
      return {isStarted: !isStarted}
    })
  }

  getElapsedSecondsInTimeFormat = () => {
    const {mins, seconds} = this.state
    const totalRemainingSeconds = mins * 60 - seconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const second = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = second > 9 ? second : `0${second}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isStarted, mins, seconds} = this.state
    const imageUrl = isStarted
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const alt = isStarted ? 'pause icon' : 'play icon'
    const disable = seconds > 0
    return (
      <div className="main-bg">
        <h1 className="main-heading">Digital Timer</h1>
        <div className="responsive">
          <div className="timer-details-1">
            <div className="timer-styling">
              <h1 className="timer-count">
                {this.getElapsedSecondsInTimeFormat()}
              </h1>
              <p className="timer-type">{isStarted ? 'Running' : 'Paused'}</p>
            </div>
          </div>
          <div>
            <div className="button-elements">
              <button className="buttonEle" onClick={this.clicking}>
                <img src={imageUrl} className="image" alt={alt} />
                <p className="para">{isStarted ? 'Pause' : 'Start'}</p>
              </button>
              <button className="buttonEle" onClick={this.onClickReset}>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  className="image"
                  alt="reset icon"
                />
                <p className="para">Reset</p>
              </button>
            </div>
            <div className="increment-section">
              <p className="para2">Set Timer limit</p>
              <div className="increment">
                <button
                  className="dec"
                  onClick={this.decrement}
                  disabled={disable}
                >
                  -
                </button>
                <p className="para-one">{mins}</p>
                <button
                  className="dec"
                  onClick={this.increment}
                  disabled={disable}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer

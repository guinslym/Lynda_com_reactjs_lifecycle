import React, { Component } from 'react'
import {start, stop, printWasted, printInclusive} from 'react-addons-perf'
import loggify from './loggify'
import uuid from 'uuid/v4'
import {Parent, Column, Row, ChildContainer, H4, H5, Id, Value, Item, NoKey, Medium, Faster} from './styled'

class App extends Component {

  static displayName = "App"

  state = {
    showPollChild: true,
  }

  fetchData = () => {
    console.log("Going to fetch data!")
    setTimeout(
      ()=> {
        console.log("Data retrieved")
        this.setState({
          data: getRandomInt(1,10)
        })
      },
      1500
    )
  }

  parentPoll = () => {
    this.pollInterval = setInterval(
      ()=>{
        this.setState({
          parentPoll: getRandomInt(1,2)
        })
      },
      1000
    )
  }


  componentDidMount(){
    this.fetchData()
    this.parentPoll()
    this.canvasCtx = this.refs.appCanvas.getContext('2d')
    let {canvasCtx} = this
    canvasCtx.fillStyle = "blue"
    canvasCtx.arc(75, 75, 50, 0, 2 * Math.PI)
    canvasCtx.fill()
  }

  componentWillUnmount() {
    clearInterval(this.pollInterval)
  }


  componentWillUpdate(nextProps, nextState){
    if (nextState.parentPoll !== this.state.parentPoll) {
      this.canvasCtx.clearRect(0,0,200,200)
    }
  }


  componentDidUpdate(prevProps, prevState){
    if (prevState.parentPoll !== this.state.parentPoll) {
      let {canvasCtx} = this
      canvasCtx.fillStyle = (prevState.parentPoll % 2 === 1) ? "green" : "red"
      canvasCtx.arc(75, 75, 50, 0, 2 * Math.PI)
      canvasCtx.fill()
    }
  }

  render() {
    let {data, showPollChild, parentPoll} = this.state
    return (
      <Parent>
        <Column>
          <H4>data: {data}</H4>
          <H4>parentPoll: {parentPoll}</H4>
          <canvas
            ref="appCanvas"
            height={200}
            width={200}
          />
          <button
            onClick={()=>{
              this.setState((prevState) => {
                return {
                  showPollChild: !prevState.showPollChild
                }
              })
            }}
          >
            {(showPollChild) ? "Hide" : "Show"} PollChild
          </button>
          {(showPollChild) ? (
            <PollChild
              data={data}
              parentPoll={parentPoll}
            />
          ) : null}
        </Column>
        <Column>
          <BigList/>

        </Column>
      </Parent>
    )
  }
}


class PollChild extends Component {

  static displayName = "PollChild"

  state = {}

  componentDidMount(){
    this.pollData()
  }

  componentWillUnmount(){
    clearInterval(this.pollInterval)
  }

  pollData = () => {
    this.pollInterval = setInterval(
      ()=>{
        this.setState({
          poll: getRandomInt(1,5)
        })
      },
      1000
    )
  }

  shouldComponentUpdate(nextProps, nextState){
    if (nextProps.parentPoll !== this.props.parentPoll) {
      return true
    }
    if (nextState.poll !== this.state.poll) {
      return true
    }

    return false
  }

  render() {
    let {data, parentPoll} = this.props
    let {poll} = this.state
    return (
      <ChildContainer>
        <H5>poll: {poll}</H5>
        <H5>data: {data}</H5>
        <H5>parentPoll: {parentPoll}</H5>
      </ChildContainer>
    )
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}



class BigList extends Component {

  static displayName = "BigList"


  constructor(props) {
    super(props)

    this.ids = []

    for (let i = 0; i < 500; i++) {
      this.ids.push(uuid())
    }


    this.state = {
      items: this.ids.map((id)=>{
        return {
         id,
         value: getRandomInt(1,5)
        }
      })
    }
  }

  updateList = () => {
    let newItems = this.ids.map((id)=>{
      return {
       id,
       value: getRandomInt(1,5)
      }
    })
    start()
    this.setState(
      ()=>{
        return {
          items: newItems
        }
      },
      ()=>{
        stop()
        printInclusive()
        printWasted()
      }
    )
  }



  render() {
    return (
      <Row>
        <button
          onClick={this.updateList}
        >
          UpdateList
        </button>
        <NoKey>
          <H4>no key</H4>
          {this.state.items.map((item, index) => (
            <Regular
              item={item}
              key={index}
            />
          ))}
        </NoKey>
        <Medium>
          <H4>key, no optimization</H4>
          {this.state.items.map(item => (
            <Regular
              item={item}
              key={item.id}
            />
          ))}
        </Medium>
        <Faster>
          <H4>key and optimization</H4>
          {this.state.items.map(item => (
            <Optimized
              item={item}
              key={item.id}
            />
          ))}
        </Faster>
      </Row>
    )
  }
}


class Optimized extends Component {


  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.item.value !== this.props.item.value
  }

  render() {
    let {id, value} = this.props.item
    return (
      <Item
        value={value}
      >
        <Id>{id}</Id>
        <Value>{value}</Value>
      </Item>
    )
  }
}

class Regular extends Component {


  render() {
    let {id, value} = this.props.item
    return (
      <Item
        value={value}
      >
        <Id>{id}</Id>
        <Value>{value}</Value>
      </Item>
    )
  }
}



App = loggify(App)
//
PollChild = loggify(PollChild)

export default App

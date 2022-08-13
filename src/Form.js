import React,{ Component } from 'react'
import './Form.css'

class Form extends Component{
constructor(props){
	super(props)
	this.state = { start:'', duration:'', day:""}
	this.handleChange = this.handleChange.bind(this)
	this.handleSubmit = this.handleSubmit.bind(this)
}

addTime(start, duration, day){
    /*

    */


    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    

    this.startList = start.split(" ")
    this.dayHalf = this.startList[1]
    this.startTime = this.startList[0].split(":")
    this.durationTime = duration.split(":")
    this.addedTime = [0, 0]
	this.dayRank = null
    this.passedDays = Math.floor(Number(this.durationTime[0]) / 24)
    if (day != ""){
            this.dayRank = days.indexOf(day)
    }
	for (let i = 0; i < 2; i++){
		this.addedTime[i] = Number(this.startTime[i]) + Number(this.durationTime[i])
	}
	if (this.addedTime[1] >= 60){
        this.addedTime[0] += Math.floor(this.addedTime[1] / 60)
        this.addedTime[1] = this.addedTime[1] % 60
	}
	if (this.addedTime[0] >= 12){
        if (duration != "24:00"){
            if (this.dayHalf == "AM"){
				if (this.startTime[0] != "12"){
                	this.dayHalf = "PM"}
			}
			else{
				if (this.startTime[0] != "12"){
					this.dayHalf = "AM"
					this.passedDays += 1
				}
			}
		}
		if (this.addedTime[0] % 12 == 0){
          this.addedTime[0] = 12}
        else{
          this.addedTime[0] = this.addedTime[0] % 12 
		}
	}
	if (day != ""){
        this.dayRank += this.passedDays
	}
	if (this.addedTime[1] > 10){
      this.newTime = `${this.addedTime[0]}:${this.addedTime[1]} ${this.dayHalf}`}
    else{
      this.newTime = `${this.addedTime[0]}:0${this.addedTime[1]} ${this.dayHalf}`
	}
    if (day != ""){
        this.newTime = `${this.newTime}, ${days[this.dayRank % 7]}"`}
    if (this.passedDays > 1){
        this.newTime = this.newTime + ` (${this.passedDays} days later)`}
    else if (this.passedDays == 1){
        this.newTime = this.newTime + " (next day)"
	}
    return this.newTime 
}

//Instead of the code below make it show the results of the timeAdd()
// Form submitting logic, prevent default page refresh
handleSubmit(event){
	const { start, duration, day} = this.state
	const result = this.addTime(start, duration, day)
	event.preventDefault()
	alert(`
	____You have entered____
	Start : ${start}
	Duration : ${duration}
	Day : ${day}\n
	____The result of the addition____
	Time: ${result}`)
}

// Method causes to store all the values of the
// input field in react state single method handle
// input changes of all the input field using ES6
// javascript feature computed property names
handleChange(event){
	this.setState({
	// Computed property names
	// keys of the objects are computed dynamically
	[event.target.name] : event.target.value
	})
}

// Return a controlled form i.e. values of the
// input field not stored in DOM values are exist
// in react component itself as state
render(){
	return(
	<form onSubmit={this.handleSubmit}>
		<h4>Please enter a time in Hour:Minute AM/PM format.<br></br>
		Then, enter the period you want to add.<br></br>
		You can also enter a day.</h4>
		<div>
		<label htmlFor='start'>Start</label>
		<input
			name='start'
			placeholder='Required'
			value = {this.state.start}
			onChange={this.handleChange}
		/>
		</div>
		<div>
		<label htmlFor='duration'>Duration</label>
		<input
			name='duration'
			placeholder='Required'
			value={this.state.duration}
			onChange={this.handleChange}
		/>
		</div>
		<div>
		<label htmlFor='day'>Day</label>
		<input
			name='day'
			placeholder='Optional'
			value={this.state.day}
			onChange={this.handleChange}
		/>
		</div>
		
		<div>
		<button>Submit</button>
		</div>
	</form>
	)
}
}

export default Form

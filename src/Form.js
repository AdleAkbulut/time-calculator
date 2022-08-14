import React,{ Component } from 'react'
import './Form.css'
//Creates an input form
class Form extends Component{
constructor(props){
	super(props)
	this.state = { start:'', duration:'', day:""}
	//Have two action handling, one for inout and one for the submition
	this.handleChange = this.handleChange.bind(this)
	this.handleSubmit = this.handleSubmit.bind(this)
}

	//Takes the given time period and calculates the new time according to the given time to add. 
	//Parameters:
		//start(str): in 'Hour:Minute AM/Pm' format
		//duration(str): in 'Hour:Minute' format
		//day(str): in capitilized. It is optional.
	//Returns:
		//newTime(str): shows new time, day, and how many days have passed

addTime(start, duration, day){
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
	//Split the hours and minutes for addition
    this.startList = start.split(" ")
    this.dayHalf = this.startList[1]
    this.startTime = this.startList[0].split(":")
    this.durationTime = duration.split(":")
    this.addedTime = [0, 0]
	this.dayRank = null
	//Calculate if days have passed
    this.passedDays = Math.floor(Number(this.durationTime[0]) / 24)
	//Rank days according to the index
    if (day != ""){
            this.dayRank = days.indexOf(day)
    }
	//Execute Addition
	for (let i = 0; i < 2; i++){
		this.addedTime[i] = Number(this.startTime[i]) + Number(this.durationTime[i])
	}
	//Format minutes
	if (this.addedTime[1] >= 60){
        this.addedTime[0] += Math.floor(this.addedTime[1] / 60)
        this.addedTime[1] = this.addedTime[1] % 60
	}
	//Format hours
	if (this.addedTime[0] >= 12){
		//Format AM/PM
        if (duration != "24:00"){
            if (this.dayHalf == "AM"){
				//Special case for 12
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
		//Format according to the 12 hour time period
		if (this.addedTime[0] % 12 == 0){
          this.addedTime[0] = 12}
        else{
          this.addedTime[0] = this.addedTime[0] % 12 
		}
	}
	//Calculate the new day after the passed days
	if (day != ""){
        this.dayRank += this.passedDays
	}
	//Format minutes according to the digit count
	if (this.addedTime[1] > 10){
      this.newTime = `${this.addedTime[0]}:${this.addedTime[1]} ${this.dayHalf}`}
	//if there is only one digit add a zero before the minutes
    else{
      this.newTime = `${this.addedTime[0]}:0${this.addedTime[1]} ${this.dayHalf}`
	}
	//If there is a given day, add the newTime
    if (day != ""){
        this.newTime = `${this.newTime}, ${days[this.dayRank % 7]}"`}
	//Format according to how many days have passed, if it is only 1 day or greater
    if (this.passedDays > 1){
        this.newTime = this.newTime + ` (${this.passedDays} days later)`}
    else if (this.passedDays == 1){
        this.newTime = this.newTime + " (next day)"
	}
    return this.newTime 
}


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

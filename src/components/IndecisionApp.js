import React from "react";
import AddOption from "./AddOption"; // Webpack doesn't need you to say AddOption.js - it can figure out the js part
import Header from "./Header";
import Action from "./Action";
import Options from "./Options";

export default class IndecisionApp extends React.Component {
    constructor(props) {
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
        this.state = {
            options: [] // don't need props.options since using localStorage
        };
    }

    componentDidMount() {
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);
     
             if (options) {
                 this.setState(() => ({ options: options}));
             } //if throws error, it will catch below
        } catch (e) {
            //If error, do nothing at all in this case.
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
        }
    }

    componentWillUnmount() {
        //not used much
        console.log("componentWillUnmount"); // Won't really see it.
    }

    handleDeleteOptions() {
        // making less verbose
        this.setState(() => ({ options: [] }));
   }

   handleDeleteOption(optionToRemove) {
        //console.log("hdo", option);
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => {
                return optionToRemove !== option; //filters out the option to Delete
            })
        }));
   }

    handlePick() {
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNum];
        alert(option);
    }

    handleAddOption(option) {
        if (!option) {
            return "Enter valid value to add item";
        } else if (this.state.options.indexOf(option) > -1) {
            return "This option already exists";
        }

        this.setState((prevState) => ({
            options: prevState.options.concat(option)
        }));
    }
    
    render() {
        const subtitle = "Put your life in the hands of a computer";

        return (
            <div>
                <Header subtitle={subtitle} />
                <Action 
                    hasOptions={this.state.options.length > 0} 
                    handlePick={this.handlePick}
                />
                <Options 
                    options={this.state.options} 
                    handleDeleteOptions={this.handleDeleteOptions}
                    handleDeleteOption={this.handleDeleteOption}
                />
                <AddOption 
                    handleAddOption={this.handleAddOption}
                />
            </div>
        );
    }
}
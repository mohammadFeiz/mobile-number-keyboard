import React, { Component,Fragment} from 'react';
import { render } from 'react-dom';
import MobileNumberKeyboard from './mobileNumberKeyboard';
class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      showKeyboard:false,
      value:'',
      title:'inter value',
      
    }
  }
  theme1 = {
    keyBackground:'#696969',
    keyColor:'#fff',
    background:'#242424',
    titleColor:'#fff',
    activeFieldColor:'#4c6bff',
    keyBoxShadow:'0 1px 2px 0px #000', 
  }
  theme2 = {
    keyBackground:'#5b696c',
    keyColor:'#fff',
    background:'#36474f',
    titleColor:'#fff',
    activeFieldColor:'#699bb4',
    keyBoxShadow:'0 1px 2px 1px #29333c', 
  }
  theme3 = {
    keyBackground:'#3b3e4b',
    keyColor:'#fff',
    background:'#2d2f39',
    titleColor:'#fff',
    activeFieldColor:'#4556aa',
    keyBoxShadow:'0 1px 2px 1px #222', 
  }
  openKeyboard(){
    this.setState({showKeyboard:true});
  }
  callback(obj){
    console.log(obj);
  }
  closeKeyboard(){
    this.setState({showKeyboard:false});
  }
  render(){
    return(
      <Fragment>
        <button onClick={this.openKeyboard.bind(this)}>open keyboard</button>
        <div id='result'>{this.state.value}</div>
        <MobileNumberKeyboard 
          open={this.state.showKeyboard} // set true to open keyboard
          title={this.state.title} //keyboard title
          callback={this.callback.bind(this)} // send fields of keyboard to this function
          onclose={this.closeKeyboard.bind(this)} // close keyboard callback
          keyHeight={36}//default is 36 : height of keyboard keys
          gap={3}//default is 2 : gap of keyboard keys
          theme={this.theme3} // object of keyboard colors
          fields={[ // keyboard return an object by this fields
            {title:'X',field:'x'},
            {title:'Y',field:'y',value:100,active:true},
            {title:'Angle',field:'angle',value:0}
          ]}
          //float={false} //set false for prevent float values
          //minus={false} //set false for prevent minus values
        />
      </Fragment>
    );
  }
}
render(<App />, document.getElementById('root'));

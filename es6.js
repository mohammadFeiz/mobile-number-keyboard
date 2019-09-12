import React,{Component,createContext} from 'react';
import './index.css';
import $ from 'jquery';
var keyBoardNumberContext = createContext();

export default class MobileNumberKeyboard extends Component {
  constructor(props) {
    super(props);
    var {theme,minus = true,float = true} = this.props;
    this.theme = this.getTheme(theme);
    this.state = {
      caps:false,init:true,
      isMobile:'ontouchstart' in document.documentElement?true:false,
      row1:{
        index:'1',
        items: [
          {text:'1',width:'25%'},
          {text:'2',width:'25%'},
          {text:'3',width:'25%'},
          {text:'0',width:'25%',id:'key-0'}
        ]
      },
      row2:{
        index:'2',
        items: [
          {text:'4',width:'25%'},
          {text:'5',width:'25%'},
          {text:'6',width:'25%'},
          {text:'.',width:'25%',id:'key-point',
          disabled:float === false}
        ]
      },
      row3:{
        index:'3',
        items: [
          {text:'7',width:'25%'},
          {text:'8',width:'25%'},
          {text:'9',width:'25%'},
          {text:'-/+',width:'25%',id:'key-reverse',
          disabled:minus === false},
        ]
      },
      row4:{
        index:'4',
        items: [
          
          {text:'Del',width:'50%',id:'key-back'},
          {text:'OK',width:'50%',id:'key-ok'},    
        ]
      },
    };
  }
  getBack(value){
    if(value.length === 0){return false;}
    return value.slice(0,value.length - 1);
  }
  ok(){
    var {close,fields} = this.props;
    if(this.props.callback){
      var obj = {};
      for(var i = 0; i < fields.length; i++){
        var field = fields[i];
        var value = parseFloat(field.value);
        obj[field.field] = isNaN(value)?0:value;
      }
      this.props.callback(obj);
      if(close){this.close();}
    }
  }
  keyclick(item){
    var id = item.id;
    if(item.disabled){return;}
    if(id === 'key-ok'){this.ok(); return;}
    if(id === 'key-close'){this.close(); return;}
    var {init} = this.state;
    var activeField = this.getActiveField();
    var value = (activeField.value || '0').toString();
    if(id === 'key-reverse'){
      if(value[0]=== '-'){
        activeField.value = value.slice(1,value.length);}
      else {activeField.value = '-' + value;}
      this.setState({});
      return;
    }
    if(init){activeField.value = ''; init = false;}
    var pointIndex = value.indexOf('.');
    var length = value.length;
    //var lastChar = length > 0?value[length - 1]:false;
    if(id === 'key-back'){
      if(length > 0){
        activeField.value = activeField.value.slice(0,activeField.value.length - 1);
      }
      if(activeField.value === ''){activeField.value = '0';}
    }
    else if(id === 'key-point'){
      if(pointIndex !== -1 || length === 0 || value === '-'){return;}
      activeField.value += '.';
    }
    else if(id === 'key-minus'){
      if(activeField.value !== '' && activeField.value !== '0'){return;}
      activeField.value = '-';
    }
    else if(id === 'key-0'){
      if(activeField.value === '0' ||activeField.value === '-0'){return;}
      activeField.value += '0';
    }
    else{
      if(activeField.value === '0'){activeField.value = '';}
      else if(activeField.value === '-0'){activeField.value = '-';}
      activeField.value += item.text;
    }
    this.setState({init:false});
  }
  getActiveField(){
    var {fields} = this.props;
    for(var i = 0; i < fields.length; i++){
      if(fields[i].active){return fields[i];}
    }
  }
  keydown(e){
    var {isMobile} = this.state;
    $(window).bind(isMobile?'touchend':'mouseup',$.proxy(this.keyup,this));
    var {theme} = this;
    var {keyColor,keyBackground} = theme;
    var key = $(e.currentTarget).find('.keyboard-key');
    key.css({background:keyColor,color:keyBackground});
  }
  keyup(){
    var {isMobile} = this.state;
    var {theme} = this;
    var {keyColor,keyBackground} = theme;
    $(window).unbind(isMobile?'touchend':'mouseup',this.keyup);
    $('.keyboard-key').css({background:keyBackground,color:keyColor});
  }
  getStyle(){
    var {style} = this.props;
    var {background} = this.theme;
    return $.extend({},{
      background,width:'260px',left:'calc(50% - 130px)',top:'100px'
    },style);
  }
  close(){
      this.setState({init:true});
      this.props.onclose();
  }
  fieldMouseDown(index){
    var {init} = this.state;
    var {fields} = this.props;
    for(var i = 0; i < fields.length; i++){
      var field = fields[i];
      if(i === index){
        if(field.active){
          init = !init;
        }
        else{
          init = true;
          field.active = true;
        }
      }
      else{
        field.active = false;
      }
    }
    this.setState({init})
  }
  getTheme(theme = {}){
    var def = {
      background:'#c9ced4',
      keyColor:'#28292b',
      activeFieldColor:'#1d5ee4',
      keyBackground:'#fff',
      titleColor:'#000',
      highlight:'#7fb9ef',
      keyBoxShadow:undefined,
    };
    return $.extend({},def,theme)
  }
  render() {
    var {caps,value,sym,init,isMobile} = this.state;
    var {open,fields} = this.props;
    if(!open){return '';}
    var {
      title = '',    
      keyHeight = 36,
      gap = 2,
    } = this.props;
    var contextValue = {
      caps,sym,keyclick:this.keyclick.bind(this),
      keydown:this.keydown.bind(this),
      value,init,theme:this.theme,title,
      keyHeight,gap,fields,
      fieldMouseDown:this.fieldMouseDown.bind(this),      
      isMobile
    };
    var backDropProps = {
      className:'back-drop',
      [isMobile?'onTouchStart':'onMouseDown']:this.close.bind(this)
    };
    
    var Fields = fields.map((field,i)=>{
      return <KeyboardField  key={i} index={i}/>
    });
    return (
      <keyBoardNumberContext.Provider value={contextValue}>
      <div className={"number-keyboard" + (caps?' caps':'')} style={this.getStyle()}>
        <div {...backDropProps}></div>
        <KeyboardHeader />
        <KeyboardRow row={this.state.row1}/>
        <KeyboardRow row={this.state.row2}/>
        <KeyboardRow row={this.state.row3}/>
        <KeyboardRow row={this.state.row4}/>    
        {Fields}
      </div>
      </keyBoardNumberContext.Provider>
    );
  }
}
MobileNumberKeyboard.defaultProps = {
  fields:[]
}
class KeyboardRow extends Component{
  static contextType = keyBoardNumberContext;
  render(){
    var {row} = this.props;
    var keys = row.items.map((item,i)=><KeyboardKey key={row.index + i} item={item}/>);
    return (
      <div className='keyboard-row'>
        {keys}
      </div>
    );
  }
}
class KeyboardKey extends Component{
  static contextType = keyBoardNumberContext;
  getColor(){
    var {caps,sym,theme} = this.context;
    var {keyColor,activeFieldColor} = theme;
    var {item} = this.props;
    if(item.id==='key-caps'){
      return caps?activeFieldColor:keyColor;
    }
    else if(item.id==='sym'){
      return sym?activeFieldColor:keyColor;
    }
    else {return keyColor;}
  }
  
  getStyle(style){
    var {keyHeight,gap} = this.context;
    var {item} = this.props;
    return $.extend({},{
      height: keyHeight+'px',
      lineHeight:(keyHeight - 2 * gap)+'px',
      width:item.width,
      marginLeft:item.marginLeft,
      padding:gap+'px',
      opacity:item.disabled?0.3:1
    },style);
  }
  getKeyStyle(mode){
    var {theme} = this.context;
    var {keyBackground,keyColor,keyBoxShadow} = theme;
    return {
      color:mode === 'shadow'?keyBackground:this.getColor(),
      background:mode === 'shadow'?keyColor:keyBackground,
      boxShadow:keyBoxShadow,
    }
  }
  render(){
    var {item,style} = this.props;
    var {keyclick,isMobile,keydown} = this.context;
    
    var containerProps = {
      className:"key-container",style:this.getStyle(style),
      onClick:item.disabled?undefined:()=>keyclick(item),
      [isMobile?'onTouchStart':'onMouseDown']:item.disabled?undefined:keydown
    };

    var keyProps = {
      className:item.className + ' keyboard-key', 
      id:item.id,style:this.getKeyStyle()
    };
    return (
      <div {...containerProps}>
        <div {...keyProps}>
          {item.text}
        </div>
      </div>
    );
  }
}
class KeyboardHeader extends Component{
  static contextType = keyBoardNumberContext;
  getLCDStyle(){
    var {theme,keyHeight,gap} = this.context;
    var {lcdBackground} = theme;
    return {
      background:lcdBackground,
      minHeight:(keyHeight - 2 * gap) + 'px',
      maxHeight:(keyHeight * 3) + 'px',
      lineHeight:(keyHeight - 2 * gap) + 'px',
      width:`calc(100% - 54px - ${gap}px)`,
      marginLeft:gap + 'px',
      marginTop:gap + 'px'
    }
  }
  render(){
    var {gap} = this.context;
    return (
      <div className='keyboard-header'>
        <KeyboardKey item={{text:'Close',id:'key-close',width:'50px'}} 
        style={{float:'right',width:'60px',marginRight:gap+'px'}}/>
        <KeyboardTitle />
      </div>
    );
  }
}
class KeyboardTitle extends Component{
  static contextType = keyBoardNumberContext;
  getStyle(){
    var {keyHeight,theme,gap} = this.context;
    var {titleColor} = theme;
    return {
      height:keyHeight + 'px',
      lineHeight:keyHeight + 'px',
      color:titleColor,
      padding:`0 ${gap}px`,
      boxSizing:'border-box',
      //background:'yellow',
      width:`calc(100% - 68px - ${gap}px)`
    }
  }
  render(){
    var {title} = this.context;
    return(<div className='keyboard-title' style={this.getStyle()}>{title}</div>);
  }
}

class KeyboardField extends Component{
  static contextType = keyBoardNumberContext;
  getStyle(field){
    var {theme} = this.context;
    var {titleColor,activeFieldColor} = theme;
    return {
      color:titleColor,
      padding:'3px',
      width:'100%',
      float:'left',
      borderRadius:'4px',
      position:'relative',
      boxSizing:'border-box',
      background:field.active?activeFieldColor:undefined,
    }
  }
  getBackground(highlight,active,init){
    if(active && init){
      return highlight;
    }
    else{
      return 'none';
    }
  }
  render(){
    var {index} = this.props;
    var {fieldMouseDown,theme,init,fields} = this.context;
    var {highlight} = theme;
    var field = fields[index];
    return(
      <div className='keyboard-field' style={this.getStyle(field)} onMouseDown={()=>fieldMouseDown(index)}>
        <div className='keyboard-field-title'>{field.title}</div>
        <div className='keyboard-field-value' style={{background:'#000'}}>
          <mark style={{background:this.getBackground(highlight,field.active,init),color:'#fff'}}>
          {field.value === undefined?'0':field.value}
          </mark>
        </div>
      </div>
    );
  }
}



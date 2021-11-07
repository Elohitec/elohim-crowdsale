import React, { Component } from 'react'
import { round } from 'mathjs'

import elohLogo from '../img/elohimcoin.png'
import usdtLogo from '../img/ICON_USDT.png'
import ethLogo from '../img/ether-logo.png'

class BuyForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      output: '0',
      ether: true,
      etherinput: false,
      usdtinput: false,
    }
  }

  render() {
    if(!this.state.ether){ 
      return (
        <form className="mb-3" onSubmit={(event) => {
            event.preventDefault()
            let Amount
            Amount = (this.input.value * 10 ** 18).toString()
            this.props.buyElohWithUsdt(Amount)
          }}>
          <div className="borders2 margin-bot">
            <div>
              <label className="float-left white-color"><b>Usdt Input:</b></label>
              <span className="float-right white-color">
                Balance: {round(this.props.UsdtBalance,2)}
              </span>
            </div>
            <div className="input-group mb-4">
              <input
                type="number"
                min="0.1"
                step='any'
                onChange='setTwoNumberDecimal'
                onChange={(event) => {
                  const Amount = this.input.value.toString()
                  this.setState({output: Amount * 1})
                  if(this.input.value >= 0.1){
                    this.setState({usdtinput : true})
                  }else{
                    this.setState({usdtinput : false})
                  }
                }}
                ref={(input) => { this.input = input }}
                className="input"
                placeholder="0.0"
                required />
              <div className="dropdown input-group-append">
                  <button className="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <img src={usdtLogo} height='28' alt=""/>
                    &nbsp;&nbsp;USDT
                  </button>
                  <div className="dropdown-menu backgrd-dropdown" aria-labelledby="dropdownMenuButton">
                    <button className="dropdown-item icon-dropdown" type="button" onClick={(event) => {this.setState({ether: true})}}>
                      <img src={ethLogo} height='28' alt=""/>
                      &nbsp;&nbsp;BNB
                    </button>
                  </div>
              </div>
              </div>
            </div>
          <div className="borders2 padding-bot">
              <div>
                <label className="float-left white-color"><b>ElohimCoin Output:</b></label>
                <span className="float-right white-color">
                  Balance: {round(this.props.ELOhBalance,2)}
                </span>
              </div>
              <div className="input-group mb-2">
                <input
                  type="number"
                  step='any'
                  className="input"
                  placeholder="0.0"
                  value={this.state.output}
                  disabled/>

                <div className="input-group-append">
                  <div className="icon">
                    <img src={elohLogo} height='32' alt=""/>
                    &nbsp;  ELOH
                  </div>
                </div>
              </div>
            </div>  
            <div className="">
              <div className="rate">
                <span className="float-left white-color">Rate</span>
                <span className="float-right white-color">1 ELOH = 1 USDT</span>
              </div>
            </div>
            <div className="submit-button">
                <div className="col-sm-12 text-center">
                {this.state.usdtinput ? <button type="submit" >Get ELOH</button> :
                  <button type="submit"disabled >Get ELOH</button>}
                    </div>
            </div>
          </form>
        )
      }
      else {
        return (
          <form className="mb-3" onSubmit={(event) => {
              event.preventDefault()
              let Amount
              Amount = (this.input.value * 10 ** 18).toString()
              this.props.buyElohWithEther(Amount)
            }}>
            <div className="borders2 margin-bot">
              <div>
                <label className="float-left white-color"><b>BNB Input:</b></label>
                <span className="float-right white-color">
                  Balance: {round((this.props.ethBalance),4)}
                </span>
              </div>
              <div className="input-group mb-4">
                <input
                  type="number"
                  min="0.003"
                  step='any'
                  onChange='setTwoNumberDecimal'
                  onChange={(event) => {
                    const Amount = this.input.value.toString()
                    this.setState({output: Amount * 480})
                    if(this.input.value >= 0.003){
                      this.setState({etherinput : true})
                    }else{
                      this.setState({etherinput : false})
                    }
                  }}
                  ref={(input) => { this.input = input }}
                  className="input"
                  placeholder="0.0"
                  required />
                <div className="dropdown input-group-append">
                  <button className="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <img src={ethLogo} height='28' alt=""/>
                    &nbsp;&nbsp;BNB
                  </button>
                  <div className="dropdown-menu backgrd-dropdown" aria-labelledby="dropdownMenuButton">
                    <button className="dropdown-item icon-dropdown" type="button" onClick={(event) => {this.setState({ether: false})}}>
                      <img src={usdtLogo} height='28' alt=""/>
                      &nbsp;&nbsp;USDT
                      <span className="glyphicon glyphicon-envelope azul"></span>
                    </button>
                  </div>
                </div>
              </div>
            </div> 
            <div className="borders2 padding-bot">
              <div>
                <label className="float-left white-color"><b>Elohim Output:</b></label>
                <span className="float-right white-color">
                  Balance: {round(this.props.ELOhBalance,2)}
                </span>
              </div>
              <div className="input-group mb-2">
                <input
                  type="number"
                  step='any'
                  className="input"
                  placeholder="0.0"
                  value={this.state.output}
                  disabled/>

                <div className="input-group-append">
                  <div className="icon">
                    <img src={elohLogo} height='32' alt=""/>
                    &nbsp;  ELOH
                  </div>
                </div>
              </div>
            </div>  
            <div className="">
              <div className="rate">
                <span className="float-left white-color">Rate</span>
                <span className="float-right white-color">1 ELOH = 0.00207825 BNB</span>
              </div>
            </div>
            <div className="submit-button">
                <div className="col-sm-12 text-center">
                {this.state.etherinput ? <button type="submit" >Get ELOH</button> :
                  <button type="submit"disabled >Get ELOH</button>}
                    </div>
            </div>
          </form>
        );
      }
    }
  }

export default BuyForm;

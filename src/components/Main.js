import React, { Component } from 'react'
import BuyForm from './BuyForm'
import elohimCoinLogo from '../img/elohimcoin.png'

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentForm: 'buy'
    }
  }

  render() {
    let content
    {
      content = <BuyForm
      UsdtBalance={this.props.UsdtBalance}
      ELOhBalance={this.props.ELOhBalance}
      buyElohWithEther={this.props.buyElohWithEther}
      buyElohWithUsdt={this.props.buyElohWithUsdt}
      ethBalance={this.props.ethBalance}
      />
    }
    return (
      <div id="content " className="mt-3">
        <div className="card mb-4 margin-topper buy-background" >
        <div className="container-div ">
        <img src={elohimCoinLogo} width="25%" alt="" className="center"/>
        </div>
          <div className="card-body">
            {content}
          </div>
        </div>
        <div className= 'container-div'>
          <a
            className="usdt-text"
            href={"https://bscscan.com/token/0xbd5a3749dd3d90558d70fed80d6fd2a8847f0236"}
            target="_blank"
            rel="noopener noreferrer">
              Contract address
          </a>
        </div>
        <div className= 'center-usdt'>
          <a
            className="usdt-text"
            href={"https://metamask.zendesk.com/hc/en-us/articles/360015489031"}
            target="_blank"
            rel="noopener noreferrer">
              Add ELOH to Metamask
          </a>
        </div>
      </div>
    );
  }
}

export default Main;

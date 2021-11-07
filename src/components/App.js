import React, { Component } from 'react'
import Web3 from 'web3'

import ELOh from '../abis/ELOh.json'
import Usdt from '../abis/Usdt.json'
import Crowdsale from '../abis/Crowdsale.json'


import Navbar from './Navbar'
import Main from './Main'
import Popup from './Popup'
import './App.css'

class App extends Component {
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId =  await web3.eth.net.getId()
    const mainNetwork = 56

    const ethBalance = await web3.eth.getBalance(this.state.account) / 10 ** 18
    this.setState({ ethBalance })

    window.ethereum.on('accountsChanged', function (accounts) {
      window.location.reload();
    })

    window.ethereum.on('networkChanged', function (networkId) {
      window.location.reload();
    })

    if(mainNetwork == networkId) {

      // Load ELOh
      const eloh = new web3.eth.Contract(ELOh.abi, '0xbd5a3749dd3d90558d70fed80d6fd2a8847f0236')
      this.setState({ eloh })
      let ELOhBalance = await eloh.methods.balanceOf(this.state.account).call() / 10 ** 18
      this.setState({ ELOhBalance: ELOhBalance.toString() })
    
      // Load Usdt
      const usdt = new web3.eth.Contract(Usdt.abi, '0x55d398326f99059ff775485246999027b3197955')
      this.setState({ usdt })
      let UsdtBalance = await usdt.methods.balanceOf(this.state.account).call() / 10 ** 18
      this.setState({ UsdtBalance : UsdtBalance.toString() })

      // Load Crowdsale
      const crowdsale = new web3.eth.Contract(Crowdsale.abi, '0x0782Ed7eaBf2A575425f6802CAFFC24203A0C86b')
      this.setState({ crowdsale })

    } else {
      window.alert('Select the Binance Smart Chain.')
      window.location.reload();
    }
    this.setState({ loading: false })
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Please install MetaMask to use this page.')
      window.location.reload();
    }
  }
  
  buyElohWithEther = (etherAmount) => {
    this.setState({ loading: true })
    this.state.crowdsale.methods.buyElohWithEther().send({ value: etherAmount, from: this.state.account })
    .once('confirmation', (confirmation, info) => {
      this.loadBlockchainData()
      this.setState({ loading: false })
      this.togglePopup(info["transactionHash"])
    })
    .on("error", (error) => {
      this.setState({ loading: false })
    })
  }

  buyElohWithUsdt = (usdtAmount) => {
    this.setState({ loading: true })
    this.state.usdt.methods.approve(this.state.crowdsale.address, usdtAmount).send({ from: this.state.account })
      .on("error", (error) => {
        this.setState({ loading: false })
      })
      .once('confirmation', (confirmation) => {
        this.state.crowdsale.methods.buyElohWithUsdt(usdtAmount).send({ from: this.state.account })
          .once('confirmation', (confirmation,info) => {
            this.loadBlockchainData()
            this.setState({ loading: false })
            this.togglePopup(info["transactionHash"])
          })
          .on("error", (error) => {
              this.setState({ loading: false })
          }
        )
      }
    )
  }

  togglePopup(hash) {  
    this.setState({  
      showPopup: !this.state.showPopup, 
      transactionHash: hash
    });
  }  

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      eloh: {},
      usdt: {},
      crowdsale: {},
      UsdtBalance: '0',
      ethBalance: '0',
      ELOhBalance: '0',
      loading: true,
      showPopup: false,
      transactionHash: '',
    }
  }

  render() {
    let load
    let content

    if(this.state.loading) {
      load = 
      <div className="load">
        <div className="spinner-border white-color" role="status">
        </div>
      </div>
    }
  
    content = 
      <Main
      UsdtBalance={this.state.UsdtBalance}
      ELOhBalance={this.state.ELOhBalance}
      buyElohWithEther={this.buyElohWithEther}
      buyElohWithUsdt={this.buyElohWithUsdt}
      ethBalance={this.state.ethBalance}
      />

    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '600px' }}>
              <div className="content mr-auto ml-auto ">
                <a
                  href="http://www.elohimcoin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                </a>

                {load}
                {content}
                
              </div>
            </main>
          </div>
        </div>
        <Popup show={this.state.showPopup} closePopup={this.togglePopup.bind(this)} etherscan={"https://bscscan.com/tx/"+this.state.transactionHash}/>
      </div>
    );
  }
}

export default App;

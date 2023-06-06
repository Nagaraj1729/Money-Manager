import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import MoneyDetails from '../MoneyDetails'

import TransitionItem from '../TransactionItem'

import './index.css'

const moneyDetailsCards = [
  {
    id: 1,
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png',
    altText: 'balance',
    cardName: 'Balance',
    balance: 0,
    cardClassName: 'balance-card',
    dataTestId: 'balanceAmount',
  },
  {
    id: 2,
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png',
    altText: 'income',
    cardName: 'Income',
    cardClassName: 'income-card',
    dataTestId: 'incomeAmount',
  },
  {
    id: 3,
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png',
    altText: 'expenses',
    cardName: 'Expenses',
    cardClassName: 'expenses-card',
    dataTestId: 'expensesAmount',
  },
]

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    titleInput: '',
    amountInput: '',
    transactionType: 'INCOME',
    transactionsList: [],
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeAmountInput = event => {
    this.setState({amountInput: event.target.value})
  }

  onChangeTransactionType = event => {
    this.setState({transactionType: event.target.value})
  }

  onAddTransaction = event => {
    event.preventDefault()
    const {titleInput, amountInput, transactionType} = this.state
    const newTransaction = {
      id: uuidv4(),
      title: titleInput,
      amount: parseInt(amountInput),
      type: transactionType === 'INCOME' ? 'Income' : 'Expenses',
    }
    this.setState(prevState => ({
      transactionsList: [...prevState.transactionsList, newTransaction],
      titleInput: '',
      amountInput: '',
      transactionType: 'INCOME',
    }))
  }

  onDeleteTransaction = deletedId => {
    this.setState(prevState => ({
      transactionsList: prevState.transactionsList.filter(
        transaction => transaction.id !== deletedId,
      ),
    }))
  }

  render() {
    const {
      titleInput,
      amountInput,
      transactionType,
      transactionsList,
    } = this.state

    const expensesValues = transactionsList.map(trans => {
      if (trans.type === 'Expenses') {
        return trans.amount
      }
      return 0
    })
    const incomeValues = transactionsList.map(trans => {
      if (trans.type === 'Income') {
        return trans.amount
      }
      return 0
    })
    const expensesAmount =
      expensesValues.length === 0 ? 0 : expensesValues.reduce((a, b) => a + b)
    const incomeAmount =
      incomeValues.length === 0 ? 0 : incomeValues.reduce((a, b) => a + b)
    const balanceAmount = incomeAmount - expensesAmount

    return (
      <div className="app-bg">
        <div className="content-container">
          <div className="banner-card">
            <h1 className="greet-by-name">Hi, Richard</h1>
            <p className="banner-welcome-line">
              Welcome back to your{' '}
              <span className="app-title">Money Manager</span>
            </p>
          </div>
          <ul className="money-details-cards-list">
            {moneyDetailsCards.map(moneyDetails => (
              <MoneyDetails
                key={moneyDetails.id}
                moneyDetails={moneyDetails}
                amounts={{incomeAmount, expensesAmount, balanceAmount}}
              />
            ))}
          </ul>
          <div className="form-history-container">
            <div className="form-container">
              <form onSubmit={this.onAddTransaction}>
                <h1 className="heading">Add Transaction</h1>
                <label className="input-label" htmlFor="title-input">
                  TITLE
                </label>
                <input
                  type="text"
                  className="input-box"
                  id="title-input"
                  placeholder="TITLE"
                  onChange={this.onChangeTitleInput}
                  value={titleInput}
                />
                <label className="input-label" htmlFor="amount-input">
                  AMOUNT
                </label>
                <input
                  type="text"
                  className="input-box"
                  id="amount-input"
                  placeholder="AMOUNT"
                  onChange={this.onChangeAmountInput}
                  value={amountInput}
                />
                <label className="input-label" htmlFor="type-select">
                  TYPE
                </label>
                <select
                  className="input-box"
                  id="type-select"
                  onChange={this.onChangeTransactionType}
                  value={transactionType}
                >
                  {transactionTypeOptions.map(type => (
                    <option key={type.optionId} value={type.optionId}>
                      {type.displayText}
                    </option>
                  ))}
                </select>
                <button type="submit" className="add-button">
                  Add
                </button>
              </form>
            </div>
            <div className="history-container">
              <h1 className="heading">History</h1>
              <div className="history-list-table">
                <li className="history-table-header">
                  <p className="header-item">Title</p>
                  <p className="header-item">Amount</p>
                  <p className="header-item">Type</p>
                </li>
                <ul className="history-list-items-container">
                  {transactionsList.map(transaction => (
                    <TransitionItem
                      key={transaction.id}
                      transactionDetails={transaction}
                      deleteTransaction={this.onDeleteTransaction}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager

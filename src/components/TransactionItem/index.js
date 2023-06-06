import './index.css'

const TransitionItem = props => {
  const {transactionDetails} = props
  const {id, title, amount, type} = transactionDetails

  const onDeleteIcon = () => {
    const {deleteTransaction} = props
    deleteTransaction(id)
  }

  return (
    <li className="transaction-item">
      <p className="column-item">{title}</p>
      <p className="column-item">Rs {amount}</p>
      <p className="column-item">{type}</p>
      <button
        className="delete-button"
        type="button"
        data-testid="delete"
        onClick={onDeleteIcon}
      >
        <img
          className="delete-icon"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png "
          alt="delete"
        />
      </button>
    </li>
  )
}

export default TransitionItem

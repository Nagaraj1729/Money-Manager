import './index.css'

const MoneyDetails = props => {
  const {moneyDetails, amounts} = props
  const {imageUrl, altText, cardName, cardClassName, dataTestId} = moneyDetails

  const displayAmount = amounts[dataTestId]

  return (
    <li className={`money-details-card-item ${cardClassName}`}>
      <img className="money-card-img" src={imageUrl} alt={altText} />
      <div className="money-card-text-container">
        <p className="money-card-name">Your {cardName}</p>
        <p className="balance-amount" data-testid={dataTestId}>
          Rs {displayAmount}
        </p>
      </div>
    </li>
  )
}
export default MoneyDetails

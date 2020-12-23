import React, { useContext } from 'react'
import AppContext from '../context/AppContext'
import { PayPalButton } from 'react-paypal-button'
import '../styles/components/Payment.css'

const Payment = ({ history }) => {
	const { state, addNewOrder } = useContext(AppContext)
	const { cart, buyer } = state

	const paypalOtions = {
		clientId:
			'AaCCoGXACSdX_4hUXkGcE2OesLCClHsnqJwcAFVl-0L108O_E2I-rK-lBCKW3Bv4b0F2ZLeT4kuff9_U',
		intent: 'capture',
		currency: 'USD',
	}

	const buttonStyles = {
		layout: 'vertical',
		shape: 'rect',
	}

	const handlePaymentSuccess = (data) => {
		console.log(data)
		if (data.status === 'COMPLETED') {
			const newOrder = {
				buyer,
				product: cart,
				payment: data,
			}
			addNewOrder(newOrder)
			history.push('/checkout/success')
		}
	}

	const handleSumTotal = () => {
		const reducer = (accumulator, currentValue) =>
			accumulator + currentValue.price
		const sum = cart.reduce(reducer, 0)
		return sum
	}

	return (
		<div className="Payment">
			<div className="Payment-content">
				<h3>Resument del pedido:</h3>
				{cart.map((item) => (
					<div className="Payment-item" key={item.title}>
						<div className="Payment-element">
							<h4>{item.title}</h4>
							<span>$ {item.price}</span>
						</div>
					</div>
				))}
				<div className="Payment-button">
					<PayPalButton
						paypalOptions={paypalOtions}
						buttonStyles={buttonStyles}
						amount={handleSumTotal()}
						onPaymentStart={() => console.log('Start Payment')}
						onPaymentSuccess={(data) => handlePaymentSuccess(data)}
						onPaymentError={(error) => console.log(error)}
						onPaymentCancel={(data) => console.log(data)}
					/>
				</div>
			</div>
			<div />
		</div>
	)
}

export default Payment
